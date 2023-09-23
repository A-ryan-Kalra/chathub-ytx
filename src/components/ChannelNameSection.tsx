import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Employee } from "../../Types";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useRecoilState } from "recoil";
import { setParamsUrl } from "../../atoms/modalAtoms";

function ChannelNameSection({
  channel,
  id,
  channelNameState,
}: {
  channel: Employee;
  id: String;
  channelNameState: Employee;
}) {
  const [channelState, setChannelState] = useState(false);
  const [url, setUrl] = useRecoilState<string>(setParamsUrl);

  function channelStatusChecked(): void {
    channelNameState.map(async (item: Employee, index: number) => {
      if ((id as unknown as boolean) === (item?.uid as unknown as boolean)) {
        await updateDoc(doc(database, "Users", url, "Channels", item?.uid), {
          checkStatus: true,
        });
        // setChannelState(true);
        // console.log(typeof id);
        // console.log(typeof item.uid);
      } else {
        await updateDoc(doc(database, "Users", url, "Channels", item?.uid), {
          checkStatus: false,
        });
        // setChannelState(false);
      }
    });
  }
  console.log(channel.checkStatus);

  useEffect(() => {
    setChannelState(channel.checkStatus);
  });

  //   console.log(channelState);
  return (
    <div
      className={`flex justify-between hover:rounded-md ease-out   transform transition-all  hover:bg-[#494c53] ${
        channelState ? "bg-[#404348] rounded-md" : ""
      } px-2 py-[2px] items-center cursor-pointer group`}
      onClick={channelStatusChecked}
    >
      <span className="flex items-center space-x-1">
        <Icon
          icon="akar-icons:hashtag"
          className={` ${channelState ? "text-white" : "text-[#949BA4]"}`}
          width={20}
        />
        <h2 className={` ${channelState ? "text-white" : "text-[#949BA4]"}`}>
          {channel?.channelName}
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
  );
}

export default ChannelNameSection;
