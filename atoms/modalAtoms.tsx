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
export default function RecoilContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
