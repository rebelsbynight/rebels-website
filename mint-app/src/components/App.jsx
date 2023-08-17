// @flow

import { useState } from "react";
import "./App.css";
import Identification from "./Identification";
import Reveal from "./Reveal.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

import Web3Modal from "web3modal";
import { ethers } from "ethers";

// Providers
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";
import * as React from "react";

import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";

const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const NETWORK = process.env.REACT_APP_NETWORK;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Rebels",
      infuraId: INFURA_ID,
      chainId: CHAIN_ID,
      darkMode: false,
    },
  },
  torus: {
    package: Torus,
    options: {
      networkParams: {
        chainId: CHAIN_ID,
      },
    },
  },
};

const web3Modal = new Web3Modal({
  network: NETWORK,
  cacheProvider: false,
  providerOptions,
});

function App(): React.Node {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

	const onClick = async () => {
		console.log("Connecting to:", NETWORK); // Log the network
    const instance = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(instance);
		const network = await provider.getNetwork(); // Get the connected network
		  console.log("Connected network:", network); // Log the connected network
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      return;
    }
    // Event for change of account
    instance.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        return;
      }
      window.location.reload();
    });
    // Event for change of chain
    instance.on("chainChanged", (chainId) => {
      window.location.reload();
    });
    instance.on("disconnect", () => {
      window.location.reload();
    });
    // Metamask only ever return one accounts here.
    const account = accounts[0];
    setAccount(account);
    setProvider(provider);
    navigate(state?.path || "/");
  };

  function Revealer() {
    const location = useLocation();
    if (provider === null) {
      return (
        <Navigate to="/connect" replace state={{ path: location.pathname }} />
      );
    }
    return (
      <div className="App">
        <Reveal provider={provider} account={account} />
        <Header />
        <Footer />
      </div>
    );
  }

  function Id() {
    return (
      <div className="App">
        <Identification onClick={onClick} />
        <Header />
        <Footer />
      </div>
    );
  }

  return (
    <Routes>
      <Route exact path="/connect" element={<Id />} />
      <Route exact path="/" element={<Revealer />} />
    </Routes>
  );
}

export default App;
