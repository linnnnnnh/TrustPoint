// pages/index.tsx
"useClient";

import React from "react";
import Home from "../components/Home";


const HomePage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
       
        <Home />
      </main>
    </>
  );
};

export default HomePage;
