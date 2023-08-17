// @flow
import type { NFTDataType } from "../hooks/useContractReveal";
import * as React from "react";
import "./RevealAnimation.css";
import classNames from "classnames";
import { useState, useRef, useEffect, useCallback } from "react";
import { BigNumber } from "ethers";
import TransactionLink from "./TransactionLink";
import NightCardsList from "./NightCardsList";

import { OPENSEA_ASSET_URL } from "../constants";

import Button from "./Button";

type BigNumberType = typeof BigNumber;

type Props = {
  transactionId: BigNumberType,
  transactionFinished: boolean,
  revealedTokens: Array<BigNumberType>,
  reveal: (Array<BigNumberType>) => Promise<any>,
  isRevealing: boolean,
  nightCards: Array<BigNumberType>,
  nftData: ?NFTDataType,
  revealContractAddress: ?BigNumberType,
};

export default function RevealAnimation({
  transactionId,
  transactionFinished,
  revealContractAddress,
  revealedTokens,
  reveal,
  isRevealing,
  nightCards,
  nftData,
}: Props): React.Node {
  const [isPaused, setIsPaused] = useState(true);
  const [hideSuccessState, setHideSuccessState] = useState(false);

  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const [canplaythrough1, setCanplaythrough1] = useState(false);
  const [canplaythrough2, setCanplaythrough2] = useState(false);
  const [canplaythrough3, setCanplaythrough3] = useState(false);

  const [isNftPreloaded, setIsNftPreloaded] = useState(false);

  const showRevealMoreButton = show4 && !hideSuccessState;
  const showNightCards = transactionId === null || hideSuccessState;

  const showTransactionLink =
    transactionId !== null && !showRevealMoreButton && !showNightCards;

  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);

  const stylesVideo1 = classNames({
    video1: true,
    hide: !show1,
  });
  const stylesVideo2 = classNames({
    video2: true,
    hide: !show2,
  });
  const stylesVideo3 = classNames({
    video3: true,
    hide: !show3,
  });
  const stylesImage = classNames({
    image: true,
    show: show4,
  });

  const reset = () => {
    setShow1(true);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    setHideSuccessState(false);
    video3Ref.current?.pause();
    video2Ref.current?.pause();
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.pause();
    }
  };

  const preloadNFT = useCallback(() => {
    if (nftData === null) {
      return;
    }
    const img = new Image();
    img.onload = () => {
      setIsNftPreloaded(true);
    };
    img.src = nftData?.image || "";
  }, [nftData, setIsNftPreloaded]);

  const start = useCallback(() => {
    reset();
    video1Ref.current?.play();
  }, [video1Ref]);

  useEffect(() => {
    if (!isPaused && canplaythrough1 && transactionId != null) {
      start();
    }
  }, [isPaused, canplaythrough1, start, transactionId]);

  useEffect(() => {
    if (!isNftPreloaded && nftData !== null) {
      preloadNFT();
    }
  }, [isNftPreloaded, nftData, preloadNFT]);

  const onEnded1 = () => {
    if (video2Ref.current === null) {
      return;
    }
    if (!canplaythrough2 && video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.play();
      return;
    }
    setShow2(true);
    video2Ref.current.currentTime = 0;
    video2Ref.current?.play();
  };

  const onEnded2 = () => {
    if (video2Ref.current == null) {
      return;
    }
    if (
      nftData !== null &&
      isNftPreloaded &&
      canplaythrough3 &&
      video3Ref.current
    ) {
      setShow3(true);
      video3Ref.current.currentTime = 0;
      video3Ref.current.play();
      return;
    }
    video2Ref.current.currentTime = 0;
    video2Ref.current.play();
  };

  const onEnded3 = () => {
    setShow4(true);
  };

  const tokenID =
    (revealedTokens && revealedTokens[0] && revealedTokens[0].toNumber()) || "";
  const URL = `${OPENSEA_ASSET_URL}/${revealContractAddress || ""}/${tokenID}`;

  return (
    <>
      <div className="RevealAnimation">
        <video
          ref={video1Ref}
          className={stylesVideo1}
          autoPlay={false}
          onEnded={onEnded1}
          preload="auto"
          onCanPlayThrough={() => setCanplaythrough1(true)}
        >
          <source src="/reveal/videos/NFTReveal-Animation-Part1_HD.mp4"></source>
        </video>
        <video
          ref={video2Ref}
          className={stylesVideo2}
          autoPlay={false}
          onEnded={onEnded2}
          preload="auto"
          onCanPlayThrough={() => setCanplaythrough2(true)}
        >
          <source src="/reveal/videos/NFTReveal-Animation-Part2_HD.mp4"></source>
        </video>
        <video
          ref={video3Ref}
          className={stylesVideo3}
          onEnded={onEnded3}
          autoPlay={false}
          preload="auto"
          onCanPlayThrough={() => setCanplaythrough3(true)}
        >
          <source src="/reveal/videos/NFTReveal-Animation-Part3_HD.mp4"></source>
        </video>
        {nftData && (
          <div className={stylesImage}>
            <div className="NFTLeft">
              <a
                className="NFTLink"
                rel="noreferrer"
                href={nftData.image}
                target="_blank"
              >
                <img className="NFTImage" alt="your nft" src={nftData.image} />
              </a>
            </div>
            <div className="NFTRight">
              <a
                href={URL}
                target="_blank"
                rel="noreferrer"
                className="OpenSeaIcon"
              >
                <img
                  alt="OpenSea"
                  src="/reveal/images/opensea.svg"
                  width="32px"
                  height="32px"
                />
              </a>
              <div className="NFTName">{nftData.name}</div>
              <div className="NFTAttributes">
                {nftData.attributes.map((attr, idx) => (
                  <div key={idx} className="NFTAttribute">
                    <div className="AttributeName">{attr.trait_type}</div>
                    <div className="AttributeValue">{attr.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="RevealSub">
        {showNightCards && (
          <NightCardsList
            nightCards={nightCards} // TODO check recently revealed is removed
            reveal={async (s) => {
              setIsPaused(false);
              reveal(s);
            }}
          />
        )}
        <div className="Buttons">
          {showTransactionLink && (
            <TransactionLink transactionId={transactionId} />
          )}
          {showRevealMoreButton && (
            <Button
              small={true}
              onClick={() => {
                reset();
                setIsPaused(true);
                setHideSuccessState(true);
              }}
            >
              Reveal more cards
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
