import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Employee } from "../../Types";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useRecoilState } from "recoil";
import { setParam, setParam1, setParamsUrl } from "../../atoms/modalAtoms";
import Link from "next/link";
import { error } from "console";

function ChannelNameSection({
  channel,
  id,
  channelNameState,
  urlParams12,
}: {
  channel: Employee;
  id: String;
  channelNameState: Employee;
  urlParams12: string;
}) {
  const [channelState, setChannelState] = useState(false);
  const [url, setUrl] = useRecoilState<string>(setParamsUrl || "");
  // const [urlParams1, setUrlParams1] = useRecoilState<string>(setParam1 || "");
  const [secondParam, setSecondParam] = useState<string>("");
  const [urlParams, setUrlParams] = useRecoilState<string>(setParam);

  //   console.log(Object.keys(channelNameState).length);
  const [id1, setId1] = useState<string>("");
  // console.log(url);
  const [channelNameState1, setChannelNameState1] = useState<Employee>([]);
  // console.log(urlParams12);
  function channelStatusChecked(): void {
    channelNameState1.map(async (item: Employee, index: number) => {
      if (Object.keys(channelNameState1).length !== 0) {
        try {
          if (urlParams12 === item?.uid) {
            await updateDoc(
              doc(database, "Users", url || "asd", "Channels", item?.uid),
              {
                checkStatus: true,
              }
            );
            // setChannelState(true);
            // console.log("error bypassing");
            // console.log(typeof item.uid);
          } else {
            await updateDoc(
              doc(database, "Users", url || "asds", "Channels", item?.uid),
              {
                checkStatus: false,
              }
            );
            // setChannelState(false);
            // console.log("oooppps");
          }
        } catch (e) {
          console.error("No document to update", e);
          // setUrl("");
          // setChannelNameState1([]);
        }
      } else {
        return;
      }
    });
  }
  //   console.log(channel.checkStatus);
  // console.log(urlParams12);
  useEffect(() => {
    if (Object.keys(channelNameState).length !== 0) {
      // console.log("trespassing");
      // console.log(Object.keys(channelNameState1).length);
      // console.log(Object.keys(channelNameState).length);
      channelStatusChecked();
    }
    // let channelNameSessionStorage: object = JSON.parse(sessionStorage.getItem("post") || "{}");

    setChannelState(channel.checkStatus);
  });
  useEffect(() => {
    setSecondParam(urlParams12);

    setChannelNameState1(channelNameState);
    // console.log(Object.keys(channelNameState).length);
    // console.log("error");
  }, []);

  //   console.log(channelState);
  return (
    <Link
      href={`/channels/${urlParams}/${channel?.uid}`}
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
    </Link>
  );
}

export default ChannelNameSection;
