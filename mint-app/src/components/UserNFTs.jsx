// @flow
import * as React from "react";
import "./UsersNFTs.css";

import useAlchemyNFT from "../hooks/useAlchemyNFT";

import { OPENSEA_ASSET_URL, CONTRACT_ADDR } from "../constants";

import { BigNumber } from "ethers";

type BigNumberType = typeof BigNumber;

type Props = {
  account: string,
  mintedTokens: Array<BigNumberType>,
  selected?: Array<Number>,
  setSelected?: (Array<Number>) => void,
};

type P = {
  nftIDS: Array<BigNumberType>,
  minted: Array<Number>,
  selected?: Array<BigNumberType>,
  setSelected?: (Array<BigNumberType>) => void,
  contract: string,
};

export const NFTList = ({
  nftIDS,
  minted,
  selected,
  setSelected,
  contract,
}: P): React.Node => {
  const select = (nftID) => {
    if (!selected || !setSelected) {
      return;
    }
    const filteredOut = selected.filter((bn) => !bn.eq(nftID));
    if (filteredOut.length < selected.length) {
      setSelected(filteredOut);
      return;
    }
    setSelected([...selected, nftID]);
  };
  return (
    <div className="UserNFTsScroll">
      <ul className="UserNFTs">
        {nftIDS.map((nftID) => (
          <li key={nftID}>
            {minted.indexOf(nftID.toNumber()) !== -1 && (
              <div className="newNFT">new</div>
            )}
            {selected && (
              <div className="newNFT">
                <input type={"checkbox"} onChange={() => select(nftID)} />
              </div>
            )}

            <div className="nftID">{nftID.toHexString()}</div>
            <a
              href={`${OPENSEA_ASSET_URL}/${contract}/${nftID.toNumber()}`}
              target="_blank"
              rel="noreferrer"
              className="OpenSeaButton"
            >
              <img
                alt="OpenSea"
                src="/private-mint/images/opensea.svg"
                width="24"
                height="24"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function UserNFTs({
  account,
  mintedTokens,
  selected,
  setSelected,
}: Props): React.Node {
  const { userNFTs } = useAlchemyNFT(account);
  const minted = mintedTokens.map((n) => n.toNumber());
  const nftIDS = userNFTs.map((n) => n.id);

  return (
    <div className="UserNFTsWrapper">
      <div className="NFTTitle">
        <div className="nftOwned">Owned Night Cards</div>
        <div className="nftCount">{userNFTs.length}</div>
      </div>
      <NFTList
        nftIDS={nftIDS}
        minted={minted}
        selected={selected}
        setSelected={setSelected}
        contract={CONTRACT_ADDR}
      />
      <p>
        This is a private sale reserved for people who were only able to mint 1
        Night Card between Jun-12-2022 09:18:38 PM +UTC and Jun-12-2022 11:14:19
        PM +UTC.
      </p>
    </div>
  );
}
