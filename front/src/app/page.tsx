// pages/index.tsx
"useClient";

import React from "react";
import Home from "../components/Home";
import LoginHome from "../components/LoginHome"; // Import the LoginHome component


const HomePage = () => {
const isWalletConnected = false; // Set this to true to see the Home component

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {isWalletConnected ? <Home /> : <LoginHome />}
    </main>
  );
};

export default HomePage;