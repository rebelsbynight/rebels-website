// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import "./TokenSelect.css";

import Button from "./Button";
import Select from "./Select";
import DivWithCorners from "./DivWithCorners";

import { ethers, BigNumber } from "ethers";

type BigNumberType = typeof BigNumber;

type Props = {
  isMintButtonDisabled: boolean,
  mintUserLimit: BigNumberType,
  mintUserCount: BigNumberType,
  mintPrice: BigNumberType,
  mint: (number) => any,
  mintActive: boolean,
  hasProof: boolean,
  proofRequired: boolean,
};

export default function TokenSelect({
  isMintButtonDisabled,
  mintUserLimit,
  mintUserCount,
  mintPrice,
  mintActive,
  hasProof,
  proofRequired,
  mint,
}: Props): React.Node {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [count, setCount] = useState(() => {
    if (isMintButtonDisabled) {
      return 0;
    }
    if (mintPrice.eq(ethers.constants.Zero)) {
      return mintUserLimit.toNumber() - mintUserCount.toNumber();
    }
    return 1;
  });
  const [cost, setCost] = useState(() => {
    if (mintPrice === ethers.constants.Zero) {
      return ethers.constants.Zero;
    }
    return BigNumber.from(count).mul(mintPrice);
  });

  useEffect(() => {
    if (mintPrice === ethers.constants.Zero) {
      return;
    }
    if (!isMintButtonDisabled && count === 0) {
      setCount(1);
    }
    setCost(BigNumber.from(count).mul(mintPrice));
  }, [mintPrice, count, isMintButtonDisabled]);

  const onClick = async () => {
    // Reset cost
    setCount(1);
    setCost(BigNumber.from(1).mul(mintPrice));
    await mint(count);
  };

  const formatEther = (bigNumber) => {
    const nb = +ethers.utils.formatEther(bigNumber);
    return Math.ceil(nb * 10000) / 10000;
  };

  let title = "";
  if (!mintActive) {
    title = "Mint is not active";
  } else if (proofRequired && !hasProof) {
    title = "Your wallet is not allowed to mint";
  } else {
    title = "Select the number of Night Cards to mint";
  }

  const updateTerms = (evt) => {
    setAcceptTerms(evt.target.checked);
  };

  return (
    <DivWithCorners fullSize={true}>
      <div className="TokenSelect">
        <h3 className="desc">{title}</h3>
        <div className="info">
          <span>Night card Price</span>
        </div>
        <div className="label">{formatEther(mintPrice)} ETH</div>
        <Select
          mintUserLimit={mintUserLimit}
          mintUserCount={mintUserCount}
          count={count}
          setCount={setCount}
          disabled={isMintButtonDisabled}
        />
        <div className="info">
          <span>Total price</span>
        </div>
        <div className="label">{formatEther(cost)} ETH</div>
        <div className="terms">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={updateTerms}
          />
          <label htmlFor="terms">
            accept{" "}
            <a href="/nftterms.html" target="_blank">
              terms and conditions
            </a>
          </label>
        </div>
        <Button
          onClick={onClick}
          disabled={isMintButtonDisabled || !acceptTerms}
        >
          Mint
        </Button>
      </div>
    </DivWithCorners>
  );
}
