import { authApi } from "@/api/authApi";
import { setIsOpenLoginModal } from "@/stores/modules/authSlice";
import useAuthManagementService from "@/service/auth/useAuthManagementService";
import { SetStateString } from "@/types/type/utilityTypes";
import { useDispatch } from "react-redux";

interface handleUserLoginParameter {
  username: string;
  password: string;
}

function useLoginAxios() {
  const dispatch = useDispatch();
  const { setNickname } = useAuthManagementService();

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

export default useLoginAxios;
