"use client";

import React, { useState, useEffect } from "react";
import Home from "../app/home/page";
import LoginHome from "../app/loginHome/page";
import { useUserContext, UserContextProvider } from "../contexts/UserContext";


// Token ID session to detect if the wallet is connected
// const isWalletConnected = false; // Set this to true to see the Home component

const HomePage = () => {
  const { isConnected } = useUserContext();


  return (
    <UserContextProvider>
    <main className="flex min-h-screen flex-col items-center justify-between">
      {isConnected ? <Home /> : <LoginHome />}
    </main>
    </UserContextProvider>
 
  );
};

export default HomePage;