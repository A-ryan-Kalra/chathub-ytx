import React, { useEffect, useState } from "react";
import { Employee } from "../../Types";
import { push } from "firebase/database";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {
  serverName,
  setParam,
  setParam1,
  userDeleted1,
} from "../../atoms/modalAtoms";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { channel } from "diagnostics_channel";
function NavbarServer({ post, id, urlParams }: Employee) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedServer, setSelectedServer] = useState<boolean>(false);
  const [serverNames, setServerNames] = useRecoilState<string>(serverName);
  // const [urlParams, setUrlParams] = useRecoilState<string>(setParam);
  const [urlParams1, setUrlParams1] = useRecoilState<string>(setParam1);
  const [userDeleted, setUserDeleted] = useRecoilState<Employee>(
    userDeleted1 || {}
  );
  const paramsId: string = urlParams;

  const router = useRouter();

  const [url, setUrl] = useState<string>("");
  const [id1, setId1] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
    setUrl(location[2]);
    setId1(id);
    check();
  });

  // setTimeout(() => {
  //   const id01: string = id;
  //   console.log(post.length!);
  // }, 100);

  // let sum = 0;

  // const cal = (n: number) => {
  //   sum = 1;
  //   for (let i = 1; i < n; i++) {
  //     sum *= i;
  //   }
  //   return sum;
  // };

  // const memoize = (cal: (n: number) => number) => {
  //   let cache: { [key: number]: any } = {};
  //   return function (...args: number[]) {
  //     let n = args[0];
  //     if (n in cache) {
  //       console.log("cache if");
  //       return cache[n];
  //     } else {
  //       let result = cal(n);
  //       cache[n] = result;
  //       console.log(cache);
  //       return result;
  //     }
  //   };
  // };
  // const memoizedCal = memoize(cal);

  // console.time();
  // console.log(memoizedCal(4));
  // console.timeEnd();

  // console.time();
  // console.log(cal(5));
  // console.timeEnd();
  // useEffect(() => {
  //   if (id1 === urlParams) {
  //     const timer = setTimeout(() => {
  //       setSelectedServer(true);
  //     }, 100);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setSelectedServer(false);
  //   }
  // });
  const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   // Use setTimeout to delay showing a message
  //   const timeoutId = setTimeout(() => {
  //     setShowMessage(true);
  //   }, 500); // Delay for 2 seconds (2000 milliseconds)

  //   // Clear the timeout if the component unmounts to avoid memory leaks
  //   return () => clearTimeout(timeoutId);
  // }, []); // Empty dependency array to ensure the effect runs only once

  const check = () => {
    const timer = setTimeout(() => {}, 500);
    return () => clearTimeout(timer);
  };

  let location: Employee = window.location.pathname.split("/");

  return (
    <Link href={`/channels/${post.uid}`} className="relative group">
      {isClient && Object.keys(post).length !== 0 && (
        <div className=" w-full active:scale-y-90 cursor-pointer flex  mx-auto h-[50px] group">
          <div className="relative  h-full  w-1 flex  mr-2 ">
            <div
              className={`bg-white h-full duration-[200ms] transition-all transform ease-in origin-center scale-y-[16%] ${
                id1 === urlParams
                  ? "scale-y-[80%] duration-[200ms]  transition-all transform ease-in"
                  : "group-hover:scale-y-[40%]"
              } my-auto rounded-r-[100%] w-2`}
            ></div>
          </div>

          <div className="rounded-full relative">
            <Image
              src={
                post?.serverImage
                  ? post?.serverImage
                  : "/20-200938_discord-png.webp"
              }
              width={50}
              height={50}
              className="rounded-full  hover:rounded-2xl w-[50px] h-[50px] object-cover transition"
              alt=""
            ></Image>
            {/* <div className="absolute -top-3 transform transition-all ease-in duration-200 group-hover:translate-y-1  h-4 w-4 right-0 group-hover:-translate-x-1 rounded-full z-[10] ">
              <Icon
                icon="typcn:delete"
                className="group-hover:text-[#DD412C] group-hover:bg-black hidden  group-hover:inline rounded-full"
              />
            </div> */}
          </div>
        </div>
      )}
    </Link>
  );
}

export default NavbarServer;
