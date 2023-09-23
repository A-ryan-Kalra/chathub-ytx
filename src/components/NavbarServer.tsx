import React, { useEffect, useState } from "react";
import { Employee } from "../../Types";
import { push } from "firebase/database";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { serverName, setParam, setParam1 } from "../../atoms/modalAtoms";
import Link from "next/link";
import Image from "next/image";

function NavbarServer({ post, id }: Employee) {
  // console.log(post);

  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedServer, setSelectedServer] = useState<boolean>(false);
  const [serverNames, setServerNames] = useRecoilState<string>(serverName);
  const [urlParams, setUrlParams] = useRecoilState<string>(setParam);
  const [urlParams1, setUrlParams1] = useRecoilState<string>(setParam1);

  const paramsId: string = urlParams;

  const router = useRouter();
  // console.log(paramsId.length);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log(window.location.pathname);
  useEffect(() => {
    const setServer: boolean = JSON.parse(
      sessionStorage.getItem("setServer") || "false"
    );
    const server: string = JSON.parse(
      sessionStorage.getItem("serverName") || "123"
    );

    if (id === urlParams) {
      setTimeout(() => {
        setSelectedServer(true);
        // console.log(id);
      }, 100);
    }
    // setServerNames(urlParams);
  }, [urlParams]);

  let location: Employee = window.location.pathname.split("/");
  // console.log(location[2]);

  return (
    <Link href={`/channels/${post.uid}`}>
      {isClient && Object.keys(post).length !== 0 && (
        <div
          className=" w-full cursor-pointer flex  mx-auto h-[50px] group"
          onClick={() => {
            sessionStorage.setItem("setServer", JSON.stringify(true));
            sessionStorage.setItem("serverName", JSON.stringify(post.uid));
            // router.push(`/channels/${post.uid}`);
            // setServer();
          }}
        >
          <div className="relative  h-full  w-1 flex  mr-2 ">
            <div
              className={`bg-white h-full duration-[100] transition-all transform ease-in origin-center scale-y-[16%] ${
                selectedServer
                  ? "scale-y-[80%] duration-[100] transition-all transform ease-in"
                  : "group-hover:scale-y-[40%]"
              } my-auto rounded-r-[100%] w-2`}
            ></div>
          </div>
          <Image
            src={post?.serverImage}
            width={50}
            height={50}
            className="rounded-full  hover:rounded-2xl w-[50px] h-[50px] object-cover transition"
            alt=""
          />
        </div>
      )}
    </Link>
  );
}

export default NavbarServer;
