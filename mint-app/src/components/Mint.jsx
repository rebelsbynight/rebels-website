// @flow

import useContractMint from "../hooks/useContractMint";
import "./Mint.css";
import * as React from "react";
import { useState } from "react";

import MintInfos from "./MintInfos";
import MintStatus from "./MintStatus";
import TokenSelect from "./TokenSelect";
import Button from "./Button";
import Window from "./Window.jsx";
import { UserNFTs, NFTList } from "./UserNFTs";
import Spinner from "./Spinner";
import TransactionLink from "./TransactionLink";
import DivWithCorners from "./DivWithCorners";
import { CONTRACT_ADDR } from "../constants";

const NETWORK = process.env.REACT_APP_NETWORK || "";
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID);

const shorten = (str: string): string => str.slice(0, 12) + "…";

type Props = {
  provider: {},
  account: string,
};

export default function Mint({ provider, account }: Props): React.Node {
  const {
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
    accountLookup,
    contractResolved,
  } = useContractMint(provider, account);

  const [hideFailedState, setHideFailedState] = useState(false);
  const [hideSuccessState, setHideSuccessState] = useState(false);

  const hasProof = userProof.length > 0;
  const isMintButtonDisabled =
    mintUserCount.eq(mintUserLimit) ||
    (proofRequired && !hasProof) ||
    !mintActive;

  let content = null;
  if (networkChainId !== CHAIN_ID) {
    // Incorrect network
    content = (
      <DivWithCorners>
        <div className="MintCenteredBox">
          <h1>Swith to the {NETWORK} network to mint</h1>
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
  } else if (mintAuthorizerAddressNull) {
    // Transaction failed
    content = (
      <div className="MintCenteredBox">
        <DivWithCorners>
          <h3 className="Fail">Mint is disabled</h3>
        </DivWithCorners>
      </div>
    );
  } else if (isMinting && !transactionFinished) {
    // Minting step 1: Transaction
    content = (
      <div className="MintCenteredBox">
        <DivWithCorners>
          <Spinner />
          <TransactionLink transactionId={transactionId} />
        </DivWithCorners>
      </div>
    );
  } else if (isMinting && transactionFinished) {
    // Minting step 2: Retrieving tokens
    content = (
      <div className="MintCenteredBox">
        <DivWithCorners>
          <h1 className="loading">Retrieving minted token(s)</h1>
          <Spinner />
          <TransactionLink transactionId={transactionId} />
        </DivWithCorners>
      </div>
    );
  } else if (mintedTokens.length > 0 && !hideSuccessState) {
    // Post Mint
    content = (
      <div className="MintCenteredBox">
        <DivWithCorners>
          <div className="Tokens">
            <h2 className="desc">Night cards you just minted:</h2>
            <NFTList
              nftIDS={mintedTokens}
              minted={[]}
              contract={CONTRACT_ADDR}
            />
            <Button onClick={() => setHideSuccessState(true)}>
              Mint again
            </Button>
          </div>
        </DivWithCorners>
      </div>
    );
  } else {
    // Normal state
    content = (
      <div className="Row">
        <div className="Column ColumnInfos width50">
          <div className="Column">
            <MintStatus
              totalSupply={totalSupply}
              maxSupply={maxSupply}
              mintCount={mintCount}
              mintLimit={mintLimit}
              mintUserCount={mintUserCount}
              mintUserLimit={mintUserLimit}
              mintStartTime={mintStartTime}
              mintEndTime={mintEndTime}
            />
            <MintInfos
              network={networkName}
              account={account}
              accountLookup={accountLookup}
              contractResolved={contractResolved}
            />
            <UserNFTs account={account} mintedTokens={mintedTokens} />
          </div>
        </div>

        <TokenSelect
          isMintButtonDisabled={isMintButtonDisabled}
          mintUserLimit={mintUserLimit}
          mintUserCount={mintUserCount}
          mintPrice={mintPrice}
          mintActive={mintActive}
          proofRequired={proofRequired}
          hasProof={hasProof}
          mint={(count) => {
            setHideFailedState(false);
            setHideSuccessState(false);
            mint(count);
          }}
        />
      </div>
    );
  }
  return (
    <>
      <Window big={true}>
        <div className="Mint">
          <h1 className="MintTitle">{mintName}</h1>
          {content}
        </div>
      </Window>
    </>
  );
}
