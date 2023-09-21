import React, { useEffect, useState } from "react";
import { Employee } from "../../Types";
import { push } from "firebase/database";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { serverName, setParam } from "../../atoms/modalAtoms";

function NavbarServer({ post, id }: Employee) {
  // console.log(post);

  const [isClient, setIsClient] = useState<boolean>(false);
  const [selectedServer, setSelectedServer] = useState<boolean>(false);
  const [serverNames, setServerNames] = useRecoilState<string>(serverName);
  const [urlParams, setUrlParams] = useRecoilState<Employee>(setParam);
  const paramsId: string = urlParams.id[0];

  const router = useRouter();
  // console.log(urlParams);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // console.log(selectedServer);

  // console.log(paramsId);
  useEffect(() => {
    const setServer: boolean = JSON.parse(
      sessionStorage.getItem("setServer") || "false"
    );
    const server: string = JSON.parse(
      sessionStorage.getItem("serverName") || "123"
    );
    // const token: object = JSON.parse(sessionStorage.getItem("token") || "{}");
    // console.log(setServer);
    if (id === paramsId) {
      // console.log(server);

      setSelectedServer(setServer);
    }
    setServerNames(paramsId);
    // console.log(id);
  }, []);

  return (
    <>
      {isClient && Object.keys(post).length !== 0 && (
        <div
          className=" w-full cursor-pointer flex  mx-auto h-[50px] group"
          onClick={() => {
            sessionStorage.setItem("setServer", JSON.stringify(true));
            sessionStorage.setItem("serverName", JSON.stringify(post.uid));
            router.push(`/channels/${post.uid}`);
            // setServer();
          }}
        >
          <div className="relative  h-full  w-1 flex  mr-2 ">
            <div
              className={`bg-white h-full duration-[200ms] transition-all transform ease-in origin-center scale-y-[16%] ${
                selectedServer
                  ? "scale-y-[80%] duration-[7000ms] transition-all transform ease-in"
                  : "group-hover:scale-y-[40%]"
              } my-auto rounded-r-[100%] w-2`}
            ></div>
          </div>
          <img
            src={post?.serverImage}
            className="rounded-full  hover:rounded-2xl w-[50px] h-[50px] object-cover transition"
            alt=""
          />
        </div>
      )}
    </>
  );
}

export default NavbarServer;
