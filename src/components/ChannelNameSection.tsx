import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Employee } from "../../Types";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useRecoilState } from "recoil";
import {
  screenState,
  setParam,
  setParam1,
  setParamsUrl,
  userDeleted1,
} from "../../atoms/modalAtoms";
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

  const [secondParam, setSecondParam] = useState<string>("");
  const [urlParams, setUrlParams] = useRecoilState<string>(setParam);

  const [id1, setId1] = useState<string>("");
  const [userDeleted, setUserDeleted] = useRecoilState<Employee>(
    userDeleted1 || {}
  );

  const [channelNameState1, setChannelNameState1] = useState<Employee>([]);

  useEffect(() => {
    setChannelState(channel.uid === urlParams12);
  });

  // console.log(userDeleted);
  async function deleteChannel() {
    Object.keys(userDeleted).length !== 0 &&
      userDeleted.map(async (item: Employee, index: number) => {
        await deleteDoc(
          doc(
            database,
            "Users",
            urlParams,
            "Channels",
            urlParams12,
            "Comments",
            item?.uid
          )
        );
      });

    await deleteDoc(doc(database, "Users", urlParams, "Channels", urlParams12));
  }
  useEffect(() => {
    setSecondParam(urlParams12);

    setChannelNameState1(channelNameState);
  }, []);
  const [screen, setScreen] = useRecoilState<boolean>(screenState);

  //   console.log(channelState);
  return (
    <Link
      href={`/channels/${urlParams}/${channel?.uid}`}
      className={`flex justify-between hover:rounded-md ease-out   transform transition-all  hover:bg-[#494c53] ${
        channelState ? "bg-[#404348] rounded-md" : ""
      } px-2 py-[2px] items-center cursor-pointer group`}
      onClick={() => {
        setScreen(false);
      }}
    >
      <span className="flex items-center space-x-1">
        <Icon
          icon="akar-icons:hashtag"
          className={` ${channelState ? "text-white" : "text-[#949BA4]"}`}
          width={20}
        />
        <h2 className={` ${channelState ? "text-white" : "text-[#949BA4]"}`}>
          {channel?.channelName || ""}
        </h2>
      </span>
      <span className="flex items-center  text-[#80828F] space-x-1 mr-[2px]  ">
        <Icon
          className={`active:scale-75  ${
            channelState
              ? "hover:text-white inline-block"
              : "  group-hover:inline-block hidden hover:text-white "
          }  `}
          icon="material-symbols:person-add-rounded"
          width={17}
        />
        {channelState && (
          <Icon
            onClick={deleteChannel}
            icon="bi:trash-fill"
            className={`${
              channelState
                ? "hover:text-red-600 text-white inline-block"
                : "  group-hover:inline-block hidden hover:text-white "
            }  active:scale-75`}
            width={13}
          />
        )}
      </span>
    </Link>
  );
}

export default ChannelNameSection;
