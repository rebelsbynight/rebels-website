// @flow
import { useEffect, useState, useRef, useCallback } from "react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Alchemy, Network } from "alchemy-sdk";

import { BigNumber } from "ethers";

import { CONTRACT_ADDR } from "../constants";

const ALCHEMY_API = process.env.REACT_APP_ALCHEMY_API;

type Res = {
  userNFTs: Array<any>,
};

export default function useAlchemyNFT(account: string): Res {
  const isUnMounted = useRef(false);

  const [userNFTs, setUserNFTs] = useState([]);

  const getNFTs = useCallback(async () => {
    const web3 = new ethers.providers.AlchemyProvider("mainnet", process.env.REACT_APP_ALCHEMY_API);

    // const web3 = createAlchemyWeb3(ALCHEMY_API);

    // Imports the Alchemy SDK
    // Configures the Alchemy SDK
    const config = {
            apiKey: process.env.REACT_APP_ALCHEMY_API, // Replace with your API key
            network: Network.ETH_MAINNET, // Replace with your network
    };
    
    // Creates an Alchemy object instance with the config to use for making requests
    const alchemy = new Alchemy(config);
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
    setUserNFTs(nfts);
  }, [account]);

  useEffect(() => {
    if (isUnMounted.current) {
      return;
    }
    getNFTs();

    return () => {
      isUnMounted.current = true;
    };
  }, [account, getNFTs]);

  return { userNFTs };
}
