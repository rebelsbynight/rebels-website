// @flow
import * as React from "react";
import "./NightCardsList.css";
import classNames from "classnames";

import { OPENSEA_ASSET_URL, CONTRACT_ADDR } from "../constants";

import { BigNumber } from "ethers";

type BigNumberType = typeof BigNumber;

type Props = {
  nightCards: Array<BigNumberType>,
  reveal: (Array<BigNumberType>) => Promise<any>,
};

export default function NightCardsList({
  nightCards,
  reveal,
}: Props): React.Node {
  const nftIDS = nightCards.map((n) => n.id);

  return (
    <div className="NightCards">
      {nftIDS.length === 0 && <h2>No Night card to reveal</h2>}
      {nftIDS.length > 0 && (
        <div className="NightCardsList">
          {nftIDS.map((nftID) => {
            const styles = classNames({
              NightCardsListItem: true,
            });
            return (
              <div key={nftID} className={styles}>
                <div className="nftReveal" onClick={() => reveal([nftID])}>
                  reveal
                </div>
                <div className="nftID">{nftID.toHexString()}</div>
                <a
                  href={`${OPENSEA_ASSET_URL}${CONTRACT_ADDR}/${nftID.toNumber()}`}
                  target="_blank"
                  rel="noreferrer"
                  className="NightCardsOpenSeaButton"
                >
                  <img
                    alt="OpenSea"
                    src="/reveal/images/opensea.svg"
                    width="20"
                    height="20"
                  />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
