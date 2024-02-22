import { BG_COLOR, TEXT_COLOR } from "@/styles/colors";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import React from "react";

interface DropdownProps {
  setToggleModal: SetStateBoolean;
  children: React.ReactNode;
}

export function Dropdown({ setToggleModal, children }: DropdownProps) {
  return (
    <>
      <div className={`backdrop`} onClick={() => setToggleModal(false)} />
      <div className={`absolute top-5 -right-0 z-20 ${TEXT_COLOR.primary}`}>
        <ul>{children}</ul>
      </div>
    </>
  );
}

interface DropdownListProps {
  textColor?: "primary" | "red";
  first?: boolean;
  end?: boolean;
  onClick: () => void;
  children: string;
}

Dropdown.li = function DropdownList({ textColor = "primary", first = false, end = false, onClick, children }: DropdownListProps) {
  return (
    <li>
      <button
        className={`flex justify-center items-center border border-black w-[226px] h-[60px] ${first ? "rounded-t-[10px]" : ""} ${end ? "rounded-b-[10px]" : ""} ${BG_COLOR.inverse} ${
          textColor === "red" ? TEXT_COLOR.red500 : ""
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
