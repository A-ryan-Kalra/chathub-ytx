"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import { sessionState } from "../../atoms/modalAtoms";
import { IBM_Plex_Mono } from "next/font/google";

const inter = IBM_Plex_Mono({ weight: "400", subsets: ["latin"] });
function Me({ urlParams }: { urlParams: string }) {
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [img, setImg] = useState<string>("false");
  const images = [
    "/discord2.svg",
    "/discord1.svg",
    "/discord3.svg",
    "/discord4.svg",
    "/discord7.svg",
    "/d1.svg",
    "/d3.svg",
    "/d4.svg",
    "/d5.svg",
    "/d6.svg",
    "/d7.svg",
    "/d8.svg",
    "/callerId.svg",
  ];
  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * images.length);
    setImg(images[randomIndex]);
    setIsClient(true);
  }, []);
  useEffect(() => {
    setSession(session);
    setIsClient(true);
  }, [urlParams]);
  return (
    <div className="flex  flex-grow md:bg-gradient-to-br max-sm:bg-gradient-to-t from-[#475FEC] to-fuchsia-600 z-[-1]">
      {isClient && (
        <p
          className={`cursor-default text-white z-[1] ml-2 absolute top-10 md:text-[50px] sm:text-[33px] text-[26px]  ${inter.className}`}
        >
          Welcome {session?.user?.displayName.split(" ").join("_")}
        </p>
      )}
      <div className="relative   items-end  ml-auto flex z-[0]  justify-end   ">
        {isClient && (
          <img
            alt="home"
            className="  w-[500px] md:w-[680px] md:h-[480px] sm:h-[400px] sm:w-[600px] h-[200px] lg:w-[900px] lg:h-[600px]  "
            src={img}

            // width={900}
            // height={600}
          />
        )}
      </div>
    </div>
  );
}

export default Me;
