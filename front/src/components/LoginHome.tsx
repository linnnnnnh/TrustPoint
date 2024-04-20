"use client";

import NavBar from "../components/NavBar";
import Web3AuthLogin from "./Web3AuthLogin";


export default function LoginHome() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col items-center mt-32 w-full">
          <div className="flex">
            <Web3AuthLogin />
          </div>
          
        </section>
        </main>
        
    </>
  );
}
