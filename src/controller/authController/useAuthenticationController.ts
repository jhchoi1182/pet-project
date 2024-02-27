import { authApi } from "@/api/authApi";
import { handleExecptionError } from "@/service/exceptionService";
import useAuthService from "@/service/useAuthService";
import { isLoginAtom } from "@/stateStore/commonAtom";
import { cookieUtils } from "@/util/cookieUtils";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const { getCookie } = cookieUtils();

function useAuthenticationController() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const { setNickname } = useAuthService();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        setIsLogin(getCookie());
        if (!isLogin) return;
        const { nickname } = await authApi.getUserInfo();
        setNickname(nickname);
      } catch (error) {
        handleExecptionError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, [isLogin]);

  return { isLoading, isLogin };
}

export default useAuthenticationController;
