// @flow
import * as React from "react";
import "./TransactionLink.css";
import classNames from "classnames";

const ETHERSCAN_TX_URL = process.env.REACT_APP_ETHERSCAN_TX_URL || "";

type Props = {
  transactionId: ?string,
  small?: boolean,
};

export default function TransactionLink({
  transactionId,
  small = true,
}: Props): React.Node {
  const styles = classNames({
    TransactionLink: true,
    small: small,
    disabled: transactionId == null,
  });
  const id = transactionId || "";
  return (
    <a
      className={styles}
      target="_blank"
      rel="noreferrer"
      href={`${ETHERSCAN_TX_URL}${id}`}
    >
      Lookup transaction on Etherscan
    </a>
  );
}
