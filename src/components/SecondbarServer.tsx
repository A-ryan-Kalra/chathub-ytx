import React, { ReactNode } from "react";
import { useRecoilState } from "recoil";
import { Employee } from "../../Types";
import { setParam } from "../../atoms/modalAtoms";

function SecondbarServer(serverName: { serverName: string }) {
  //   console.log(serverName);
  const [urlParams, setUrlParams] = useRecoilState<Employee>(setParam);
  const paramsId: string = urlParams.id[0];
  //   console.log(paramsId);
  return <div>{serverName.serverName}</div>;
}

export default SecondbarServer;
