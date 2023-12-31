"use client";
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  LegacyRef,
  MouseEventHandler,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import { File } from "buffer";
import { Dialog, Transition } from "@headlessui/react";
import { FormatInputPathObject } from "path";
import {
  channelName,
  postState,
  screenState,
  serverName,
  sessionState,
  setParam,
  setParam1,
} from "../../../../atoms/modalAtoms";
import { atom, useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next";
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
import { auth, database, storage } from "../../../../firebaseConfig";
import { Employee, SessionProps } from "../../../../Types";
import { data } from "autoprefixer";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Type } from "typescript";
import NavbarServer from "@/components/NavbarServer";
import SecondbarServer from "@/components/SecondbarServer";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import ThirdBar from "@/components/ThirdBar";
import Me from "@/components/Me";

function page({ params }: { params: Employee }) {
  // console.log(JSON.stringify(params.id));
  const [urlParams, setUrlParams] = useRecoilState<string>(setParam || "");
  const [urlParams1, setUrlParams1] = useRecoilState<string>(setParam1 || "");
  // console.log(params.id[0]);
  // const url = window.location.pathname.concat("aswa");
  // const url = window.location.pathname;

  // console.log(url);

  // const searchParams = new URLSearchParams(window.location.search);
  // searchParams.set("model", "model  3");
  // console.log(searchParams.toString());
  const [serverNames, setServerNames] = useRecoilState<string>(serverName);

  const photoRef = useRef<HTMLInputElement | null>(null);
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [server, setServer] = useState<string>("");
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    null
  );

  const [post, setPost] = useRecoilState<Employee>(postState || []);
  const [screen, setScreen] = useRecoilState<boolean>(screenState);

  function closeModal(setIsOpen: (isOpen: boolean) => void): void {
    setIsOpen(false);
  }

  function openModal(setIsOpen: (isOpen: boolean) => void): void {
    setIsOpen(true);
  }
  const router = useRouter();

  function addImageToPost(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (e.target.files![0]) {
      reader.readAsDataURL(e.target.files![0]);
    }
    reader.onload = (item) => {
      setSelectedFile(item.target!.result);
    };
  }

  const [loading, setLoading] = useState<boolean>(false);

  const sendPost = async () => {
    setLoading(true);
    const docRef: Employee = await addDoc(collection(database, "Users"), {
      id: session?.user?.uid,
      username: session?.user?.displayName,
      email: session?.user?.email,
      userimage: session?.user?.photoURL,
      serverName: server,
      timestamp: serverTimestamp(),
      uniqueKey: session?.user?.uid,
    });

    setServer("");

    await updateDoc(doc(database, "Users", docRef.id), {
      uid: docRef.id,
    });

    const imageRef = ref(storage, `server/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile as string, "data_url").then(
        async (response) => {
          const downloadUrl = await getDownloadURL(imageRef);
          await updateDoc(doc(database, "Users", docRef.id), {
            serverImage: downloadUrl,
          });
        }
      );
    }

    setSelectedFile(null);
    closeModal(setIsOpen);
  };

  useEffect(() => {
    const token: object = JSON.parse(sessionStorage.getItem("token") || "{}");
    let serPost: object = JSON.parse(sessionStorage.getItem("post") || "{}");

    // setPost(serPost || {});

    setSession(token);
    if (Object.keys(token).length === 0) {
      router.push("/");
    }
    if (urlParams === "%40me") {
      setTrue(true);
    } else {
      setTrue(false);
    }
  }, [urlParams]);

  useEffect(() => {
    setUrlParams(params?.id[0] || "");
    setUrlParams1(params?.id[1] || "");
  });
  // console.log(urlParams1);
  const [channelNameState, setChannelNameState] =
    useRecoilState<Employee[]>(channelName);

  useEffect(() => {
    onSnapshot(
      query(collection(database, "Users"), orderBy("timestamp", "desc")),
      (snapshot) => {
        let events: any = [];
        snapshot.forEach((doc) => {
          events.push({ ...doc.data() });
        });
        setPost(events);
        sessionStorage.setItem("post", JSON.stringify(events));
      }
    );
  }, [database]);
  const [isTrue, setTrue] = useState<boolean>(false);
  return (
    <div className="min-h-screen flex fixed inset-0">
      <div
        className={`  ${
          screen
            ? "min-h-screen  bg-[#1F1E22] flex-col flex gap-2 max-w-[80px] min-w-[80px] overflow-y-auto"
            : "hidden lg:min-h-screen  lg:bg-[#1F1E22] lg:flex-col lg:flex lg:gap-2 lg:max-w-[80px] lg:min-w-[80px] lg:overflow-y-auto"
        }  pb-6`}
      >
        <Link
          href={"/channels/@me"}
          className=" cursor-pointer ml-0 flex mt-3 mx-auto  group"
        >
          <div className="relative   h-full  w-1 flex  mr-[10px] ">
            <div
              className={`bg-white h-full duration-200 transition-all transform ease-in origin-center scale-y-[16%] ${
                isTrue ? "scale-y-[80%]" : "group-hover:scale-y-[40%]"
              }  my-auto rounded-r-[100%] w-2`}
            ></div>
          </div>
          <div
            className={` ${
              isTrue && "bg-[#5864F3]"
            } hover:bg-[#5864F3]  active:scale-x-90 cursor-pointer hover:rounded-2xl  transition bg-[#303238]  mx-auto rounded-full flex items-center w-[50px] h-[50px] p-2`}
          >
            <img src="/discordnew.png" className="w-[45px] p-1" alt="" />
          </div>
        </Link>
        <hr className="min-w-[50%]   mx-auto" />

        {Object.keys(post).length !== 0 &&
          post?.map(
            (item: any, index: number) => (
              <NavbarServer
                key={index}
                post={item || []}
                urlParams={urlParams}
                id={item?.uid ? item?.uid : ""}
              />
            )
            // console.log(item)
          )}

        <div
          className="relative -left-[2px] cursor-pointer w-[50px] items-center rounded-full bg-[#313338] transform transition ease-out hover:bg-[#56A65A] flex hover:rounded-2xl mx-auto h-[50px] justify-center group"
          onClick={() => {
            {
              setLoading(false);

              setIsOpen(!isOpen);
            }
          }}
        >
          <Icon
            icon="basil:plus-solid"
            className="rounded-full  text-[#56A65A] group-hover:text-white transition"
            width={35}
          />
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className={"relative z-10"}
            onClose={() => closeModal(setIsOpen)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/70"></div>
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-[10%]"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-[0%]"
                >
                  <Dialog.Panel
                    className={
                      "w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left  shadow-xl transition-all  flex items-center justify-between flex-col"
                    }
                  >
                    <Dialog.Title
                      as="h3"
                      className={
                        "text-lg font-medium text-center  leading-6 text-gray-900"
                      }
                    >
                      Create a server
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm font text-center ">
                        Your server is where you and your friends hang out. Make
                        yours and start talking.
                      </p>
                    </div>
                    <div className="mt-2 border-2 shadow-md  border-dotted border-gray-600 p-2 rounded-xl flex h-fit flex-col justify-between items-center">
                      <p className="text-sm font-light text-center text-gray-800">
                        Give your new server a personality with a name and an
                        icon. You can always change it later.
                      </p>

                      <div className="w-full flex justify-center items-center p-2">
                        {selectedFile ? (
                          <div
                            className=" cursor-pointer flex  mx-auto h-[80px] w-[80px] group"
                            onClick={() => {
                              // photoRef.current?.textContent

                              photoRef.current?.click();
                              // setSelectedFile(null);
                            }}
                          >
                            <img
                              src={selectedFile as string}
                              className="rounded-full object-cover transition"
                              alt=""
                            />
                            <input
                              ref={photoRef}
                              hidden
                              type="file"
                              value={""}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                addImageToPost(e)
                              }
                              name=""
                              id=""
                            />
                          </div>
                        ) : (
                          <div
                            className="relative h-20 border-[3px] border-[#4F5059] border-dashed flex justify-center items-center w-20 cursor-pointer rounded-full "
                            onClick={() => photoRef.current?.click()}
                          >
                            <Icon
                              icon="bi:plus"
                              width={20}
                              className="absolute font-bold bg-[#5865F2] top-0 text-white rounded-full right-0"
                            />
                            <Icon
                              icon="bi:camera-fill"
                              className="text-[#4F5059]"
                              width={35}
                            />
                            <input
                              ref={photoRef}
                              hidden
                              type="file"
                              value={""}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                addImageToPost(e)
                              }
                              name=""
                              id=""
                            />
                          </div>
                        )}
                      </div>
                      <div className="pt-2 w-full flex flex-col">
                        <h1 className="text-[11px] font-semibold -tracking-wide pb-1 text-[#4F5059]">
                          SERVER NAME
                        </h1>
                        <input
                          type="text"
                          className="outline-none bg-[#EAEBEA] text-[12px] h-7 rounded-sm p-2 text-[#56585C] text-sm"
                          name=""
                          value={server}
                          onChange={(e) => setServer(e.target.value)}
                          id=""
                        />
                      </div>
                    </div>
                    <div className="flex relative justify-between items-center bottom-1 top-4 w-full ">
                      <button
                        type="button"
                        className="text-[15px] p-1"
                        onClick={() => closeModal(setIsOpen)}
                      >
                        Back
                      </button>

                      {loading ? (
                        <button className="flex relative  py-1 px-4 tracking-wider h-10 w-10 items-center  transition-all transform ease-out duration-[15000ms] rotate-[1440deg] font-semibold  cursor-none outline-none justify-center  rounded-full ">
                          <div className="absolute inset-0  ease-in flex items-center justify-center transform transition-all cursor-default outline-none rounded-full bg-[#5865F2] ">
                            ⏳
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex py-1 px-4 tracking-wider h-10 items-center text-[12px] duration-150 transition-all transform ease-out hover:bg-[#585e9e] font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed bg-[#5865F2] outline-none justify-center text-white rounded-md"
                          onClick={sendPost}
                          disabled={!server.trim() as unknown as boolean}
                        >
                          Create
                        </button>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      {params !== undefined && params?.id[0] !== "%40me" && (
        <div
          className={`${
            screen
              ? "flex flex-col flex-grow bg-[#2A2D30] lg:max-w-[240px] min-w-[240px]"
              : "hidden lg:flex lg:flex-col lg:flex-grow lg:bg-[#2A2D30] lg:max-w-[240px] lg:min-w-[240px]"
          }`}
        >
          {Object.keys(post).length !== 0 &&
            post.map((item: any, index: number) => (
              <SecondbarServer
                serverName={serverNames}
                post={item}
                id={item?.uid}
                key={index}
                urlParams={urlParams}
                urlParams12={urlParams1}
                // setUrlParams1={setUrlParams1}
              />
            ))}
        </div>
      )}
      {params !== undefined && params?.id[0] === "%40me" ? (
        <Me urlParams={urlParams} />
      ) : (
        <ThirdBar
          urlParams1={urlParams1}
          post={post}
          params={params}
          urlParams={urlParams}
        />
      )}
    </div>
  );
}

export default page;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const url = context;
//   return { props: { url: url } };
// };
