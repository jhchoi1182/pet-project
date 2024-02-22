"use client";

import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import Button from "@/components/atoms/base/Button";
import useAuthController from "@/controller/authController/useAuthController";
import { loginModalAtom, usernameAtom } from "@/stateStore/commonAtom";
import { TEXT_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { cookieUtils } from "@/util/cookieUtils";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import UserOptionsDropdown from "./UserOptionsDropdown";

const { getCookie } = cookieUtils();
const token = getCookie();

export default function UsernameOrLoginButton() {
  const [isLogin, setIsLogin] = useState(true);
  const setActiveLoginModal = useSetRecoilState(loginModalAtom);
  const [username, setUsername] = useRecoilState(usernameAtom);

  const { data, isError } = useAuthController(token);

  useEffect(() => {
    if (!token) return setIsLogin(false);
    if (isError || !data) {
      setUsername(null);
    } else {
      setUsername(data?.username);
    }
  }, [data?.username]);

  return (
    <div className={`h-52 mt-[60px] ${FONT_VARIANTS.body02}`}>
      {data || username ? (
        <div className={`flex gap-2 ml-[10.4px] ${TEXT_COLOR.inverse}`}>
          <div className={`flex flex-col gap-3 items-center`}>
            <span className={`flex items-center`}>
              <span className={`${TEXT_COLOR.yellow}`}>{username}</span>
              <span className={`ml-2`}>님</span>
            </span>
            <p>환영합니다!</p>
          </div>
          <UserOptionsDropdown />
        </div>
      ) : !isLogin ? (
        <Button onClick={() => setActiveLoginModal(true)}>로그인</Button>
      ) : (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
