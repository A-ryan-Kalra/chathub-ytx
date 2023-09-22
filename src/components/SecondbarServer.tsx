import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import { setParam, setParamsUrl } from "../../atoms/modalAtoms";
import { Icon } from "@iconify/react";

function SecondbarServer({
  post,
  id,
  serverName,
}: {
  post: Employee;
  id: Employee;
  serverName: string;
}) {
  // console.log(post);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [urlParams, setUrlParams] = useRecoilState<string>(setParam);
  const [url, setUrl] = useRecoilState<string>(setParamsUrl);
  const [channelState, setChannelState] = useState(true);
  // console.log(paramsId);
  // console.log(url);

  useEffect(() => {
    const paramsId: string = urlParams;
    setUrl(paramsId);

    setIsClient(true);
  }, []);

  function addChannelName(): void {
    const channelName = prompt("Enter a name");
    console.log(channelName);
  }
  return (
    <>
      {isClient &&
        Object.keys(post).length !== 0 &&
        urlParams === post?.uid && (
          <>
            <div className="flex justify-between hover:bg-[#3a3c42] cursor-pointer p-3 border-b-2 border-black">
              <h1 className="w-full text-white text-[14px] font-semibold tracking-wide">
                {post.serverName}
              </h1>
              <Icon icon="mdi:chevron-down" width={25} className="text-white" />
            </div>
            <span className="flex items-center justify-between cursor-pointer  p-1 py-3">
              <span className="flex items-center  group ">
                <Icon
                  icon="mdi:chevron-down"
                  width={14}
                  className="group-hover:text-white text-[#787F86] font-bold"
                />
                <h2 className="group-hover:text-white text-[#787F86] text-xs font-bold">
                  TEXT CHANNELS
                </h2>
              </span>
              <Icon
                icon="basil:plus-solid"
                className="text-[#949BA4] mr-[7px] hover:text-white"
                width={25}
                onClick={addChannelName}
              />
            </span>
            <div className=" min-h-screen px-2">
              <div
                className={`flex justify-between ${
                  channelState ? "bg-[#404348] rounded-md" : ""
                } px-2 py-1 items-center cursor-pointer group`}
                onClick={() => setChannelState(!channelState)}
              >
                <span className="flex items-center space-x-1">
                  <Icon
                    icon="akar-icons:hashtag"
                    className={` ${
                      channelState ? "text-white" : "text-[#80828F]"
                    }`}
                    width={20}
                  />
                  <h2
                    className={` ${
                      channelState ? "text-white" : "text-[#80828F]"
                    }`}
                  >
                    general
                  </h2>
                </span>
                <span className="flex items-center  text-[#80828F] space-x-1 mr-[2px]  ">
                  <Icon
                    className={`${
                      channelState
                        ? "hover:text-white inline-block"
                        : "  group-hover:inline-block hidden hover:text-white "
                    }  `}
                    icon="material-symbols:person-add-rounded"
                    width={17}
                  />
                  <Icon
                    icon="icon-park-solid:setting"
                    className={`${
                      channelState
                        ? "hover:text-white inline-block"
                        : "  group-hover:inline-block hidden hover:text-white "
                    }  `}
                    width={13}
                  />
                </span>
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default SecondbarServer;
