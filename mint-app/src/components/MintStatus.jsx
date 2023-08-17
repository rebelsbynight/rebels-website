// @flow
import * as React from "react";
import "./MintStatus.css";

import { BigNumber } from "ethers";

import Progress from "./Progress";
import TimeProgress from "./TimeProgress";

type BigNumberType = typeof BigNumber;

type Props = {
  totalSupply: BigNumberType,
  maxSupply: BigNumberType,
  mintCount?: BigNumberType,
  mintLimit?: BigNumberType,
  mintUserCount?: BigNumberType,
  mintUserLimit?: BigNumberType,
  mintStartTime: BigNumberType,
  mintEndTime: BigNumberType,
};

export default function MintStatus({
  totalSupply,
  maxSupply,
  mintCount,
  mintLimit,
  mintUserCount,
  mintUserLimit,
  mintStartTime,
  mintEndTime,
}: Props): React.Node {
  return (
    <div className="MintStatus">
      {mintUserCount != null && mintUserLimit != null && (
        <Progress
          title="Your share of the sale"
          current={mintUserCount.toNumber()}
          max={mintUserLimit.toNumber()}
        />
      )}
      {mintCount != null && mintLimit != null && (
        <Progress
          title="Sale progress"
          current={mintCount.toNumber()}
          max={mintLimit.toNumber()}
        />
      )}
      <TimeProgress
        title="Time Remaining"
        start={mintStartTime}
        end={mintEndTime}
      />
    </div>
  );
}
