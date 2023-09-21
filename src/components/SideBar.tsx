"use client";
import React, { useState } from "react";
import { SideBarProps } from "../../Types";

function SideBar({ item, checked, setIsSelected }: SideBarProps) {
  return (
    <div
      className={`p-2 w-full max-w-[230px] rounded-lg ${
        checked ? "bg-[#F7F6F7]" : ""
      } cursor-pointer `}
      onClick={setIsSelected}
    >
      <h1
        className={`${
          checked
            ? "text-blue-500 hover:underline decoration-blue-500"
            : "hover:underline"
        }`}
      >
        {item.title}
      </h1>
    </div>
  );
}

export default SideBar;
