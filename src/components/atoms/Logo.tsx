import { TEXT_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import React from "react";

export default function Logo() {
  return (
    <h1 className={`${FONT_VARIANTS.logo} ${TEXT_COLOR.yellow} select-none`}>
      StudySync
    </h1>
  );
}
