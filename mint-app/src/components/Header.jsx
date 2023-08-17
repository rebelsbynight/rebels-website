// @flow
import * as React from "react";
import "./Header.css";

export default function Header(): React.Node {
  return (
    <div className="Header">
      <a href="/">
        <div className="Logo"></div>
      </a>
    </div>
  );
}
