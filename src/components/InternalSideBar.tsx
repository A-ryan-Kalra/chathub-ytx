"use client";
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Icon } from "@iconify/react";
import { File } from "buffer";
import { Dialog, Transition } from "@headlessui/react";
import { FormatInputPathObject } from "path";
import { postState, sessionState } from "../../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
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
import { database, storage } from "../../firebaseConfig";
import { Employee, SessionProps } from "../../Types";
import { data } from "autoprefixer";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Type } from "typescript";
import NavbarServer from "@/components/NavbarServer";

function InternalSideBar() {
  const photoRef = useRef<HTMLInputElement | null>(null);
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [server, setServer] = useState<string>("");
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
    null
  );

  const [post, setPost] = useRecoilState<Employee>(postState);

  function closeModal(setIsOpen: (isOpen: boolean) => void): void {
    setIsOpen(false);
  }

  function openModal(setIsOpen: (isOpen: boolean) => void): void {
    setIsOpen(true);
  }
  const router = useRouter();
  router.push("/?counter=10", undefined, { shallow: true });
  function addImageToPost(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (e.target.files![0]) {
      reader.readAsDataURL(e.target.files![0]);
    }
    reader.onload = (item) => {
      setSelectedFile(item.target!.result);
    };
  }
  // console.log(selectedFile);
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

  console.log(post);

  useEffect(() => {
    const token: object = JSON.parse(sessionStorage.getItem("token") || "{}");
    let serPost: object = JSON.parse(sessionStorage.getItem("post") || "{}");
    setPost(serPost);
    if (Object.keys(session).length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-[#313338] fixed inset-0">
      <div className="min-h-screen  bg-[#1F1E22] flex-col flex gap-2 w-[75px] ">
        <div className=" cursor-pointer ml-0 flex mt-3 mx-auto  group">
          <div className="relative   h-full  w-1 flex  mr-2 ">
            <div className="bg-white h-full duration-200 transition-all transform ease-in origin-center scale-y-[16%] group-hover:scale-y-[40%] my-auto rounded-r-[100%] w-2"></div>
          </div>
          <div className="  hover:bg-[#5864F3] cursor-pointer hover:rounded-2xl  transition bg-[#303238]  mx-auto rounded-full flex items-center w-[50px] h-[50px] p-2">
            <img src="/discordnew.png" className="w-[45px] p-1" alt="" />
          </div>
        </div>

        <hr className="w-[50%]   mx-auto" />

        {Object.keys(post).length !== 0 &&
          post.map((item: any, index: number) => (
            <NavbarServer key={index} post={item} />
          ))}

        <div
          className="  cursor-pointer w-[50px] items-center rounded-full bg-[#313338] transform transition ease-out hover:bg-[#56A65A] flex hover:rounded-2xl mx-auto h-[50px] justify-center group"
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
                          <div className=" cursor-pointer flex  mx-auto h-[80px] w-[80px] group">
                            <img
                              src={selectedFile as string}
                              className="rounded-full object-cover transition"
                              alt=""
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
                        <button
                          type="button"
                          className="flex relative py-1 px-4 tracking-wider h-10 w-10 items-center  transition-all transform ease-out duration-[15000ms] rotate-[1440deg] font-semibold  cursor-none outline-none justify-center  rounded-full "
                        >
                          <button className="absolute inset-0 ease-in transform transition-all cursor-default outline-none rounded-full bg-[#5865F2] ">
                            ⏳
                          </button>
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
    </div>
  );
}

export default InternalSideBar;
