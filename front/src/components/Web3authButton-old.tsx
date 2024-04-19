/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

"use client";

import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { sepoliaChain, arbitrumSepoliaChain, gnosisChiadoTestnetChain, morphTestnetChain,  } from '@/constants/chain'

// Providers
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

// Wallet services
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

// Adapters
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

const clientId =
  "BLsAgZAaq1X0jFUxiKcWkMO9EjlA5Qb7HjVbWDdHLLHQsyovE9V9daN2ul08Sj9NxUG770uOeoKtYUS0pksWItY"; // get from https://dashboard.web3auth.io

const sepoliaConfig = {
  chainId: "0xaabb", // This is the chain ID for Sepolia in hexadecimal
  rpcTarget: "https://eth-sepolia.g.alchemy.com/v2/demo", // This is the RPC URL for Sepolia
  chainNamespace: CHAIN_NAMESPACES.EIP155, // Assuming Sepolia also uses EIP155 namespace
  displayName: "Sepolia",
  blockExplorerUrl: "https://sepolia.etherscan.io", // This is the block explorer URL for Sepolia
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://path-to-sepolia-logo.svg", // Replace with the actual logo URL
};

// Create a private key provider
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: sepoliaConfig },
});

enum OPENLOGIN_NETWORK_TYPE {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  // Add your custom networks here
  SEPOLIA = "sepolia",
  SEPOLIAARBITRUM = "sepoliaArbitrum",
  // Other networks...
}

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

const metamaskAdapter = new MetamaskAdapter({
  clientId,
  sessionTime: 3600, // 1 hour in seconds
  web3AuthNetwork: "sapphire_mainnet",
  chainConfig: sepoliaConfig, // Pass Sepolia config here
});

// Create a Web3Auth instance
const web3authSepolia = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  chainConfig: sepoliaConfig, // This uses the Sepolia config
  privateKeyProvider,
});

// it will add/update  the metamask adapter in to web3auth class
web3authSepolia.configureAdapter(metamaskAdapter);

// Change the adapter settings
metamaskAdapter.setAdapterSettings({
  sessionTime: 86400, // 1 day in seconds
  chainConfig: sepoliaConfig, // Use Sepolia config here
  web3AuthNetwork: "sapphire_mainnet",
});

/*

const arbitrumSepoliaConfig = {
  chainId: "0x67006", // This is the chain ID for Arbitrum Sepolia in hexadecimal
  rpcTarget: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public", // This is the RPC URL for Arbitrum Sepolia
  chainNamespace: CHAIN_NAMESPACES.EIP155, // Assuming Arbitrum Sepolia also uses EIP155 namespace
  displayName: "Arbitrum Sepolia",
  blockExplorerUrl: "https://sepolia-explorer.arbitrum.io", // This is the block explorer URL for Arbitrum Sepolia
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://path-to-arbitrum-sepolia-logo.svg", // Replace with the actual logo URL
};

*/

const chainConfigs = {
  sepolia: sepoliaConfig,
  // arbitrumSepolia: arbitrumSepoliaConfig,
};

// When you need to switch to a different chain
/* const privateKeyProviderArbitrum = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfigs["arbitrumSepolia"] },
}); */

/* 
const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});
*/

// Create a Web3Auth instance for Arbitrum Sepolia
/*
const web3authArbitrumSepolia = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProviderArbitrum, // This uses the Arbitrum Sepolia config
});
*/

// Now you can use web3authSepolia or web3authArbitrumSepolia to connect to the respective chains

function Web3authButton() {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [walletServicesPlugin, setWalletServicesPlugin] = useState<WalletServicesPlugin | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            uxMode: "redirect", // "redirect" | "popup"
            whiteLabel: {
              logoLight: "https://web3auth.io/images/web3authlog.png",
              logoDark: "https://web3auth.io/images/web3authlogodark.png",
              defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl, tr
              mode: "dark", // whether to enable dark, light or auto mode. defaultValue: auto [ system theme]
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });
  
        web3authSepolia.configureAdapter(openloginAdapter);
  
        await web3authSepolia.initModal();
        setProvider(web3authSepolia.provider);
  
        if (web3authSepolia.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3authSepolia.connect();
    setProvider(web3authProvider);
    if (web3authSepolia.connected) {
      setLoggedIn(true);
    }
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    const user = await web3authSepolia.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    await web3authSepolia.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  
  const showWCM = async () => {
    if (!walletServicesPlugin) {
      uiConsole("torus plugin not initialized yet");
      return;
    }
    await walletServicesPlugin.showWalletConnectScanner();
    uiConsole();
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    // Get user's Ethereum public address
    const address = await web3.eth.getAccounts();
    uiConsole(address);
  };


  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    // Get user's Ethereum public address
    const address = (await web3.eth.getAccounts())[0];

    // Get user's balance in ether
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address), // Balance is in wei
      "ether"
    );
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0];

    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await web3.eth.personal.sign(
      originalMessage,
      fromAddress,
      "test password!" // configure your own password here.
    );
    uiConsole(signedMessage);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
        
        <div>
          <button onClick={showWCM} className="card">
            Show Wallet Connect
          </button>
        </div>
        
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button
      onClick={login}
      className="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login
    </button>
  );

  return (
    <div className="container">
      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </div>
  );
}

export default Web3authButton;
