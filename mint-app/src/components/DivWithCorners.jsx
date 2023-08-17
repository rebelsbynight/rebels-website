// @flow
import * as React from "react";
import "./DivWithCorners.css";
import classNames from "classnames";

type Props = {
  children?: React.Node,
  fullSize?: boolean,
};

export default function DivWithCorners({
  children,
  fullSize = false,
}: Props): React.Node {
  const styles = classNames({
    DivWithCorners: true,
    fullSize,
  });
  return (
    <div className={styles}>
      <div className="cornerTopLeft"></div>
      <div className="cornerTopRight"></div>
      <div className="cornerBottomLeft"></div>
      <div className="cornerBottomRight"></div>
      {children}
    </div>
  );
}
