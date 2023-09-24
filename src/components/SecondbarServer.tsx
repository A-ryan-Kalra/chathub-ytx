"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { Employee } from "../../Types";
import {
  channelName,
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

  // useEffect(
  //   () =>
  //     onAuthStateChanged(auth, (userInfo) => {
  //       console.log("userInfo");
  //       // console.log(userInfo);
  //     }),
  //   []
  // );
  // console.log(urlParams.length);

  // if(urlParams.length)
  const [urlParams1, setUrlParams1] = useRecoilState<string>(setParam1 || "");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(database, "Users", urlParams || "asdad", "Channels"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          if (!snapshot.empty) {
            // console.log("asdsads");
            let events: any = [];
            snapshot.forEach((doc) => {
              events.push({ ...doc.data() });
              // console.log(doc.data());
              // console.log("offooo");
            });
            setChannelNameState(events);
            // sessionStorage.setItem("post", JSON.stringify(events));
            // console.log("Existed");
          } else {
            setChannelNameState([]);
            setUrlParams1("");
            // console.log("clean up");
            // setParamsUrl('')
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
  const [name1, setName1] = useState<string>("");

  // useEffect(() => {
  //   var name: string = session?.user?.displayName?.split(" ")[0];
  //   setName1(name);
  //   var last: string = session?.user?.createdAt.slice(0, 4);

  //   setName(name + last);
  // }, []);

  // const [user, setUser] = useRecoilState(
  //   atom({
  //     key: "userState",
  //     default: null,
  //   })
  // );

  // useEffect(() => {
  //   onAuthStateChanged(getAuth(app), (user) => {
  //     const userCopy = JSON.parse(JSON.stringify(user));
  //     console.log(userCopy);
  //     console.log("check above");
  //     setUser(userCopy);
  //   });
  // }, [setUser]);
  // console.log(session.user.displayName.split(" ").join(session.user.));
  const router = useRouter();
  return (
    <>
      {isClient &&
        Object.keys(post).length !== 0 &&
        urlParams === post?.uid && (
          <div className="flex-grow  ">
            <div className=" relative flex-col flex flex-grow ">
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
                        urlParams12={urlParams12}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default SecondbarServer;
