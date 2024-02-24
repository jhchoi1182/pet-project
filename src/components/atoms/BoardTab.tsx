import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import React from "react";

export default function BoardTab() {
  return (
    <nav className={`h-nav ${FONT_VARIANTS.body02}`}>
      <ul className={`h-full`}>
        <li className={`flex justify-center items-center w-[12%] h-full rounded-t-[20px] ${BG_COLOR.inverse}`}>쉼터</li>
      </ul>
    </nav>
  );
}
