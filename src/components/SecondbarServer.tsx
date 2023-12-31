"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { Employee } from "../../Types";
import {
  channelName,
  screenState,
  sessionState,
  setParam,
  setParam1,
  setParamsUrl,
} from "../../atoms/modalAtoms";
import { Icon } from "@iconify/react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { app, auth, database } from "../../firebaseConfig";
import ChannelNameSection from "./ChannelNameSection";
import { data } from "autoprefixer";
import Image from "next/image";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function SecondbarServer({
  post,
  id,
  serverName,
  urlParams,
  urlParams12,
}: {
  post: Employee;
  id: Employee;
  serverName: string;
  urlParams: string;
  urlParams12: string;
}) {
  const [urlParams01, setUrlParams] = useRecoilState<string>(setParam);
  const [url, setUrl] = useRecoilState<string>(setParamsUrl || "");
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [channelNameState, setChannelNameState] = useRecoilState<Employee[]>(
    channelName || []
  );
  const [screen, setScreen] = useRecoilState<boolean>(screenState);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    const paramsId: string = urlParams;
    setUrl(paramsId);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // useEffect(
  //   () =>
  //     onAuthStateChanged(auth, (userInfo) => {
  //       console.log("userInfo");
  //       // console.log(userInfo);
  //     }),
  //   []
  // );
  // console.log(channelNameState);

  const [urlParams1, setUrlParams1] = useRecoilState<string>(setParam1 || "");
  useEffect(() => {
    if (urlParams !== "") {
      onSnapshot(
        query(
          collection(database, "Users", urlParams, "Channels"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          if (!snapshot.empty) {
            let events: any = [];
            snapshot.forEach((doc) => {
              events.push({ ...doc.data() });
              // console.log("hello");
            });
            setChannelNameState(events);
          } else {
            setChannelNameState([]);
            setUrlParams1("");
          }
        }
      );
      setUrlParams1("");
    } else {
      setChannelNameState([]);
      setUrlParams1("");
      setUrlParams("");
    }
  }, [urlParams, database]);

  async function addChannelName() {
    const channelName = prompt("Give your channel a name");
    // console.log("asdas");
    if (channelName) {
      try {
        const docRef = await addDoc(
          collection(database, "Users", post?.uid, "Channels"),
          {
            channelName: channelName,
            serverName: post?.serverName,
            timestamp: serverTimestamp(),
            uniqueKey: post?.uniqueKey,
          }
        );
        await updateDoc(
          doc(database, "Users", post?.uid, "Channels", docRef?.id),
          {
            uid: docRef.id,
          }
        );
      } catch (e) {
        console.error("Error adding document", e);
      }
    }
  }

  const [name, setName] = useState<string>("");
  const [name1, setName1] = useState<string>("");

  useEffect(() => {
    var name: string = session?.user?.displayName?.split(" ")[0];
    setName1(name);
    var last: string = session?.user?.createdAt?.slice(0, 4);

    setName(name + last);
  }, []);

  const router = useRouter();
  return (
    <div className="">
      {isClient &&
        Object.keys(post).length !== 0 &&
        urlParams === post?.uid && (
          <div className="">
            <div className="   flex-col flex flex-grow ">
              <div
                className="flex justify-between hover:bg-[#3a3c42] cursor-pointer p-3 border-b border-black"
                onClick={() => {
                  setScreen(false);
                }}
              >
                <h1 className="w-full text-white text-[14px] font-semibold tracking-wide">
                  {post?.serverName || ""}
                </h1>
                {urlParams1 ? (
                  <Icon
                    icon="mdi:chevron-down"
                    width={25}
                    className="text-white"
                  />
                ) : (
                  <div className="md:px-1 px-2 flex items-center justify-center rounded-full bg-gradient-to-br from-[#a75bc3] to-[#366bb0] bg-white">
                    <p className="md:text-[12px] lg:hidden text-white flex items-center">
                      PoofBar
                    </p>
                    <Icon
                      icon="mdi:chevron-down"
                      width={20}
                      className="text-white"
                    />
                  </div>
                )}
              </div>
              <span className="flex items-center justify-between cursor-pointer  p-1 py-3">
                <span className="flex items-center  group ">
                  <Icon
                    icon="mdi:chevron-down"
                    width={14}
                    className="group-hover:text-white text-[#878D94] font-bold"
                  />
                  <h2 className="group-hover:text-white text-[#878D94] text-xs font-bold">
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
              <div className=" z-0 px-2  ">
                <div className="flex   overflow-y-auto max-h-[80vh]    flex-col pb-10 gap-2">
                  {Object.keys(channelNameState).length !== 0 &&
                    channelNameState.map((channel: Employee, index: number) => (
                      <ChannelNameSection
                        key={index}
                        channel={channel || []}
                        id={channel.uid || ""}
                        channelNameState={channelNameState || []}
                        urlParams12={urlParams1 || ""}
                      />
                    ))}
                </div>
              </div>
            </div>

            <div
              className={`lg:w-[240px] w-full  z-10 fixed bottom-0 h-[54px] flex justify-start lg:justify-between items-center p-1 bg-[#222429]`}
            >
              <div className=" lg:w-full hover:bg-[#43454b] items-center p-1 flex h-fit rounded-lg ">
                <div
                  className="w-[40px] flex-wrap h-[40px] cursor-pointer relative rounded-full"
                  onClick={() => {
                    // sessionStorage.clear();
                    sessionStorage?.clear();
                    router?.push("/");
                    // signOut(auth);
                    // console.log(res);
                    //  signOut(auth)
                    //  .then(() => {
                    //     console.log("signOut");

                    //   })
                    //   .catch((e) => {
                    //     console.error(e);
                    //   });
                    // router.refresh;
                  }}
                >
                  <Image
                    src={(isClient && session?.user?.photoURL) || ""}
                    fill
                    alt="logo"
                    className="rounded-full object-contain"
                  />
                </div>
                <div className="cursor-pointer ml-1 flex flex-col text-white">
                  <p className="text-[13px] font-semibold break-words">
                    {name1}
                  </p>
                  <p className="text-[#868E97] text-[11px]">{name}</p>
                </div>
              </div>
              <div className=" h-full lg:w-full  flex items-center justify-between">
                <button
                  type="button"
                  className="p-[6px] hover:bg-[#43454b] rounded-lg"
                >
                  <Icon
                    icon="mdi:microphone"
                    className="text-[#B5BBC0] "
                    width={20}
                  />
                </button>
                <button
                  type="button"
                  className="p-[6px] hover:bg-[#43454b] rounded-lg"
                >
                  <Icon
                    icon="ri:headphone-fill"
                    className="text-[#B5BBC0]"
                    width={20}
                  />
                </button>
                <button
                  type="button"
                  className="p-[6px] hover:bg-[#43454b] rounded-lg"
                >
                  <Icon
                    icon="icon-park-solid:setting"
                    className="text-[#B5BBC0]"
                    width={20}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default SecondbarServer;
