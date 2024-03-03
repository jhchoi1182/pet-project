import { ubuntu } from "@/app/layout";
import { TEXT_COLOR } from "@/styles/colors";
import React from "react";

export default function Logo() {
  return <h1 className={`text-[42px] ${ubuntu.className} ${TEXT_COLOR.yellow} select-none`}>StudySync</h1>;
}
