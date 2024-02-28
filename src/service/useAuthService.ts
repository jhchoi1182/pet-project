import { isLoginAtom, loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { cookieUtils } from "@/util/cookieUtils";
import { useSetRecoilState } from "recoil";

const { setCookie, removeCookie } = cookieUtils();

function useAuthService() {
  const setLoggedInNickname = useSetRecoilState(loggedInNicknameAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);

  function setNickname(nickname: string) {
    setLoggedInNickname(nickname);
    setCookie(nickname, { expires: 7 });
  }

  function removeNickname() {
    setLoggedInNickname(undefined);
    setIsLogin(undefined);
    removeCookie();
    console.log("삭제?");
  }

  return { setNickname, removeNickname };
}

export default useAuthService;
