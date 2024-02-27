import { isLoginAtom, loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { cookieUtils } from "@/util/cookieUtils";
import { useRecoilState, useSetRecoilState } from "recoil";

const { setCookie, removeCookie } = cookieUtils();

function useAuthService() {
  const [loggedInNickname, setLoggedInNickname] = useRecoilState(loggedInNicknameAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);

  function setNickname(nickname: string) {
    setLoggedInNickname(nickname);
    setCookie(nickname, { expires: 7 });
  }

  function removeNickname() {
    setLoggedInNickname(undefined);
    setIsLogin(undefined);
    removeCookie();
  }

  return { setNickname, removeNickname };
}

export default useAuthService;
