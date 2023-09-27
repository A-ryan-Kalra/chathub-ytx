import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import { sessionState } from "../../atoms/modalAtoms";
import { IBM_Plex_Mono } from "next/font/google";

const inter = IBM_Plex_Mono({ weight: "400", subsets: ["latin"] });
function Me() {
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

    console.log(randomIndex);
    // console.log(images[randomIndex]);
  }, []);
  useEffect(() => {
    setSession(session);
    setIsClient(true);
  });
  return (
    <div className="flex  relative flex-grow bg-gradient-to-r from-[#475FEC] to-fuchsia-600 z-[-1]">
      <p
        className={`cursor-default text-white z-[1] ml-2 absolute top-10 text-[50px]  ${inter.className}`}
      >
        {isClient &&
          "Welcome" + " " + session?.user?.displayName.split(" ").join("_")}
      </p>

      <div className=" ml-auto flex z-[0] justify-end flex-col  items-end">
        {isClient && (
          <Image
            alt="home"
            className=" object-contain "
            src={img}
            width={900}
            height={600}
          />
        )}
      </div>
    </div>
  );
}

export default Me;
