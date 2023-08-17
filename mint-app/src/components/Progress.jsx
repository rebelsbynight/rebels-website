// @flow
import * as React from "react";
import "./Progress.css";

type Props = {
  title: string,
  current: number,
  max: number,
};

export default function Progress({ current, max, title }: Props): React.Node {
  const percent = (current / max) * 100;
  return (
    <div className="Progress">
      <div className="Title">{title}</div>
      <div className="Numbers">{`${current}/${max}`}</div>
      <div className="rel">
        <div className="Bar">
          <div className="tick" style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
}
