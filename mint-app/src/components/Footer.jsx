// @flow
import * as React from "react";
import "./Footer.css";

export default function Footer(): React.Node {
  return (
    <div className="Footer">
      <div className="TOS">
        <a href="/tos.html" target="_blank">
          Terms of Service
        </a>
      </div>
    </div>
  );
}
