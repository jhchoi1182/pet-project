"use client";

import React, { useEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
import { useSetRecoilState } from "recoil";
import { isLoadingAtom, loggedInNicknameAtom } from "@/stateStore/commonAtom";
import useAuthService from "@/service/useAuthService";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

const SnsLoginpage = ({ params: { snsType } }: snsTypeProps) => {
  const setLoggedInNickname = useSetRecoilState(loggedInNicknameAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);
  const { setNickname } = useAuthService();
  const { handleError } = useHandleError();
  const searchParams = useSearchParams();
  const router = useRouter();

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
            const { nickname } = data?.result;
            setNickname(nickname);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchSocialLogin();
    router.replace("/home");
  }, []);

  return <></>;
};

export default SnsLoginpage;
