import { useRouter } from "next/navigation";
import React from "react";

function Channels() {
  const router = useRouter();
  return <div>{router.push("/channels/@me")!}</div>;
}

export default Channels;
