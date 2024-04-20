"use client";

import NavBar from "../components/NavBar";
import Web3AuthLogin from "./Web3AuthLogin";


export default function LoginHome() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col items-center mt-32 w-full">
            <h1 className="mt-16 text-base md:text-2xl font-semibold text-blue-900 mb-4">WELCOME</h1>
            <h2 className="text-base md:text-xl font-semibold text-blue-900 mb-16">Connect your wallet to access to your Account</h2>
          <div className="flex">
            <Web3AuthLogin />
          </div>
          
        </section>
        </main>
        
    </>
  );
}
