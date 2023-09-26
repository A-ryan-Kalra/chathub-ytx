import Image from "next/image";
import React from "react";
import { Employee } from "../../Types";

function ChatSection({ channelSaved, user }: Employee) {
  console.log(user);
  return (
    <div className=" flex items-center ">
      <div className="w-[5s5px]  rounded-full p-2 h ">
        <Image
          alt="user-img"
          src={user?.userImg}
          width={45}
          height={45}
          className="rounded-full"
        />
      </div>
      <p className="w-full text-white p-2 flex-wrap break-words">
        {user?.text}
      </p>
    </div>
  );
}

export default ChatSection;
