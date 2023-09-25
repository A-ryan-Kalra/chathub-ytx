import Image from "next/image";
import React from "react";
import { Employee } from "../../Types";

function ChatSection({ channelSaved }: Employee) {
  //   console.log(channelSaved);
  return (
    <div className=" flex items-center ">
      <div className="rounded-full p-2 h ">
        <img
          alt="user-img"
          src={
            "https://cdn.discordapp.com/avatars/1137696701201793034/8637e8c36756e67ba8361edab5c32e49.webp?size=100"
          }
          width={45}
          height={45}
          className="rounded-full"
        />
      </div>
      <p className="w-full text-white p-2">
        asdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
      </p>
    </div>
  );
}

export default ChatSection;
