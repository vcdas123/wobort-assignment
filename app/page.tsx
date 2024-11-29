"use client";
import PageHeader from "@/components/PageHeader/PageHeader";
import logo from "/public/wobot_logo_blue.svg";
import Image from "next/image";
import Select from "@/components/Select/Select";
import { useState } from "react";
import { GoLocation } from "react-icons/go";
import { BiWifi } from "react-icons/bi";

export default function Home() {
  const [location, setLocation] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const options = [
    { label: "London", value: "london" },
    { label: "Paris", value: "paris" },
    { label: "New York", value: "new-york" },
    { label: "India", value: "india" },
  ];
  return (
    <section className="container mx-auto h-full mt-5 flex flex-col gap-5">
      <div className="flex justify-center items-center">
        <Image src={logo.src} alt="logo" height={36} width={162.62} />
      </div>
      <PageHeader />
      <div className="table-container">
        <div className="bg-white py-1 px-2 w-full flex justify-between">
          <div className="flex xl:flex-row flex-col xl:items-center gap-3 w-full xl:max-w-[500px]">
            <Select
              options={options}
              value={location}
              onChange={setLocation}
              leftIcon={<GoLocation className="text-lg text-gray-700" />}
              placeholder="Location"
            />
            <Select
              options={options}
              value={status}
              onChange={setStatus}
              leftIcon={
                <BiWifi className="text-lg text-gray-700 transform rotate-45" />
              }
              placeholder="Status"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
