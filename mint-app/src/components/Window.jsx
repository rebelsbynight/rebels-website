// @flow
import * as React from "react";
import "./Window.css";
import classNames from "classnames";

type Props = {
  children?: React.Node,
  big?: boolean,
};

export default function Window({ children, big = false }: Props): React.Node {
  const styles = classNames({
    Window: true,
    big: big === true,
  });
  return <div className={styles}>{children}</div>;
}
