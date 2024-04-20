// hooks/useAuth.js
"use client";
import { useState } from 'react';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [web3auth, setWeb3auth] = useState(null);

  const clientId =
  "BLsAgZAaq1X0jFUxiKcWkMO9EjlA5Qb7HjVbWDdHLLHQsyovE9V9daN2ul08Sj9NxUG770uOeoKtYUS0pksWItY";

  const chainConfig = {
    chainId: "0x13882", // Please use 0x1 for ETH Mainnet, 0x89 for Polygon Mainnet
    rpcTarget: "https://rpc.ankr.com/polygon_amoy",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    displayName: "Polygon Amoy Testnet",
    blockExplorerUrl: "https://amoy.polygonscan.com/",
    ticker: "MATIC",
    tickerName: "MATIC",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthOptions: Web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    uiConfig: {
      uxMode: "redirect",
      appName: "W3A Heroes",
      appUrl: "https://web3auth.io/",
      theme: {
        primary: "#7ed6df",
      },
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
      mode: "auto", // whether to enable dark mode. defaultValue: auto
      useLogoLoader: true,
    },
    privateKeyProvider: privateKeyProvider,
    sessionTime: 86400, // 1 day
    // useCoreKitKey: true,
  };

  const authenticateUser = async () => {
    try {
      const web3auth = new Web3Auth(web3AuthOptions);
      const idToken = await web3auth.authenticateUser();
      setIsLoggedIn(true);
      return idToken;
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoggedIn(false);
      return null;
    }
  };

  return {
    authenticateUser,
    isLoggedIn,
    logUser: () => {
      if (isLoggedIn) {
        console.log("user logged");
      }
    },
  };
};

export default useAuth;