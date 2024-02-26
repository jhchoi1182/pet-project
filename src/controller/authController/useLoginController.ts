import { authApi } from "@/api/authApi";
import { loginModalAtom, loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { TEXT_COLOR } from "@/styles/colors";
import { SetStateString } from "@/types/type/utilityTypes";
import { cookieUtils } from "@/util/cookieUtils";
import { useSetRecoilState } from "recoil";

const { setCookie } = cookieUtils();

interface handleUserLoginParameter {
  username: string;
  password: string;
}

function useLoginController() {
  const setActiveLoginModal = useSetRecoilState(loginModalAtom);
  const setLoggedInNickname = useSetRecoilState(loggedInNicknameAtom);

  async function handleUserLogin({ username, password }: handleUserLoginParameter, setValidationTextColor: SetStateString) {
    try {
      const { data } = await authApi.login(username, password);
      const { token, username: name } = data?.result;
      setCookie(token, { expires: 7 });
      alert("로그인 성공!");
      setLoggedInNickname(name);
      setActiveLoginModal(false);
    } catch (error) {
      setValidationTextColor(TEXT_COLOR.red500);
    }
  }
  return { handleUserLogin };
}

export default useLoginController;
