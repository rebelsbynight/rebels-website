// @flow

import * as React from "react";
import "./Button.css";
import classNames from "classnames";

type Props = {
  onClick: (SyntheticEvent<>) => any,
  children?: React.Node,
  disabled?: boolean,
  small?: boolean,
};

export default function Button({
  children,
  onClick,
  disabled,
  small = false,
}: Props): React.Node {
  const styles = classNames({
    Button: true,
    small: small,
    disabled: disabled === true,
  });
  return (
    <button disabled={disabled} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
