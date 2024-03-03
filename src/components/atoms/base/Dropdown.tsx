import { SetStateBoolean } from "@/types/type/utilityTypes";
import React from "react";

interface DropdownProps {
  setToggleDropdown: SetStateBoolean;
  children: React.ReactNode;
}

export function Dropdown({ setToggleDropdown, children }: DropdownProps) {
  return (
    <>
      <div className={`backdrop`} onClick={() => setToggleDropdown(false)} />
      <div className={`absolute top-5 -right-0 z-20 text-primary`}>
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
        className={`flex justify-center items-center border border-black w-[226px] h-[60px] ${first ? "rounded-t-[10px]" : ""} ${end ? "rounded-b-[10px]" : ""} bg-inverse ${
          textColor === "red" ? "text-red500" : ""
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
