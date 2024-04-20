import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { IProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import RPC from "../components/viem"



// 1. Créez un nouveau contexte
export const UserContext = createContext(null);

// 2. Créez un composant Provider
export const UserProvider = (({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState(null);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  function uiConsole(...args: unknown[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const getAccounts = async () => {
    if (!web3auth?.provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider as IProvider);
    const address = await rpc.getAccounts();
    setAddress(address);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <UserContext.Provider value={address}>
      {children}
    </UserContext.Provider>
  );
});


