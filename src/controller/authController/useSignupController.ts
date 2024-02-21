import { authApi } from "@/api/authApi";
import { modalAtom } from "@/stateStore/commonAtom";
import authService from "@/service/authService";
import { useSetRecoilState } from "recoil";

interface HandleLoginParameter {
  username: string;
  password: string;
}
interface HandleSignupParameter extends HandleLoginParameter {
  isPassDuplication: boolean;
  passwordConfirm: string;
}

function useSignupController({
  username,
  nickname,
  email,
  password,
  passwordConfirm,
}: HandleSignupParameter) {
  const setActiveLoginModal = useSetRecoilState(modalAtom);
  const { handleError } = authService();

  const handleSignup = async () => {
    // 유효성 검사

    try {
      await authApi.signup(username, password, passwordConfirm);
      alert("회원가입 성공!");
      setActiveLoginModal(true);
    } catch (error) {
      handleError(error);
    }
  };

  return handleSignup;
}

export default useSignupController;
