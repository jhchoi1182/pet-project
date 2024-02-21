import React from "react";
import Close from "../../atoms/icons/Close";
import { useSetRecoilState } from "recoil";
import { modalAtom } from "@/stateStore/commonAtom";

export default function CloseButton() {
  const setActiveLoginModal = useSetRecoilState(modalAtom);

  return (
    <button
      className={`absolute top-5 right-5`}
      type="button"
      onClick={() => setActiveLoginModal(false)}
    >
      <Close />
    </button>
  );
}
