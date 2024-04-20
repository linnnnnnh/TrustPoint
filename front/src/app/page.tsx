"use client";

import React, { useState, useEffect } from "react";
import Home from "../app/home/page";
import LoginHome from "../app/loginHome/page";


// Token ID session to detect if the wallet is connected
// const isWalletConnected = false; // Set this to true to see the Home component

const HomePage = () => {
  
// const isWalletConnected = false; // Set this to true to see the Home component
function useIsUserConnected() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    let walletAddressToken = null;

    // Loop through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Check if key contains wallet address
      if (key && key.includes('metamask')) {
        walletAddressToken = localStorage.getItem(key);
        break;
      }
    }

    setIsConnected(idToken != null || walletAddressToken != null);

    // Log all items in localStorage
    console.log('All items in localStorage:', Object.entries(localStorage));

    if (walletAddressToken) {
      console.log('Wallet address token:', walletAddressToken);
    } else {
      console.log('No wallet address token');
    }

    if (idToken) {
      console.log('idToken from home:', idToken);
    } else {
      console.log('no token');
    }
  }, []);

  return isConnected;
}

const isWalletConnected = useIsUserConnected();

  return (
  
    <main className="flex min-h-screen flex-col items-center justify-between">
      {isWalletConnected ? <Home /> : <LoginHome />}
    </main>
 
  );
};

export default HomePage;