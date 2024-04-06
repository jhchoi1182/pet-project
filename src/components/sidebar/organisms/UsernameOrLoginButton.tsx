"use client";

import Button from "@/components/atoms/base/Button";
import React, { useEffect, useState } from "react";
import useAuthenticationAxios from "@/service/auth/useAuthenticationAxios";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenLoginModal, setLoggedInNickname } from "@/stores/modules/authSlice";
import { RootState } from "@/stores/store/store";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookieUtils } from "@/util/cookieUtils";
import LoadingSpinner from "@/components/atoms/ui/LoadingSpinner";
import Username from "../molecules/Username";
import { usePathname } from "next/navigation";

const { getCookie } = cookieUtils();

export default function UsernameOrLoginButton({ nickname }: { nickname: RequestCookie | undefined }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInNickname, isSocialLoginInProgress, isRemovedNicknameCookie } = useSelector(({ authSlice }: RootState) => authSlice);
  const dispatch = useDispatch();

  const { fetchAuth } = useAuthenticationAxios();

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
      {pathname === "/login/callback/google" || isSocialLoginInProgress ? (
        <div className="mt-6">
          <LoadingSpinner />
        </div>
      ) : isLoading && nickname ? (
        <Username nickname={nickname.value} />
      ) : !isLoading && loggedInNickname ? (
        <Username nickname={loggedInNickname} />
      ) : (
        <Button onClick={() => dispatch(setIsOpenLoginModal(true))}>로그인</Button>
      )}
    </>
  );
}
