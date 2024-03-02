"use client";

import React, { useEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
import { useSetRecoilState } from "recoil";
import { isSocialLoginInProgressAtom } from "@/stateStore/commonAtom";
import useAuthService from "@/service/useAuthService";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

export default function SnsLoginpage({ params: { snsType } }: snsTypeProps) {
  const isSocialLoginInProgress = useSetRecoilState(isSocialLoginInProgressAtom);
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
      if (!code) return;
      isSocialLoginInProgress(() => true);
      try {
        if (snsType === "google") {
          const { data } = await authApi.googleLogin(code);
          const { nickname } = data?.result;
          setNickname(nickname);
        }
      } catch (error) {
        handleError(error);
      } finally {
        isSocialLoginInProgress(() => false);
      }
    };
    fetchSocialLogin();
    router.replace("/home");
  }, []);

  return <></>;
}
