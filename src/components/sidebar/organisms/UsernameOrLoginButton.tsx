"use client";

import Button from "@/components/atoms/base/Button";
import React, { useEffect, useState } from "react";
import UserOptionsDropdown from "../molecules/UserOptionsDropdown";
import { cookieUtils } from "@/util/cookieUtils";
import useAuthenticationController from "@/controller/authController/useAuthenticationController";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenLoginModal, setLoggedInNickname } from "@/redux/modules/authSlice";
import { RootState } from "@/redux/store/store";

const { getCookie } = cookieUtils();

export default function UsernameOrLoginButton() {
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInNickname, isSocialLoginInProgress, isRemovedNicknameCookie } = useSelector(({ authSlice }: RootState) => authSlice);
  const dispatch = useDispatch();

  const { fetchAuth } = useAuthenticationController();

  useEffect(() => {
    dispatch(setLoggedInNickname(getCookie()));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isRemovedNicknameCookie) return;
    fetchAuth();
  }, [isRemovedNicknameCookie]);

  return (
    <>
      {isLoading || isSocialLoginInProgress ? (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      ) : loggedInNickname ? (
        <div className={`flex gap-2 ml-[10.4px] text-inverse`}>
          <div className={`flex flex-col gap-3 items-center`}>
            <span className={`flex items-center`}>
              <span className={`text-yellow`}>{loggedInNickname}</span>
              <span className={`ml-2`}>님</span>
            </span>
            <p>환영합니다!</p>
          </div>
          <UserOptionsDropdown />
        </div>
      ) : (
        <Button onClick={() => dispatch(setIsOpenLoginModal(true))}>로그인</Button>
      )}
    </>
  );
}
