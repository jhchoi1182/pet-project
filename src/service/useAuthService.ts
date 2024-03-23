
import { setLoggedInNickname } from "@/redux/modules/authSlice";
import { cookieUtils } from "@/util/cookieUtils";
import { useDispatch } from "react-redux";
import { useSetRecoilState } from "recoil";

const { setCookie, removeCookie } = cookieUtils();

function useAuthService() {
  const dispatch = useDispatch();

  function setNickname(nickname: string) {
    dispatch(setLoggedInNickname(nickname));
    setCookie(nickname, { expires: 365 });
  }

  function removeNickname() {
    dispatch(setLoggedInNickname(undefined));
    removeCookie();
  }

  return { setNickname, removeNickname };
}

export default useAuthService;
