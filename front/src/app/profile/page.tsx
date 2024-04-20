"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Button, Label, Select, TextInput } from "flowbite-react";

export default function Profile() {

    const [address, setAddress] = useState(null);

    const getAddress = () => {
        // Get the data from localStorage
        const data = localStorage.getItem('address');
      
        if (data) {
          // Parse the JSON string into an object
          const parsedData = JSON.parse(data);
      
          // Access the address
          const address = parsedData.address;
      
          console.log(address);
          setAddress(address); // Set the address state
        } else {
          console.log('No address found');
        }
      };

        // Call getAddress on component mount
  useEffect(() => {
    getAddress();
  }, []);
 

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-center mt-32 w-full">
          <h1 className="mt-2 text-2xl font-semibold text-blue-900 mb-4">
            Your Profile
          </h1>
          <h2 className="mt-2 text-base font-semibold text-blue-900">You are connected as</h2>
          <p className="mt-2 text-base text-blue-900 mb-4">{address}</p>
          
          

          <div className="flex flex-col gap-2 px-12">
            <div>
              <div className="block mb-2">
                <Label className="font-bold " htmlFor="base" value="Address" />
              </div>
              {/* Affichez l'adresse du portefeuille dans le champ de texte */}
              <TextInput id="Address" type="text" sizing="md" value="Address" readOnly />
            </div>
            {/* Le reste de votre formulaire */}
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
          <Button className="mt-6" color="warning">Save</Button>
        </section>
      </main>
    </>
  );
}