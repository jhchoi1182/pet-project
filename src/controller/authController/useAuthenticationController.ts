import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
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
  const { handleError } = useHandleError();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        setIsLogin(getCookie());
        if (!isLogin) return;
        const { nickname } = await authApi.getUserInfo();
        setNickname(nickname);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, [isLogin]);

  return { isLoading, isLogin };
}

export default useAuthenticationController;
