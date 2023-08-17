// @flow
import * as React from "react";
import "./Select.css";
import { BigNumber } from "ethers";
import classNames from "classnames";

type BigNumberType = typeof BigNumber;

type Props = {
  mintUserLimit: BigNumberType,
  mintUserCount: BigNumberType,
  count: number,
  setCount: (number) => void,
  disabled?: boolean,
};

export default function Select({
  mintUserLimit,
  mintUserCount,
  count,
  setCount,
  disabled = false,
}: Props): React.Node {
  const styles = classNames({
    Select: true,
    disabled,
  });
  const userMaxLeft = mintUserLimit.sub(mintUserCount).toNumber();
  const percent = (count / userMaxLeft) * 100;
  const minusClick = () => {
    if (count <= 1) {
      return;
    }
    setCount(count - 1);
  };
  const plusClick = () => {
    if (count >= userMaxLeft) {
      return;
    }
    setCount(count + 1);
  };
  const minusClasses = classNames({
    minus: true,
    disabled: count === 1 || disabled,
  });
  const plusClasses = classNames({
    plus: true,
    disabled: count === userMaxLeft || disabled,
  });
  return (
    <div className={styles}>
      <div className={minusClasses}>
        <div onClick={minusClick}></div>
      </div>
      <div>
        <div className="value">{count}</div>
      </div>
      <div className={plusClasses}>
        <div onClick={plusClick}></div>
      </div>
      <div className="progress">
        <div
          className="tick"
          style={{ width: `calc(${percent}% - 8px)` }}
        ></div>
      </div>
    </div>
  );
}
