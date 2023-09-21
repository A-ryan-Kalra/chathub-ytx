import { type } from "os";
import { MouseEventHandler } from "react";
import { Type } from "typescript";

interface ArrProps {
  id: number;
  title: string;
}
export type ArrProps1 = { id: number; title: string; checked: boolean };

export interface CheckedArrayProps {
  id: number;
  title: string;
  checked: boolean;
}
export interface SideBarProps {
  item: ArrProps;

  number?: number;
  checked: boolean;
  isSelected?: boolean;
  setIsSelected: MouseEventHandler<HTMLDivElement>;
}

export type SessionProps = {
  operationType: string;
  providerId: string;
  user: object;
  _tokenResponse: object;
};

export type Employee = {
  [key: string]: any; // 👈️ variable key
};

export interface ArrayType {}
