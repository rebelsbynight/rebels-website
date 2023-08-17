// @flow
import * as React from "react";
import "./MintInfos.css";

import {
  CONTRACT_ADDR,
  CONTRACT_ENS,
  ETHERSCAN_ADRR_URL,
  ETHERSCAN_LOOKUP_URL,
} from "../constants";

type Props = {
  network: string,
  account: string,
  accountLookup: ?string,
  contractResolved: ?string,
};

const shorten = (str: string): string => str.slice(0, 6) + "…" + str.slice(-4);

const EtherLink = ({ address, ens }) => {
  return (
    <>
      <a
        className="EtherLink"
        target="_blank"
        rel="noreferrer"
        href={`${ETHERSCAN_ADRR_URL}${address}`}
      >
        {shorten(address)}
      </a>
      {ens !== "" && (
        <>
          <br />
          <a
            className="EtherLink Ens"
            target="_blank"
            rel="noreferrer"
            href={`${ETHERSCAN_LOOKUP_URL}${ens}`}
          >
            [{ens}]
          </a>
        </>
      )}
    </>
  );
};

const ContractLink = ({ address, ens }) => {
  return (
    <>
      <a
        className="EtherLink"
        target="_blank"
        rel="noreferrer"
        href={`${ETHERSCAN_ADRR_URL}${address}`}
      >
        {shorten(address)}
      </a>
    </>
  );
};

export default function MintInfos({
  network,
  account,
  accountLookup,
  contractResolved,
}: Props): React.Node {
  const address =
    CONTRACT_ENS !== "" ? contractResolved || "" : CONTRACT_ADDR || "";
  const ens = CONTRACT_ENS !== "" ? CONTRACT_ENS || "" : "";
  return (
    <div className="MintInfos">
      <div className="MintInfosBox">
        <div className="MintInfosRow">
          <div className="MintInfosRowLeft">Wallet:</div>
          <div className="MintInfosRowRight">
            <EtherLink address={account} ens={accountLookup || ""} />
          </div>
        </div>
        <div className="MintInfosRow">
          <div className="MintInfosRowLeft">Contract:</div>
          <div className="MintInfosRowRight">
            <ContractLink address={address} ens={ens} />
          </div>
        </div>
      </div>
    </div>
  );
}
