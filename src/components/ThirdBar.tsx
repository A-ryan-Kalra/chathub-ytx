import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import { channelName, screenState, sessionState } from "../../atoms/modalAtoms";
import ChatSection from "./ChatSection";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { error } from "console";

function ThirdBar({
  urlParams1,
  urlParams,
}: {
  urlParams1: string;
  urlParams: string;
}) {
  const [channelNameState, setChannelNameState] =
    useRecoilState<Employee[]>(channelName);

  const [channel, setChannel] = useState<string>("");
  const [channelSaved, setChannelsaved] = useState<Employee>([]);
  const [input, setInput] = useState<string>("");
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [screen, setScreen] = useRecoilState<boolean>(screenState);
  //   console.log(session);

  useEffect(() => {
    channelNameState.forEach((i) => {
      if (i.uid === urlParams1) {
        setChannel(i?.channelName);
        setChannelsaved(i);
      } else if (urlParams1 === "") {
        setChannel("");
      }
    });
  });

  console.log(screen);

  async function sendPost() {
    console.log("pressed");
    if (urlParams1 !== "") {
      try {
        const docRef = await addDoc(
          collection(
            database,
            "Users",
            urlParams,
            "Channels",
            urlParams1,
            "Comments"
          ),
          {
            name: session?.user?.displayName,
            email: session?.user?.email,
            userImg: session?.user?.photoURL,
            text: input,
            timestamp: serverTimestamp(),
          }
        );
      } catch (e) {
        console.error("Error adding document to Comments Section", e);
      }
    }
    setInput("");
  }
  return (
    <div
      className={`bg-[#303339] flex flex-col flex-grow ${screen && "hidden"}`}
    >
      <div className="flex py-[12.5px] px-3 items-center justify-between border-b-black border-b">
        <div className="flex items-center  justify-between space-x-3 w-fit">
          <Icon
            icon="codicon:three-bars"
            className={`text-white lg:hidden cursor-pointer`}
            width={20}
            onClick={() => setScreen(true)}
          />
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
      <div className="flex flex-col  flex-grow overflow-y-auto">
        <ChatSection channelSaved={channelSaved} />
      </div>
      <div className=" relative justify-center flex flex-grow max-h-[70px] py-2 px-6  items-center pr-32">
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="outline-none text-white text-[16px] placeholder:text-[16px]  p-2 bg-[#383A40] w-full h-10 rounded-l-lg"
          placeholder={`Message #${channelSaved?.channelName}`}
        />
        <div className="bg-[#383A40] flex items-center h-10 w-10 rounded-r">
          <button
            type="button"
            className="disabled:text-black text-[#B4BAC0]"
            disabled={!input.trim() as unknown as boolean}
          >
            <Icon
              icon="mingcute:send-fill"
              className=" "
              width={25}
              onClick={sendPost}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThirdBar;
