"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { ethers } from "ethers";
// import ABI from "./contract-abi.json";

const ABI = require("../contract-abi.json");

interface Ethereum {
  isMetaMask: boolean;
  request: (request: { method: string; params?: string[] }) => Promise<string>;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}

export default function Profile() {
  const [userAddress, setAddress] = useState<string | null>(null);
  const [customerPoints, setCustomerPoints] = useState<number | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  const getAddress = () => {
    const data = localStorage.getItem("address");

    if (data) {
      const parsedData = JSON.parse(data);
      const userAddress = parsedData.address;
      setAddress(userAddress);
    } else {
      console.log("No address found");
    }
  };

  useEffect(() => {
    const getSigner = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
    };

    getSigner();
    getAddress();
  }, []);

  const contractAddress = "0x063DF104b96DE5828b1f3430668C35A3d97Fc73F";

  useEffect(() => {
    const fetchCustomerPoints = async () => {
      if (userAddress && signer) {
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        const points = await contract.getCustomerPoints(userAddress);
        setCustomerPoints(points);
      }
    };

    fetchCustomerPoints();
  }, [userAddress, signer]);


  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-center mt-32 w-full">
          <h1 className="mt-2 text-2xl font-semibold text-blue-900 mb-4">
            Your Profile
          </h1>

          <div className="flex flex-col gap-2 px-12">
            <div>
              <div className="block mb-2">
                <Label
                  className="font-bold "
                  htmlFor="points"
                  value="Customer Points"
                />
              </div>
              <TextInput
                id="Points"
                type="text"
                sizing="md"
                value={customerPoints || ""}
                readOnly
              />
            </div>
            <div>
              <div className="block mb-2">
                <Label
                  className="font-bold "
                  htmlFor="base"
                  value="Wallet address"
                />
              </div>
              <TextInput
                id="Address"
                type="text"
                sizing="md"
                value={userAddress || ""}
                readOnly
              />
            </div>
            <div>
              <div className="block mb-2">
                <Label className="font-bold" htmlFor="base" value="Age" />
              </div>
              <TextInput id="Age" type="date" sizing="md" />
            </div>
            <div className="block">
              <Label className="font-bold" htmlFor="gender" value="Gender" />
            </div>
            <Select id="gender" required>
              <option>Male</option>
              <option>Female</option>
              <option>N/A</option>
            </Select>
            <div className="block">
              <Label className="font-bold" htmlFor="countries" value="Select your country" />
            </div>
            <Select id="countries" required>
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
          </div>
          


          
          <Button className="mt-6" color="warning">
            Submit
          </Button>
        </section>
      </main>
    </>
  );
}