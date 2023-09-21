import React, { useEffect, useState } from "react";
import { Employee } from "../../Types";

function NavbarServer({ post }: Employee) {
  // console.log(post);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && Object.keys(post).length !== 0 && (
        <div className=" w-full cursor-pointer flex  mx-auto h-[50px] group">
          <div className="relative  h-full  w-1 flex  mr-2 ">
            <div className="bg-white h-full duration-200 transition-all transform ease-in origin-center scale-y-[16%] group-hover:scale-y-[40%] my-auto rounded-r-[100%] w-2"></div>
          </div>
          <img
            src={post?.serverImage}
            className="rounded-full  hover:rounded-2xl w-[50px] h-[50px] object-cover transition"
            alt=""
          />
        </div>
      )}
    </>
  );
}

export default NavbarServer;
