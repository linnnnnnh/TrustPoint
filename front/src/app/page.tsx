// pages/index.tsx
"useClient";

import React from "react";
import Home from "../app/home/page";
import LoginHome from "../app/loginHome/page";

// Token ID session to detect if the wallet is connected
// const isWalletConnected = false; // Set this to true to see the Home component



const HomePage = () => {
const isWalletConnected = false; // Set this to true to see the Home component

  return (
  
    <main className="flex min-h-screen flex-col items-center justify-between">
      {isWalletConnected ? <Home /> : <LoginHome />}
    </main>
 
  );
};

export default HomePage;