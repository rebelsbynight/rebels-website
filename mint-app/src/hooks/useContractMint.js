// @flow

import { useEffect, useState, useRef, useCallback } from "react";
import { BigNumber, ethers } from "ethers";

import rebelsABI from "../abi/NightCard.json";
import IRebelsABI from "../abi/IRebelsMintInfo.json";

import { CONTRACT_ADDR, CONTRACT_ENS } from "../constants";

const MAIN_ABI = rebelsABI.abi;
const INTERFACE_ABI = IRebelsABI.abi;

const REFRESH_INTERVAL = 2000;

type BigNumberType = typeof BigNumber;

type Res = {
  networkName: string,
  networkChainId: number,
  mint: (number) => Promise<any>,
  totalSupply: BigNumberType,
  maxSupply: BigNumberType,
  mintName: string,
  proofRequired: boolean,
  mintLimit: BigNumberType,
  mintCount: BigNumberType,
  mintPrice: BigNumberType,
  mintStartTime: BigNumberType,
  mintEndTime: BigNumberType,
  mintActive: boolean,
  mintUserLimit: BigNumberType,
  mintUserCount: BigNumberType,
  userProof: Array<string>,
  isMinting: boolean,
  mintedTokens: Array<BigNumberType>,
  transactionId: ?string,
  transactionFailed: boolean,
  transactionFinished: boolean,
  mintAuthorizerAddressNull: boolean,
  accountLookup: ?string,
  contractResolved: ?string,
};

export default function useBlockChain(provider: any, account: string): Res {
  // Block chain level data
  const [networkName, setNetworkName] = useState("");
  const [networkChainId, setNetworkChainId] = useState(0);
  // Contract data
  const [totalSupply, setTotalSupply] = useState(ethers.constants.Zero);
  const [maxSupply, setMaxSupply] = useState(ethers.constants.Zero);
  // Authorizer level data
  const [mintName, setMintName] = useState("");
  const [proofRequired, setProofRequired] = useState(false);
  const [mintLimit, setMintLimit] = useState(ethers.constants.Zero);
  const [mintCount, setMintCount] = useState(ethers.constants.Zero);
  const [mintPrice, setMintPrice] = useState(ethers.constants.Zero);
  const [mintStartTime, setMintStartTime] = useState(ethers.constants.Zero);
  const [mintEndTime, setMintEndTime] = useState(ethers.constants.Zero);
  const [mintActive, setMintActive] = useState(false);
  const [mintUserLimit, setMintUserLimit] = useState(ethers.constants.Zero);
  const [mintUserCount, setMintUserCount] = useState(ethers.constants.Zero);
  const [userProof, setUserProof] = useState([]);
  // Minting Process
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTokens, setMintedTokens] = useState([]);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionFinished, setTransactionFinished] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [mintAuthorizerAddressNull, setMintAuthorizerAddressNull] =
    useState(false);
  // Lookup addresses
  const [accountLookup, setAccountLookup] = useState(null);
  const [contractResolved, setContractResolved] = useState(null);

  const isUnMounted = useRef(false);

  const getProof = useCallback(async () => {
    const URL = `/mint/json/proof-stragglers/${account.toLocaleLowerCase()}.json`;
    const response = await fetch(URL);
    if (response.ok !== true) {
      return [];
    }
    try {
      const json = await response.json();
      return json.proof ?? [];
    } catch {
      // json parse failed
      return [];
    }
  }, [account]);

  const getContractState = useCallback(async () => {
    const mainContract = new ethers.Contract(CONTRACT_ADDR, MAIN_ABI, provider);
    const mintAuthorizerAddress = await mainContract.mintAuthorizerAddress();

    if (mintAuthorizerAddress === ethers.constants.AddressZero) {
      setMintAuthorizerAddressNull(true);
      return;
    }
    setMintAuthorizerAddressNull(false);
    const saleContract = new ethers.Contract(
      mintAuthorizerAddress,
      INTERFACE_ABI,
      provider
    );

    const proof = await getProof();

    // Parallelise all async calls
    const [
      totalSupply,
      maxSupply,
      mintName,
      proofRequired,
      mintLimit,
      mintCount,
      mintStartTime,
      mintEndTime,
      mintActive,
      mintPrice,
      mintUserLimit,
      mintUserCount,
    ] = await Promise.allSettled([
      mainContract.callStatic.totalSupply(),
      mainContract.callStatic.maxSupply(),
      saleContract.callStatic.getMintName(),
      saleContract.callStatic.getProofRequired(),
      saleContract.callStatic.getTotalMintLimit(),
      saleContract.callStatic.getTotalMintCount(),
      saleContract.callStatic.getMintStartTime(),
      saleContract.callStatic.getMintEndTime(),
      saleContract.callStatic.getMintActive(),
      saleContract.callStatic.getUserMintPrice(account, proof),
      saleContract.callStatic.getUserMintLimit(account, proof),
      saleContract.callStatic.getUserMintCount(account),
    ]);

    if (isUnMounted.current) {
      // We need to cancel if the component is unMounted
      return;
    }

    setTotalSupply(totalSupply.value);
    setMaxSupply(maxSupply.value);
    setMintName(mintName.value || "");
    setProofRequired(proofRequired.value || false);
    setMintLimit(mintLimit.value);
    setMintCount(mintCount.value);
    setMintPrice(mintPrice.value || ethers.constants.Zero);
    setMintStartTime(mintStartTime.value);
    setMintEndTime(mintEndTime.value);
    setMintActive(
      mintCount.value === mintLimit.value ? false : mintActive.value || false
    );
    setMintUserLimit(mintUserLimit.value || ethers.constants.Zero);
    setMintUserCount(mintUserCount.value || ethers.constants.Zero);
    setUserProof(proof || []);
  }, [account, getProof, provider]);

  const getLookupAddresses = useCallback(async () => {
    const [accountENS, contractENS] = await Promise.allSettled([
      provider.lookupAddress(account),
      provider.resolveName(CONTRACT_ENS),
    ]);

    if (isUnMounted.current) {
      // We need to cancel if the component is unMounted
      return;
    }
    setAccountLookup(accountENS.value);
    setContractResolved(contractENS.value);
  }, [provider, account]);

  useEffect(() => {
    const getNetwork = async () => {
      const network = await provider.getNetwork();
      setNetworkName(network.name);
      setNetworkChainId(network.chainId);
    };
    getNetwork();
    getContractState();
    getLookupAddresses();
    const intervalID = setInterval(getContractState, REFRESH_INTERVAL);

    return () => {
      isUnMounted.current = true;
      clearInterval(intervalID);
    };
  }, [account, getContractState, getLookupAddresses, provider]);

  const mint = async (count) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDR, MAIN_ABI, signer);
    const overrides = {
      value: BigNumber.from(mintPrice).mul(count),
      gasLimit: ethers.constants.Zero,
    };
    let transferNumber = 0;
    let tokens = [];
    contract.on("Transfer", async (from, to, tokenId) => {
      if (
        from === ethers.constants.AddressZero &&
        to.toLowerCase() === account.toLowerCase() &&
        mintedTokens.filter((token) => token.toNumber() === tokenId.toNumber())
          .length === 0
      ) {
        transferNumber++;
        tokens.push(tokenId);
        console.log("Minted token ID:", tokenId.toHexString());
        if (transferNumber === count) {
          await getContractState();
          setMintedTokens(tokens);
          setIsMinting(false);
          setTransactionFailed(false);
          contract.removeAllListeners();
        }
      }
    });
    try {
      setIsMinting(true);
      setTransactionFailed(false);
      setTransactionFinished(false);
      setMintedTokens([]);
      setTransactionId(null);
      const gasLimit = await contract.estimateGas.mint(count, userProof, {
        value: overrides.value,
      });
      overrides.gasLimit = gasLimit.mul(125).div(100);
      const transaction = await contract.mint(count, userProof, overrides);
      setTransactionId(transaction.hash);
      console.log("Transaction ID:", transaction.hash);
      try {
        await transaction.wait();
        setTransactionFailed(false);
        setTransactionFinished(true);
      } catch (error) {
        // Failure at the transaction blockchain level (ex: insuficient gas)
        console.error(error);
        setTransactionFailed(true);
        setIsMinting(false);
        contract.removeAllListeners();
        return;
      }
    } catch (error) {
      // Failure at the provider level (ex: rejecting the transaction in Metamask)
      console.error(error);
      setTransactionFailed(true);
      setIsMinting(false);
      contract.removeAllListeners();
    }
  };

  return {
    // top level
    networkName,
    networkChainId,
    // main contract level
    mint,
    totalSupply,
    maxSupply,
    // sale level
    mintName,
    proofRequired,
    mintLimit,
    mintCount,
    mintPrice,
    mintStartTime,
    mintEndTime,
    mintActive,
    mintUserLimit,
    mintUserCount,
    userProof,
    // minting state
    isMinting,
    mintedTokens,
    transactionId,
    transactionFailed,
    transactionFinished,
    mintAuthorizerAddressNull,
    // ENS lookup
    accountLookup,
    contractResolved,
  };
}
