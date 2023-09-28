import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Employee } from "../../Types";
import { database } from "../../firebaseConfig";
import { sessionState, setName1 } from "../../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { time } from "console";
import moment from "moment";
import { Icon } from "@iconify/react";
import { deleteDoc, doc } from "firebase/firestore";

function ChatSection({ channelSaved, user, urlParams1, urlParams }: Employee) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading1, setLoading1] = useState<boolean>(true);
  const [name, setName] = useRecoilState<string>(setName1);

  // console.log(user.uniqueKey);
  var date = moment();
  // console.log(date.dayOfYear());
  let now = new Date();
  let future = now.getHours() + 1;

  useEffect(() => {
    setIsClient(true);
    setSession(session);
  }, [database]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const [disappear, setDissappear] = useState<boolean>(true);
  const [disappear1, setDissappear1] = useState<boolean>(true);
  console.log(user);
  console.log(session.user.uid);

  useEffect(() => {
    if (urlParams1 === "") {
      const timer = setInterval(() => {
        setDissappear(false);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [user]);

  useEffect(() => {
    if (urlParams1 === "") {
      const timer = setInterval(() => {
        setDissappear1(false);
      }, 4600);
      return () => clearInterval(timer);
    }
  }, [user]);

  const time = moment().calendar();

  async function deleteChannel() {
    Object.keys(user).length !== 0 &&
      (await deleteDoc(
        doc(
          database,
          "Users",
          urlParams,
          "Channels",
          urlParams1,
          "Comments",
          user?.uid
        )
      ));
  }
  return (
    <div className="">
      {!disappear && disappear1 && (
        <div>
          <Icon
            // icon="game-icons:magic-gate"
            icon={"noto:magic-wand"}
            width={50}
            height={50}
            className="bg-cover bg-no-repeat pb-2 text-fuchsia-500"
          />
          {/* <Image
            src={"/poof1.png"}
            alt="logo"
            width={50}
            height={50}
            className="text-white rounded-full pb-2 object-cover"
          /> */}
        </div>
      )}
      {disappear && (
        <div
          className={` flex justify-between hover:bg-[#2A2D30] p-1 relative py-3 items-center `}
        >
          <div className="flex items-center justify-center">
            <div className="w-[55px]  rounded-full p-[6px] h ">
              <Image
                alt="user-img"
                src={
                  urlParams1 !== ""
                    ? user?.userImg || ""
                    : session?.user?.photoURL || ""
                }
                width={45}
                height={45}
                className="rounded-full"
              />
            </div>

            <div className="flex-col flex  mt-1 px-1 text-left item">
              <div className="flex items-center space-x-3">
                <p className="text-[#40dacb] hover:underline cursor-default">
                  {urlParams1 !== "" ? user?.name : session?.user?.displayName}
                </p>
                <p className="text-[11.5px] cursor-default mt-[1px] text-[#949BA4]">
                  {user?.posttime || ""}
                </p>
              </div>
              <p
                className={`w-full  mr-auto ${
                  loading
                    ? "text-gray-500   transform transition-all ease-in w-full  flex-wrap break-words"
                    : "text-[#D5D6DA] text-[15px]  flex-wrap break-words"
                } `}
              >
                {urlParams1 !== "" ? user?.text || "" : user}
              </p>
            </div>
          </div>
          <div className="flex items-center p-2 rounded-full hover:bg-[#4a2b2b] cursor-pointer">
            {session?.user?.uid === user?.uniqueKey && (
              <Icon
                onClick={deleteChannel}
                icon="bi:trash-fill"
                className={` 
            ${loading && "opacity-25"}
                text-red-600  inline-block
                 group-hover:inline-block     
              active:scale-75`}
                width={21}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatSection;
