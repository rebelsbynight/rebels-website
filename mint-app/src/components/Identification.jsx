// @flow
import * as React from "react";
import "./Identification.css";

import Window from "./Window.jsx";
import Button from "./Button";

type Props = {
  onClick: (SyntheticEvent<>) => any,
  children?: React.Node,
};

export default function Identification({
  children,
  onClick,
}: Props): React.Node {
  return (
    <Window>
      <div className="Identification">
        <div className="idProcto">Identification protocol</div>
        <div className="walPerm">Wallet permission required</div>
        <Button onClick={onClick}>Connect</Button>
      </div>
    </Window>
  );
}
