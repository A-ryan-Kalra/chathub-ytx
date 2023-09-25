import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import { channelName } from "../../atoms/modalAtoms";

function ThirdBar({ urlParams1 }: { urlParams1: string }) {
  const [channelNameState, setChannelNameState] =
    useRecoilState<Employee[]>(channelName);

  const [channel, setChannel] = useState<string>("");

  useEffect(() => {
    channelNameState.forEach((i) => {
      if (i.uid === urlParams1) {
        setChannel(i?.channelName);
      } else if (urlParams1 === "") {
        setChannel("");
      }
    });
  });

  return (
    <div className="bg-[#303339] flex flex-col flex-grow">
      <div className="flex py-[12.5px] px-3 items-center justify-between border-b-black border-b">
        <div className="flex items-center  justify-between space-x-3 w-fit">
          <Icon
            icon="akar-icons:hashtag"
            className="text-[#949BA4] hover:text-white"
            width={20}
          />
          <h1 className="text-white cursor-default">{channel}</h1>
        </div>
        <div className="flex ml-10 justify-around min-w-[200px] gap-3 items-center">
          <Icon
            icon="solar:hashtag-chat-bold"
            className="text-[#949BA4] hover:text-white"
            width={20}
          />
          <Icon
            icon="mdi:bell"
            width={20}
            className="text-[#949BA4] hover:text-white"
          />
          <Icon
            icon="typcn:pin"
            width={20}
            className="text-[#949BA4] hover:text-white"
          />
          <Icon
            icon="tdesign:member"
            width={20}
            className="text-[#949BA4] hover:text-white"
          />
        </div>
      </div>
      <div className="bg-black flex-grow overflow-y-auto"></div>
      <div className="bg-white flex-grow max-h-[70px]"></div>
    </div>
  );
}

export default ThirdBar;
