import { BG_COLOR } from "@/styles/colors";
import React from "react";

export default function BoardTab() {
  return (
    <nav className={`h-nav text-body02`}>
      <ul className={`h-full`}>
        <li className={`flex justify-center items-center w-[12%] h-full rounded-t-[20px] ${BG_COLOR.inverse}`}>쉼터</li>
      </ul>
    </nav>
  );
}
