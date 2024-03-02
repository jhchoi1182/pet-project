import { loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { cookieUtils } from "@/util/cookieUtils";
import { useSetRecoilState } from "recoil";

const { setCookie, removeCookie } = cookieUtils();

function useAuthService() {
  const setLoggedInNickname = useSetRecoilState(loggedInNicknameAtom);

  function setNickname(nickname: string) {
    setLoggedInNickname(nickname);
    setCookie(nickname, { expires: 365 });
  }

  function removeNickname() {
    setLoggedInNickname(undefined);
    removeCookie();
  }

  return { setNickname, removeNickname };
}

export default useAuthService;
