// @flow

import useContractReveal from "../hooks/useContractReveal";
import "./Reveal.css";
import * as React from "react";
import { useState } from "react";
import { ethers } from "ethers";

import Button from "./Button";

import Window from "./Window.jsx";
import DivWithCorners from "./DivWithCorners";

import RevealAnimation from "./RevealAnimation.jsx";

const NETWORK = process.env.REACT_APP_NETWORK || "";
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID);

const shorten = (str: string): string => str.slice(0, 12) + "…";

type Props = {
  provider: {},
  account: string,
};

export default function Reveal({ provider, account }: Props): React.Node {
  const {
    // top level
    networkName,
    networkChainId,
    nightCards,
    // main contract level
    reveal,
    revealContractAddress,
    // Reveal state
    isRevealing,
    revealedTokens,
    transactionId,
    transactionFailed,
    transactionFinished,
    nftData,
  } = useContractReveal(provider, account);

  const [hideFailedState, setHideFailedState] = useState(false);

  let content = null;
  if (networkChainId !== CHAIN_ID) {
    // Incorrect network
    content = (
      <DivWithCorners>
        <div className="MintCenteredBox">
          <h1>Swith to the {NETWORK} network to mint, expected {CHAIN_ID} and got {networkChainId}</h1>
          <p className="Text">
            Your wallet (<b>{shorten(account)}</b>) is currently connected to
            the <b>{networkName}</b> network.
          </p>
        </div>
      </DivWithCorners>
    );
  } else if (transactionFailed && !hideFailedState) {
    // Transaction failed
    content = (
      <div className="MintCenteredBox">
        <DivWithCorners>
          <h3 className="Fail">Transaction failed</h3>
          <Button onClick={() => setHideFailedState(true)}>Try again</Button>
        </DivWithCorners>
      </div>
    );
  } else if (revealContractAddress === ethers.constants.AddressZero && false) {
    // Transaction failed
    content = (
      <div className="MintCenteredBox">
        <DivWithCorners>
          <h3 className="Fail">Reveal is disabled</h3>
        </DivWithCorners>
      </div>
    );
  } else {
    // Minting step 1: Transaction
    content = (
      <div className="MintCenteredBoxWide">
        <RevealAnimation
          transactionId={transactionId}
          transactionFinished={transactionFinished}
          revealContractAddress={revealContractAddress}
          revealedTokens={revealedTokens}
          isRevealing={isRevealing}
          reveal={reveal}
          nightCards={nightCards}
          nftData={nftData}
        />
      </div>
    );
  }
  return (
    <>
      <Window big={true}>
        <div className="Reveal">{content}</div>
      </Window>
    </>
  );
}
