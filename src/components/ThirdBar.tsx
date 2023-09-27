import React, {
  FormEvent,
  FormEventHandler,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import { channelName, screenState, sessionState } from "../../atoms/modalAtoms";
import ChatSection from "./ChatSection";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
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
  const [list, setList] = useState<Array<string>>([]);

  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [screen, setScreen] = useRecoilState<boolean>(screenState);
  // console.log(session);
  const [user, setUser] = useState<Employee>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    channelNameState.forEach((i) => {
      if (i.uid === urlParams1) {
        setChannel(i?.channelName);
        setChannelsaved(i);
      } else if (urlParams1 === "") {
        setChannel("");
      }
    });
    setName(session?.user?.displayName.split(" ")[0]);
  });
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // console.log(name);

  useEffect(() => {
    if (urlParams1 !== "") {
      onSnapshot(
        query(
          collection(
            database,
            "Users",
            urlParams,
            "Channels",
            urlParams1,
            "Comments"
          ),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          let arr: Employee = [];

          snapshot.docs.map((i) => {
            arr.push({ ...i.data() });
          });

          setUser(arr);
        }
      );
      setList([]);
    } else {
      setUser([]);
    }
  }, [database, urlParams1]);
  // console.log(list);

  async function sendPost(e: FormEvent<HTMLFormElement> | MouseEvent) {
    e.preventDefault();

    if (urlParams1 === "") {
      setList((prev) => [...prev, input]);
    }

    let arr: string = input;
    setInput("");

    if (urlParams1 !== "" && input !== "") {
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
            text: arr,
            timestamp: serverTimestamp(),
          }
        );
      } catch (e) {
        console.error("Error adding document to Comments Section", e);
      }
    }
  }
  return (
    <div
      className={`bg-[#303339] min-h-screen flex justify-between flex-col  flex-grow ${
        screen && "hidden md:flex md:flex-col  md:flex-grow"
      }`}
    >
      <div className="flex py-[14.5px]  px-3 items-center justify-between border-b-black border-b">
        <div className="flex items-center justify-between space-x-3 w-fit">
          <Icon
            icon="codicon:three-bars"
            className={`text-white lg:hidden cursor-pointer`}
            width={25}
            onClick={() => setScreen(true)}
          />
          <Icon
            icon="akar-icons:hashtag"
            className="text-[#949BA4] hover:text-white"
            width={20}
          />
          <h1 className="text-white -m-1 cursor-default">
            {isClient && channel !== "" ? channel : "Hello, " + name}
          </h1>
        </div>
        <div className="flex mr-2 ml-10 md:justify-around md:min-w-[200px] gap-3 items-center ">
          <Icon
            icon="solar:hashtag-chat-bold"
            className="text-[#949BA4] md:inline hidden hover:text-white"
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
            className="text-[#949BA4] md:inline hidden hover:text-white"
          />
          <Icon
            icon="tdesign:member"
            width={20}
            className="text-[#949BA4] hover:text-white"
          />
        </div>
      </div>
      <div className="flex flex-col relative pb-10 flex-grow justify-end ">
        <div className="max-h-[80vh] overflow-y-auto  ">
          {Object.keys(user).length !== 0 && isClient && urlParams1 !== ""
            ? Object.values(user).map((i: Employee, index: number) => (
                <ChatSection
                  channelSaved={channelSaved}
                  user={i}
                  key={index}
                  urlParams1={urlParams1}
                />
              ))
            : Object.keys(list).length !== 0 &&
              isClient &&
              list.map((item: string, index) => (
                <ChatSection
                  channelSaved={channelSaved}
                  user={item}
                  key={index}
                  urlParams1={urlParams1}
                />
              ))}
        </div>
      </div>
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) => sendPost(event)}
        className=" relative justify-center  flex bottom-10 max-h-[70px]  py-2 px-6 z-10 bg-[#313239] flex-grow items-center pr-22"
      >
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="outline-none text-white text-[16px] placeholder:text-[16px]  p-2 bg-[#383A40] w-full h-10 rounded-l-lg"
          placeholder={`Message #${
            channelSaved?.channelName ? channelSaved?.channelName : "ToMe"
          }`}
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
              onClick={(event: MouseEvent) => sendPost(event)}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ThirdBar;
