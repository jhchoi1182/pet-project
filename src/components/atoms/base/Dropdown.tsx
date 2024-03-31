import { SetStateBoolean } from "@/types/type/utilityTypes";
import React, { createContext, useContext } from "react";

type VariantType = "primary" | "search";
interface DropdownProps {
  variant?: VariantType;
  topRight: string;
  setToggleDropdown: SetStateBoolean;
  children: React.ReactNode;
}

const DropdownContext = createContext<{ variant: VariantType }>({ variant: "primary" });

export function Dropdown({ variant = "primary", topRight, setToggleDropdown, children }: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ variant }}>
      <div className={`backdrop`} onClick={() => setToggleDropdown(false)} />
      <div className={`absolute ${topRight} z-20 text-primary`}>
        <ul>{children}</ul>
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownListProps extends React.HTMLAttributes<HTMLButtonElement> {
  textColor?: "primary" | "red";
  first?: boolean;
  end?: boolean;
  children: string;
}

Dropdown.li = function DropdownList({ textColor = "primary", first = false, end = false, children, ...props }: DropdownListProps) {
  const { variant } = useContext(DropdownContext);

  const size = {
    primary: `w-[226px] h-[60px]`,
    search: `w-[130px] h-[50px]`,
  };

  return (
    <li>
      <button
        className={`flex justify-center items-center border border-black ${size[variant]} ${first ? "rounded-t-[10px]" : ""} ${
          end ? "rounded-b-[10px]" : ""
        } bg-inverse ${textColor === "red" ? "text-red500" : ""}`}
        {...props}
      >
        {children}
      </button>
    </li>
  );
};
