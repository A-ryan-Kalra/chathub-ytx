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

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(database, "Users", urlParams, "Channels"),
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
            console.log("Not Existed");
            console.log(Object.keys(channelNameState).length);
          }
        }
      ),
    [database]
  );
  // console.log(post);
  console.log(channelNameState);

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
  return (
    <>
      {isClient && Object.keys(post).length !== 0 && url === post?.uid && (
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
          <div className=" min-h-screen px-2">
            <div className="flex flex-col overflow-y-auto gap-2">
              {Object.keys(channelNameState).length !== 0 &&
                channelNameState.map((channel: Employee, index: number) => (
                  <ChannelNameSection
                    key={index}
                    channel={channel}
                    id={channel.uid}
                    channelNameState={channelNameState}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SecondbarServer;
