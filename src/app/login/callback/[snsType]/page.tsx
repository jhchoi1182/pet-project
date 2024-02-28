"use client";

import React, { useEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
import { useSetRecoilState } from "recoil";
import { loggedInNicknameAtom } from "@/stateStore/commonAtom";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

const SnsLoginpage = ({ params: { snsType } }: snsTypeProps) => {
  const setLoggedInNickname = useSetRecoilState(loggedInNicknameAtom);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleError } = useHandleError();
  const acceptedTypes = ["google", "github", "kakao"];
  const isSocialParams = acceptedTypes.includes(snsType);

  useEffect(() => {
    if (!isSocialParams) return notFound();
    const fetchSocialLogin = async () => {
      const code = searchParams.get("code");
      try {
        if (code) {
          if (snsType === "google") {
            const { data } = await authApi.googleLogin(code);
            const { token, nickname } = data?.result;
            setLoggedInNickname(nickname);
          }
          if (snsType === "github") {
            const { data } = await authApi.githubLogin(code);
            setLoggedInNickname(data?.nickname);
          }
          if (snsType === "kakao") {
            const { data } = await authApi.kakaoLogin(code);
            setLoggedInNickname(data?.nickname);
          }
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchSocialLogin();
    router.replace("/home");
  }, []);

  return <></>;
};

export default SnsLoginpage;
