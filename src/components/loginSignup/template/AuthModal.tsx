"use client";

import React, { useState } from "react";
import ModalPortal from "../../atoms/base/ModalPortal";
import LoginForm from "../organisms/LoginForm";
import SignupForm from "../organisms/SignupForm";
import { useRecoilValue } from "recoil";
import { loginModalAtom } from "@/stateStore/commonAtom";

export default function AuthModal() {
  const activeLoginModal = useRecoilValue(loginModalAtom);
  const [toggleLoginSignup, setToggleLoginSignup] = useState(true);

  return (
    <>
      {activeLoginModal && (
        <ModalPortal>
          <div className={`backdrop`} />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20`}>
            {toggleLoginSignup ? <LoginForm setToggleLoginSignup={setToggleLoginSignup} /> : <SignupForm setToggleLoginSignup={setToggleLoginSignup} />}
          </div>
        </ModalPortal>
      )}
    </>
  );
}
