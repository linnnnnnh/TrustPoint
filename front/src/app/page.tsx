// pages/index.tsx
/*"useClient";

import React from "react";
import Home from "../components/Home";
import LoginHome from "../components/LoginHome"; // Import the LoginHome component
import useAuth from "@/hooks/useAUth";

const HomePage = () => {
  
  const { authenticateUser, isLoggedIn } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {isLoggedIn ? <Home /> : <LoginHome />}
    </main>
  );
};

export default HomePage;*/

// pages/index.tsx
"useClient";

import React from "react";
import Home from "../components/Home";
import LoginHome from "../components/LoginHome"; // Import the LoginHome component
import useAuth from "@/hooks/useAUth";

const HomePage = () => {
  


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
  <Home /> 
    </main>
  );
};

export default HomePage;