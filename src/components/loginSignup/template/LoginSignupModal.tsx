"use client";

import React, { useState } from "react";
import ModalPortal from "../../atoms/base/ModalPortal";
import LoginForm from "../organisms/LoginForm";
import SignupForm from "../organisms/SignupForm";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

export default function LoginSignupModal() {
  const isOpenLoginModal = useSelector(({ authSlice }: RootState) => authSlice.isOpenLoginModal);
  const [toggleLoginSignup, setToggleLoginSignup] = useState(true);

  return (
    <>
      {isOpenLoginModal && (
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
