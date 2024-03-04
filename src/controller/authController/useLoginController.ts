import { authApi } from "@/api/authApi";
import useAuthService from "@/service/useAuthService";
import { loginModalAtom } from "@/stateStore/commonAtom";
import { SetStateString } from "@/types/type/utilityTypes";
import { useSetRecoilState } from "recoil";

interface handleUserLoginParameter {
  username: string;
  password: string;
}

function useLoginController() {
  const setActiveLoginModal = useSetRecoilState(loginModalAtom);
  const { setNickname } = useAuthService();

  async function handleUserLogin({ username, password }: handleUserLoginParameter, setValidationTextColor: SetStateString) {
    try {
      const { data } = await authApi.login(username, password);
      const { nickname } = data?.result;
      alert("로그인 성공!");
      setNickname(nickname);
      setActiveLoginModal(false);
    } catch (error) {
      setValidationTextColor("text-red500");
    }
  }
  return { handleUserLogin };
}

export default useLoginController;
