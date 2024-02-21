import { authApi } from "@/api/authApi";
import { handleExecptionError } from "@/service/exceptionService";
import { modalAtom } from "@/stateStore/commonAtom";
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
  const setActiveLoginModal = useSetRecoilState(modalAtom);

  async function handleUserLogin({ username, password }: handleUserLoginParameter, setValidationTextColor: SetStateString) {
    try {
      const { data } = await authApi.login(username, password);
      alert("로그인 성공!");
      setCookie(data.result.token, { expires: 7 });
      setActiveLoginModal(false);
    } catch (error) {
      setValidationTextColor(TEXT_COLOR.red500);
    }
  }
  return { handleUserLogin };
}

export default useLoginController;
