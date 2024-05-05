"use client";
import React from "react";
import { Arvo } from "next/font/google";

const inter = Arvo({
  subsets: ["latin"],
  weight: "400",
  display: "block",
});


export const Footer = () => {
  return (
    <div className={`bg-gradient-to-br from-fuchsia-400 to-yellow-300 relative border-t-2 border-gray-300`}>
      <div
        className={`${inter.className} flex relative justify-around items-center  duration-300  py-3  `}
      >
        <span className="md:text-xl text-[14px]">
          {new Date().getFullYear()} &copy; All Rights Reserved.
        </span>
        <span className="md:text-xl text-[14px] spacex items-center flex justify-center">
          Made By Aryan Kalra
        </span>
      </div>
    </div>
  );
};
