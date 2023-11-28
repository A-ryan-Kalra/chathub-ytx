"use client";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Dialog, Transition } from "@headlessui/react";
import SideBar from "./SideBar";
import { ArrProps1, CheckedArrayProps, Employee } from "../../Types";
import { app, database } from "../../firebaseConfig";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { postState, sessionState } from "../../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
const Nav = () => {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  function closeModal(setIsOpen: (isOpen: boolean) => void) {
    setIsOpen(false);
  }
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [session, setSession] = useRecoilState<Employee>(sessionState);

  async function singInWithGoogle() {
    await signInWithPopup(auth, googleProvider)
      .then((details) => {
        setSession(details);

        sessionStorage.setItem("token", JSON.stringify(details));
        router.push("/channels/@me");
      })
      .catch((err) => alert(err));
  }

  function openModal(setIsOpen: (isOpen: boolean) => void) {
    setIsOpen(true);
  }
  const arr: ArrProps1[] = [
    {
      id: 0,
      title: "Home",
      checked: true,
    },
    {
      id: 1,
      title: "Download",
      checked: false,
    },
    {
      id: 2,
      title: "Nitro",
      checked: false,
    },
    {
      id: 3,
      title: "Discover",
      checked: false,
    },
    {
      id: 4,
      title: "Safety",
      checked: false,
    },
    {
      id: 5,
      title: "Support",
      checked: false,
    },
    {
      id: 6,
      title: "Blog",
      checked: false,
    },
    {
      id: 7,
      title: "Careers",
      checked: false,
    },
  ];

  const [newArr, setNewArr] = useState<CheckedArrayProps[]>(arr);

  function clicked(
    setIsSelected: (isSelected: boolean) => void,
    index: number
  ): void {
    const Arr1: ArrProps1[] = newArr.map((item) => {
      if (item.id === index) {
        return { ...item, checked: !item.checked };
      } else {
        return { ...item, checked: false };
      }
    });
    setNewArr(Arr1);
  }

  return (
    <nav className="w-full relative md:max-lg:px-9 px-4 bg-[#465EEC]">
      <div className="w-full p-1 max-w-[1100px] mx-auto h-20 px-3 flex justify-between items-center">
        <div
          className="relative w-[190px] h-[190px] focus-visible:ring-[3px] focus-visible:ring-[#41B0F5] rounded-full  outline-none "
          tabIndex={0}
        >
          <Image
            src={"/ChatHub1new.png"}
            className="rounded-full object-contain outline-none border-none"
            // width={60}
            // height={60}
            fill
            alt="logo"
          />
        </div>
        <ul className="hidden lg:flex items-center text-white font-semibold gap-10 text-sm">
          <Link href={"/"}>
            <li className="hover:underline">Download</li>
          </Link>
          <Link href={"/"}>
            <li className="hover:underline">Nitro</li>
          </Link>
          <Link href={"/"}>
            <li className="hover:underline">Discover</li>
          </Link>
          <Link href={"/"}>
            <li className="hover:underline">Safety</li>
          </Link>
          <Link href={"/"}>
            <li className="hover:underline">Support</li>
          </Link>
          <Link href={"/"}>
            <li className="hover:underline">Blog</li>
          </Link>
          <Link href={"/"}>
            <li className="hover:underline">Carrers</li>
          </Link>
        </ul>
        <div className="items-center flex  ">
          {Object.keys(session).length != 0 ? (
            <Link href={"/channels/@me"}>
              <button
                type="button"
                className="bg-white px-3 py-2 hover:drop-shadow-xl shadow-sm  hover:text-[#5865F2]  rounded-full text-sm"
              >
                Open Discord
              </button>
            </Link>
          ) : (
            <button
              type="button"
              className="bg-white px-3 py-2 hover:drop-shadow-xl shadow-sm  hover:text-[#5865F2]  rounded-full text-sm"
              onClick={singInWithGoogle}
            >
              Login
            </button>
          )}

          <button
            type="button"
            className="lg:hidden first-letter: text-white outline-none px-3 py-2 "
            onClick={() => openModal(setIsOpen)}
          >
            <Icon icon="fe:bar" width={40} height={40} />
          </button>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => closeModal(setIsOpen)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-400"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 duration-400"
            >
              <div className="fixed inset-0 bg-black   bg-opacity-30" />
            </Transition.Child>

            <div className="fixed overflow-hidden inset-0 overflow-y-auto">
              <div className="flex min-h-full items-start scale-x- justify-end text-center ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200 scale-x-0 translate-x-[400%]"
                  enterFrom="opacity-0 "
                  enterTo="opacity-100 duration-100 "
                  leave="ease-in duration-300   translate-x-[400%]"
                  leaveFrom="opacity-300 scale-x-100 "
                  leaveTo="opacity-0 scale-95 scale-x-0 "
                >
                  <Dialog.Panel className="w-full min-h-screen max-w-[330px] transform overflow-hidden rounded-l-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="font-medium  max-w-[230px] h-[50px]  border-b w-full ">
                      <h1 className="text-2xl tracking-wider font-bold text-left">
                        chatHub
                      </h1>
                      <div className="absolute active:scale-95 hover:bg-slate-400/20 flex items-center rounded-full top-[23px] right-9">
                        <button
                          type="button"
                          className="outline-none"
                          onClick={() => closeModal(setIsOpen)}
                        >
                          <Icon icon="basil:cross-outline" width={35} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 py-2">
                      {isOpen &&
                        newArr.map((item, index) => (
                          <SideBar
                            setIsSelected={() => clicked(setIsSelected, index)}
                            key={index}
                            item={item}
                            checked={item.checked}
                          />
                        ))}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </nav>
  );
};

export default Nav;
