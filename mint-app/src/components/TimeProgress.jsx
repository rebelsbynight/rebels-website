// @flow
import * as React from "react";
import "./Progress.css";
import { BigNumber } from "ethers";
import { useState, useEffect } from "react";

type BigNumberType = typeof BigNumber;

type Props = {
  start: BigNumberType,
  end: BigNumberType,
  title: string,
};

const padded = (nb: number): string => (nb < 10 ? `0${nb}` : `${nb}`);
const getNow = () => Math.ceil(Date.now() / 1000);

export default function TimeProgress({ start, end, title }: Props): React.Node {
  const [now, setNow] = useState(getNow);
  const e = end.toNumber();
  const s = start.toNumber();

  const isOver = now > e;
  const hasNotStarted = now < s;

  useEffect(() => {
    if (isOver) {
      return;
    }
    setTimeout(() => setNow(getNow()), 1000);
  }, [setNow, isOver, now]);

  const diff = hasNotStarted ? s - now : e - now;
  const diffH = isOver ? 0 : Math.floor(diff / (60 * 60));
  const left = diff % (60 * 60);
  const diffM = isOver ? 0 : Math.floor(left / 60);
  const diffS = isOver ? 0 : left % 60;

  const current = now - s;
  const max = end - start;
  const percent = isOver ? 100 : hasNotStarted ? 0 : (current / max) * 100;

  const label = hasNotStarted ? "Sale starts in" : title;

  return (
    <div className="Progress">
      <div className="Title">{label}</div>
      <div className="Numbers">{`${padded(diffH)}:${padded(diffM)}:${padded(
        diffS
      )}`}</div>
      <div className="rel">
        <div className="Bar">
          <div className="tick" style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
}
