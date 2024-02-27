"use client";

import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import Button from "@/components/atoms/base/Button";
import useAuthenticationController from "@/controller/authController/useAuthenticationController";
import { loginModalAtom, loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { TEXT_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import UserOptionsDropdown from "../molecules/UserOptionsDropdown";

export default function UsernameOrLoginButton() {
  const setActiveLoginModal = useSetRecoilState(loginModalAtom);
  const loggedInNickname = useRecoilValue(loggedInNicknameAtom);

  const { isLoading, isLogin } = useAuthenticationController();
  console.log("loggedInNickname ::", loggedInNickname);
  console.log("isLogin ::", isLogin);

  return (
    <div className={`h-52 mt-[60px] ${FONT_VARIANTS.body02}`}>
      {loggedInNickname || isLogin ? (
        <div className={`flex gap-2 ml-[10.4px] ${TEXT_COLOR.inverse}`}>
          <div className={`flex flex-col gap-3 items-center`}>
            <span className={`flex items-center`}>
              <span className={`${TEXT_COLOR.yellow}`}>{loggedInNickname ?? isLogin}</span>
              <span className={`ml-2`}>님</span>
            </span>
            <p>환영합니다!</p>
          </div>
          <UserOptionsDropdown />
        </div>
      ) : isLoading ? (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      ) : (
        <Button onClick={() => setActiveLoginModal(true)}>로그인</Button>
      )}
    </div>
  );
}
