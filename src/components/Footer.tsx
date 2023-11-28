"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-[#22262A]  flex items-center justify-center ">
      {/* max-md:grid-cols-2 md:grid-cols-3 */}
      <div className="flex-col flex px-[25px] py-[50px] w-full max-w-[1240px] ">
        <div className="text-white  min-h-[60vh]lg:flex-row flex max-md:flex-col justify-between   border-b-[1px]   border-[#5965F3]  ">
          <div className="flex   w-full max-w-[300px] flex-col gap-10 max-md:pb-14 max-sm:pt-10">
            <div className="inline-block space-x-2 cursor-pointer">
              <Icon
                icon="emojione-v1:flag-for-india"
                className="inline-block w-[25px] h-[25px]"
              />
              <span>English, IN</span>
              <Icon
                icon="mdi:chevron-down"
                className="inline-block"
                width={15}
              />
            </div>
            <div className="flex w-full items-center justify-between max-w-[220px] space-x-3 ">
              <Icon icon="mdi:twitter" className="cursor-pointer" width={27} />
              <Icon
                icon="mdi:instagram"
                className="cursor-pointer"
                width={27}
              />
              <Icon
                icon="ant-design:facebook-filled"
                className="cursor-pointer"
                width={27}
              />
              <Icon icon="mdi:youtube" className="cursor-pointer" width={27} />
              <Icon
                icon="ic:baseline-tiktok"
                className="cursor-pointer"
                width={27}
              />
            </div>
          </div>
          {/* <div className="flex flex-col  gap-7 max-w-[190px]"></div> */}

          <div className="grid grid-cols-2 lg:grid-cols-4  w-full  max-w-[800px]">
            <div className="flex flex-col pb-10 gap-7 max-w-[190px]">
              <h1 className="text-[#5965F3]">Product</h1>
              <ul className="flex flex-col gap-2">
                <Link href={"/"}>
                  <li className="hover:underline">Download</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Nitro</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Status</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">App Directory</li>
                </Link>
              </ul>
            </div>

            <div className="flex flex-col pb-10 gap-7 max-w-[190px]">
              <h1 className="text-[#5965F3]">Company</h1>
              <ul className="flex flex-col gap-2">
                <Link href={"/"}>
                  <li className="hover:underline">About</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Jobs</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Brand</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Newsroom</li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col pb-10 gap-7 max-w-[190px]">
              <h1 className="text-[#5965F3]">Resources</h1>
              <ul className="flex flex-col gap-2">
                <Link href={"/"}>
                  <li className="hover:underline">College</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Support</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Safety</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Blog</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Feedback</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Developers</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">StreamKit</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Creators</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Community</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Official 3rd Party Merch</li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col pb-10 gap-7 max-w-[190px]">
              <h1 className="text-[#5965F3]">Policies</h1>
              <ul className="flex flex-col gap-2">
                <Link href={"/"}>
                  <li className="hover:underline">Terms</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Privacy</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Cookie Settings</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Guidelines</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Acknowledgements</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Licensed</li>
                </Link>
                <Link href={"/"}>
                  <li className="hover:underline">Company Information</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
