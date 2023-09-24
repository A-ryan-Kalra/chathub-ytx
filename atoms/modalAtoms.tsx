"use client";
import { RecoilRoot, atom } from "recoil";
import { ReactNode } from "react";

export const sessionState = atom({
  key: "sessionState",
  default: {},
});

export const postState = atom({
  key: "postState",
  default: {},
});
export const channelName = atom({
  key: "channelName",
  default: [{}],
});
export const serverName = atom({
  key: "serverName",
  default: "",
});
export const setParam = atom({
  key: "setParam",
  default: "",
});
export const setParam1 = atom({
  key: "setParam1",
  default: "",
});

export const setParamsUrl = atom({
  key: "setParamsUrl",
  default: "",
});

export default function RecoilContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
