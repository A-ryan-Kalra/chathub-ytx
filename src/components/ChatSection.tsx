import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Employee } from "../../Types";
import { database } from "../../firebaseConfig";
import { sessionState } from "../../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { time } from "console";
import moment from "moment";

function ChatSection({ channelSaved, user, urlParams1 }: Employee) {
  // console.log(user);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [session, setSession] = useRecoilState<Employee>(sessionState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsClient(true);
    setSession(session);
  }, [database]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  const time = moment().calendar();
  // console.log(user);

  return (
    <div
      className={` flex justify-start hover:bg-[#2A2D30] p-1 relative py-3 items-start `}
    >
      <div className="w-[55px]  rounded-full p-[6px] h ">
        <Image
          alt="user-img"
          src={urlParams1 !== "" ? user?.userImg : session?.user?.photoURL}
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
          <p className="text-[11.5px] mt-[1px] text-[#949BA4]">{time}</p>
        </div>
        <p
          className={`w-full  mr-auto ${
            loading
              ? "text-gray-500   transform transition-all ease-in w-full  flex-wrap break-words"
              : "text-[#D5D6DA] text-[15px]  flex-wrap break-words"
          } `}
        >
          {urlParams1 !== "" ? user?.text : user}
        </p>
      </div>
    </div>
  );
}

export default ChatSection;
