// @flow

import { useEffect, useState, useRef, useCallback } from "react";
import { BigNumber, ethers } from "ethers";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Alchemy, Network } from "alchemy-sdk";

import nightcardsABI from "../abi/NightCard.json";
import rebelsABI from "../abi/Rebels.json";

import { CONTRACT_ADDR } from "../constants";

var originalFetch = require("isomorphic-fetch");
var fetch = require("fetch-retry")(originalFetch);

const NIGHTCARD_ABI = nightcardsABI.abi;
const REBELS_ABI = rebelsABI.abi;

const REFRESH_INTERVAL = 2000;
const ALCHEMY_API = process.env.REACT_APP_ALCHEMY_API;

type BigNumberType = typeof BigNumber;

export type NFTTraitType = { trait_type: string, value: string };

export type NFTDataType = {
  name: string,
  image: string,
  attributes: Array<NFTTraitType>,
};

type Res = {
  networkName: string,
  networkChainId: number,
  nightCards: Array<BigNumberType>,
  reveal: (Array<BigNumberType>) => Promise<any>,
  revealContractAddress: ?BigNumberType,
  isRevealing: boolean,
  revealedTokens: Array<BigNumberType>,
  transactionId: ?string,
  transactionFailed: boolean,
  transactionFinished: boolean,
  nftData: ?NFTDataType,
};

export default function useContractReveal(provider: any, account: string): Res {
  // Block chain level data
  const [networkName, setNetworkName] = useState("");
  const [networkChainId, setNetworkChainId] = useState(0);
  const [nightCards, setNightCards] = useState([]);
  // Reveal Process
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealContractAddress, setRevealContractAddress] = useState(null);
  const [revealedTokens, setRevealedTokens] = useState([]);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionFinished, setTransactionFinished] = useState(false);
  const [transactionFailed, setTransactionFailed] = useState(false);
  const [nftData, setNftData] = useState(null);

  const isUnMounted = useRef(false);

  const getContractState = useCallback(async () => {
    const mainContract = new ethers.Contract(
      CONTRACT_ADDR,
      NIGHTCARD_ABI,
      provider
    );
    const revealContractAddress = await mainContract.revealContractAddress();

    if (isUnMounted.current) {
      // We need to cancel if the component is unMounted
      return;
    }

    setRevealContractAddress(revealContractAddress);
  }, [provider]);

  const getNftData = async (tokenId) => {
    const URL = `http://arweave.net/mJOV_vgJ5rLz_KDIXBgIbf6pl--hVwA0Na8zWr9IY6c/${tokenId}.json`;

    const response = await fetch(URL, {
      retries: 200,
      retryDelay: 1000,
      retryOn: [404],
    });

    if (isUnMounted.current) {
      // We need to cancel if the component is unMounted
      return;
    }
    const json = await response.json();
    setNftData(json ?? null);
  };

  const getNightCards = useCallback(async () => {
    const web3 = new ethers.providers.AlchemyProvider("mainnet", ALCHEMY_API);
    // Imports the Alchemy SDK
    // Configures the Alchemy SDK
    const config = {
            apiKey: ALCHEMY_API, // Replace with your API key
            network: Network.ETH_MAINNET, // Replace with your network
    };
    
    // Creates an Alchemy object instance with the config to use for making requests
    const alchemy = new Alchemy(config);
    console.log("************");
    console.log(typeof(account));
    console.log(account);
    console.log("************");
    console.log(typeof(CONTRACT_ADDR));
    console.log(CONTRACT_ADDR);
    console.log("************");
    const res = await alchemy.nft.getNftsForOwner(account, {
      contractAddresses: [CONTRACT_ADDR],
    });
    if (isUnMounted.current) {
      return false;
    }
    const nfts = res.ownedNfts.map((n) => ({
      id: BigNumber.from(n.tokenId),
      url: n.tokenUri.gateway,
      timeLastUpdated: n.timeLastUpdated,
    }));
    nfts.sort((a, b) => b.id - a.id);
    setNightCards(nfts);
  }, [account]);

  useEffect(() => {
    const getNetwork = async () => {
      const network = await provider.getNetwork();
      setNetworkName(network.name);
      setNetworkChainId(network.chainId);
    };
    getNetwork();
    getContractState();
    getNightCards();
    const intervalID = setInterval(getContractState, REFRESH_INTERVAL);

    return () => {
      isUnMounted.current = true;
      clearInterval(intervalID);
    };
  }, [account, getContractState, getNightCards, provider]);

  const reveal = async (selected) => {
    const signer = provider.getSigner();
    const nightCardsContract = new ethers.Contract(
      CONTRACT_ADDR,
      NIGHTCARD_ABI,
      signer
    );
    const rebelsContract = new ethers.Contract(
      revealContractAddress,
      REBELS_ABI,
      signer
    );
    const overrides = {
      gasLimit: ethers.constants.Zero,
    };
    let transferNumber = 0;
    let tokens = [];
    try {
      setNftData(null);
      setIsRevealing(true);
      setTransactionFailed(false);
      setTransactionFinished(false);
      setRevealedTokens([]);
      setTransactionId(null);
      const gasLimit = await nightCardsContract.estimateGas.reveal(
        selected,
        {}
      );
      overrides.gasLimit = gasLimit.mul(120).div(100);
      const transaction = await nightCardsContract.reveal(selected, overrides);
      setTransactionId(transaction.hash);
      console.log("Transaction ID:", transaction.hash);

      rebelsContract.on("Transfer", async (from, to, tokenId, data) => {
        if (data.transactionHash !== transaction.hash) {
          return;
        }
        if (
          from === ethers.constants.AddressZero &&
          to.toLowerCase() === account.toLowerCase() &&
          revealedTokens.filter(
            (token) => token.toNumber() === tokenId.toNumber()
          ).length === 0
        ) {
          transferNumber++;
          tokens.push(tokenId);
          console.log("Revealed token ID:", tokenId.toHexString());
          if (transferNumber === selected.length) {
            await getNftData(tokenId);
            setRevealedTokens(tokens);
            setIsRevealing(false);
            setTransactionFailed(false);
            setNightCards(
              nightCards.filter((bn) => !selected.find((bnn) => bnn.eq(bn.id)))
            );
            rebelsContract.removeAllListeners();
          }
        }
      });
      try {
        await transaction.wait();
        setTransactionFailed(false);
        setTransactionFinished(true);
      } catch (error) {
        // Failure at the transaction blockchain level (ex: insuficient gas)
        console.error(error);
        setNftData(null);
        setTransactionFailed(true);
        setIsRevealing(false);
        rebelsContract.removeAllListeners();
        return;
      }
    } catch (error) {
      // Failure at the provider level (ex: rejecting the transaction in Metamask)
      console.error(error);
      setNftData(null);
      setTransactionFailed(true);
      setIsRevealing(false);
      rebelsContract.removeAllListeners();
    }
  };

  return {
    // top level
    networkName,
    networkChainId,
    nightCards,
    // main contract level
    reveal,
    revealContractAddress,
    // reveal state
    isRevealing,
    revealedTokens,
    transactionId,
    transactionFailed,
    transactionFinished,
    nftData,
  };
}
