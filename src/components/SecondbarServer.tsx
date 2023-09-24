"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import {
  channelName,
  sessionState,
  setParam,
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
import { database } from "../../firebaseConfig";
import ChannelNameSection from "./ChannelNameSection";
import { data } from "autoprefixer";
import Image from "next/image";

function SecondbarServer({
  post,
  id,
  serverName,
  urlParams,
  urlParams1,
}: {
  post: Employee;
  id: Employee;
  serverName: string;
  urlParams: string;
  urlParams1: string;
}) {
  // console.log(post);
  const [isClient, setIsClient] = useState<boolean>(false);
  // const [urlParams, setUrlParams] = useRecoilState<string>(setParam);
  const [url, setUrl] = useRecoilState<string>(setParamsUrl);
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [channelNameState, setChannelNameState] =
    useRecoilState<Employee[]>(channelName);

  // console.log(post.uid);
  // console.log(paramsId);
  // console.log(url);

  useEffect(() => {
    const paramsId: string = urlParams;
    setUrl(paramsId);

    setIsClient(true);
  }, []);

  // console.log(urlParams.length);

  // if(urlParams.length)

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(database, "Users", urlParams || "asdsa", "Channels"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          if (!snapshot.empty) {
            // console.log("asdsads");
            let events: any = [];
            snapshot.forEach((doc) => {
              events.push({ ...doc.data() });
              // console.log(doc.data());
            });
            setChannelNameState(events);
            // sessionStorage.setItem("post", JSON.stringify(events));
            console.log("Existed");
          } else {
            setChannelNameState([]);
            // console.log(channelNameState);
            // console.log(Object.keys(channelNameState).length);
          }
        }
      ),
    [urlParams, database]
  );
  // console.log(post);
  // console.log(channelNameState);
  // console.log(urlParams);

  async function addChannelName() {
    const channelName = prompt("Enter a name");
    // console.log(channelName);
    if (channelName) {
      try {
        const docRef = await addDoc(
          collection(database, "Users", post?.uid, "Channels"),
          {
            channelName: channelName,
            serverName: post?.serverName,
            timestamp: serverTimestamp(),
            checkStatus: false,
          }
        );
        await updateDoc(
          doc(database, "Users", post?.uid, "Channels", docRef?.id),
          {
            uid: docRef.id,
          }
        );
        // console.log(docRef);
      } catch (e) {
        console.error("Error adding document", e);
      }
    }
  }
  // console.log(session);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    var name = session?.user?.displayName?.split(" ")[0];
    var last = session?.user?.createdAt;
    last?.slice(0, 4);
    setName(name);
  }, []);

  // console.log(session.user.displayName.split(" ").join(session.user.));
  return (
    <>
      {isClient &&
        Object.keys(post).length !== 0 &&
        urlParams === post?.uid && (
          <div className="min-h-screen relative flex-col flex justify-between">
            <div className="  flex-1  max-h-[95vh]">
              <div className="flex justify-between hover:bg-[#3a3c42] cursor-pointer p-3 border-b-2 border-black">
                <h1 className="w-full text-white text-[14px] font-semibold tracking-wide">
                  {post.serverName}
                </h1>
                <Icon
                  icon="mdi:chevron-down"
                  width={25}
                  className="text-white"
                />
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
                        channel={channel}
                        id={channel.uid}
                        channelNameState={channelNameState}
                        urlParams1={urlParams1}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className=" relative w-full z-10 bottom-0 h-[54px] flex justify-between items-center  bg-[#222429]">
              <div className=" w-full hover:bg-[#43454b] items-center p-1 flex h-fit rounded-lg ">
                <div className="w-[40px] h-[40px] cursor-pointer relative rounded-full">
                  <Image
                    src={session?.user?.photoURL}
                    fill
                    alt="logo"
                    className="rounded-full object-contain"
                  />
                </div>
                <div className="cursor-pointer ml-1 flex flex-col text-white">
                  <p className="text-sm">
                    {session.user.displayName.split(" ")[0]}
                  </p>
                  <p className="text-[#868E97] text-xs">{name.toLowerCase()}</p>
                </div>
              </div>
              <div className=" h-full w-full p-1 flex items-center justify-between">
                <button
                  type="button"
                  className="p-2 hover:bg-[#43454b] rounded-lg"
                >
                  <Icon
                    icon="mdi:microphone"
                    className="text-[#B5BBC0] "
                    width={20}
                  />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-[#43454b] rounded-lg"
                >
                  <Icon
                    icon="ri:headphone-fill"
                    className="text-[#B5BBC0]"
                    width={20}
                  />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-[#43454b] rounded-lg"
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
    </>
  );
}

export default SecondbarServer;
