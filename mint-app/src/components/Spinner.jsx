// @flow
import * as React from "react";
import "./Spinner.css";

export default function Spinner(): React.Node {
  return (
    <div className="SpinnerWrapper">
      <div className="SpinnerBg"></div>
      <div className="SpinnerRing"></div>
    </div>
  );
}
