"use client";

import NavBar from "../../components/NavBar";
import { Button, Label, Select, TextInput } from "flowbite-react";

export default function Profile() {
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
                <Label className="font-bold " htmlFor="base" value="Address" />
              </div>
              <TextInput id="Address" type="text" sizing="md" />
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
          <Button className="mt-6" color="warning">Save</Button>
        </section>
      </main>
    </>
  );
}
