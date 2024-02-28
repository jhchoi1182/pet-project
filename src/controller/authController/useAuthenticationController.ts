import { authApi } from "@/api/authApi";
import useHandleError from "@/service/useHandleError";
import useAuthService from "@/service/useAuthService";
import { isLoadingAtom, isLoginAtom } from "@/stateStore/commonAtom";
import { cookieUtils } from "@/util/cookieUtils";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { usePathname } from "next/navigation";

const { getCookie } = cookieUtils();

function useAuthenticationController() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);
  const { setNickname } = useAuthService();
  const { handleError } = useHandleError();

  const isSocialLoginInProgress = usePathname().startsWith("/login/callback");

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
        if (isSocialLoginInProgress) return;
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, [isLogin]);

  return { isLogin };
}

export default useAuthenticationController;
