"use client";

import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import Button from "@/components/atoms/base/Button";
import useAuthenticationController from "@/controller/authController/useAuthenticationController";
import { loginModalAtom, loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { TEXT_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { cookieUtils } from "@/util/cookieUtils";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import UserOptionsDropdown from "../molecules/UserOptionsDropdown";

const { getCookie } = cookieUtils();
const token = getCookie();

export default function UsernameOrLoginButton() {
  const [isLogin, setIsLogin] = useState(true);
  const setActiveLoginModal = useSetRecoilState(loginModalAtom);
  const [loggedInNickname, setLoggedInNickname] = useRecoilState(loggedInNicknameAtom);

  const { data, isError } = useAuthenticationController(token);

  useEffect(() => {
    if (!token) return setIsLogin(false);
    if (isError || !data) {
      setLoggedInNickname(null);
    } else {
      setLoggedInNickname(data?.username);
    }
  }, [data?.username]);

  return (
    <div className={`h-52 mt-[60px] ${FONT_VARIANTS.body02}`}>
      {loggedInNickname ? (
        <div className={`flex gap-2 ml-[10.4px] ${TEXT_COLOR.inverse}`}>
          <div className={`flex flex-col gap-3 items-center`}>
            <span className={`flex items-center`}>
              <span className={`${TEXT_COLOR.yellow}`}>{loggedInNickname}</span>
              <span className={`ml-2`}>님</span>
            </span>
            <p>환영합니다!</p>
          </div>
          <UserOptionsDropdown />
        </div>
      ) : !isLogin || data !== undefined ? (
        <Button onClick={() => setActiveLoginModal(true)}>로그인</Button>
      ) : (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
