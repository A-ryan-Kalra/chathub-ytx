import React, {
  FormEvent,
  FormEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import {
  channelName,
  screenState,
  sessionState,
  userDeleted1,
} from "../../atoms/modalAtoms";
import ChatSection from "./ChatSection";
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, database } from "../../firebaseConfig";
import { error } from "console";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Rubik_Wet_Paint } from "next/font/google";

const inter = Rubik_Wet_Paint({ subsets: ["latin"], weight: "400" });
function ThirdBar({
  urlParams1,
  post,
  urlParams,
  params,
}: {
  params: Employee;
  urlParams1: string;
  urlParams: string;
  post: Employee;
}) {
  const [channelNameState, setChannelNameState] = useRecoilState<Employee[]>(
    channelName || []
  );

  const [channel, setChannel] = useState<string>("");
  const [channelSaved, setChannelsaved] = useState<Employee>([]);

  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<Array<string>>([]);

  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [screen, setScreen] = useRecoilState<boolean>(screenState);
  const [user, setUser] = useState<Employee>([]);
  const [userDeleted, setUserDeleted] = useRecoilState<Employee>(
    userDeleted1 || {}
  );
  const [isClient, setIsClient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.keys(channelNameState).length !== 0) {
      channelNameState.forEach((i) => {
        if (i.uid === urlParams1) {
          setChannel(i?.channelName || "");
          setChannelsaved(i || []);
        } else if (urlParams1 === "") {
          setChannel("");
          setChannelsaved([]);
        }
      });
    } else {
      setChannelNameState(channelNameState);

      setChannelsaved([]);
      setChannel("");
    }
    setName(session?.user?.displayName.split(" ")[0]);
  }, [urlParams1, urlParams, database]);
  // console.log(database.type);
  const [name, setName] = useState<string>("");

  // useEffect(() => {
  //   if (Object.keys(post).length === 0 && urlParams === "") {
  //     router.push("/channels/@me");
  //   }
  // }, [database]);

  useEffect(() => {
    setIsClient(true);

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
          // console.log(Object.keys(arr).length);

          setUser(arr || []);
          setUserDeleted(arr || []);
        }
      );
      setList([]);
    } else {
      setUser([]);
    }
  }, [database, urlParams1]);
  // console.log(Object.keys(channelSaved).length);
  const time = moment().calendar();

  useEffect(() => {
    if (urlParams1 === "") {
      const timer = setTimeout(() => {
        setList([]);
        // setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [list]);

  async function sendPost(e: FormEvent<HTMLFormElement> | MouseEvent) {
    e.preventDefault();

    if (urlParams1 === "" && input.trim()) {
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
            text: arr || "",
            posttime: time,
            uniqueKey: session?.user?.uid,

            timestamp: serverTimestamp(),
          }
        );
        await updateDoc(
          doc(
            database,
            "Users",
            urlParams,
            "Channels",
            urlParams1,
            "Comments",
            docRef.id
          ),
          {
            uid: docRef.id,
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
        screen && "hidden lg:flex lg:flex-col  lg:flex-grow"
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
            {isClient && channel !== ""
              ? channel || ""
              : "Hello, " + name || ""}
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
          {Object.keys(list).length === 0 && urlParams1 === "" && (
            <div className="flex justify-center flex-col items-center">
              <p
                className={`text-[40px] pb-5 text-center text-[#77e6ca] ${inter.className}`}
              >
                Write down something disappearing...
              </p>
              <div
                className={`flex items-center justify-center bg-gradient-to-br from-[#a75bc3] to-[#366bb0] rounded-2xl`}
              >
                <Icon
                  // icon="game-icons:magic-gate"
                  icon="game-icons:magic-portal"
                  width={350}
                  height={350}
                  className="bg-cover rounded-2xl pb-2 text-[#c2c663]"
                />
                {/* <img
                src={"/disappear.svg"}
                alt="logo"
                width={450}
                height={450}
                className="text-white"
              /> */}
              </div>
            </div>
          )}
          {Object.keys(user).length !== 0 && isClient && urlParams1 !== ""
            ? Object.values(user).map((i: Employee, index: number) => (
                <ChatSection
                  channelSaved={channelSaved || []}
                  user={i || []}
                  key={index}
                  urlParams1={urlParams1}
                  urlParams={urlParams}
                />
              ))
            : Object.keys(list).length !== 0 &&
              isClient &&
              list.map((item: string, index) => (
                <ChatSection
                  channelSaved={channelSaved || []}
                  user={item || ""}
                  key={index}
                  urlParams1={urlParams1}
                  urlParams={urlParams}
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
          placeholder={`${
            isClient && channelSaved?.channelName
              ? "Message #" + channelSaved?.channelName || ""
              : "Welcome to The Great Wall of Poof"
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
      <div ref={ref} className=""></div>
    </div>
  );
}

export default ThirdBar;
