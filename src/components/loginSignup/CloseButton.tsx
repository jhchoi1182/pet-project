import React from "react";
import Close from "../atoms/icons/Close";
import { useSetRecoilState } from "recoil";
import { modalAtom } from "@/libs/atom";

export default function CloseButton() {
  const setActiveLoginModal = useSetRecoilState(modalAtom);

  return (
    <div
      className={`absolute top-5 right-5 cursor-pointer`}
      onClick={() => setActiveLoginModal(false)}
    >
      <Close />
    </div>
  );
}
