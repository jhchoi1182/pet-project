import { authApi } from "@/api/authApi";
import { setIsOpenLoginModal } from "@/redux/modules/authSlice";
import useAuthService from "@/service/useAuthService";
import { SetStateString } from "@/types/type/utilityTypes";
import { useDispatch } from "react-redux";

interface handleUserLoginParameter {
  username: string;
  password: string;
}

function useLoginController() {
  const dispatch = useDispatch();
  const { setNickname } = useAuthService();

  async function handleUserLogin({ username, password }: handleUserLoginParameter, setValidationTextColor: SetStateString) {
    try {
      const { data } = await authApi.login(username, password);
      const { nickname } = data?.result;
      alert("로그인 성공!");
      setNickname(nickname);
      dispatch(setIsOpenLoginModal(false));
    } catch (error) {
      setValidationTextColor("text-red500");
    }
  }
  return { handleUserLogin };
}

export default useLoginController;
