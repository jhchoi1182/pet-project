import React, { useState } from "react";
import ModalPortal from "../atoms/base/ModalPortal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModal() {
  const [toggleLoginSignup, setToggleLoginSignup] = useState(true);

  return (
    <ModalPortal>
      <div className={`fixed w-full h-screen inset-0 z-10`} />
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20`}
      >
        {toggleLoginSignup ? (
          <LoginForm setToggleLoginSignup={setToggleLoginSignup} />
        ) : (
          <SignupForm setToggleLoginSignup={setToggleLoginSignup} />
        )}
      </div>
    </ModalPortal>
  );
}
