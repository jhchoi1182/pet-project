import { authApi } from "@/api/authApi";
import useAuthService from "@/service/useAuthService";
import { EnteredInfoType } from "@/components/loginSignup/organisms/SignupForm";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import { handleExecptionError } from "@/service/exceptionService";

interface SignupControllerParemeter {
  enteredInfo: EnteredInfoType;
  isUsernameAvailable: boolean;
  isNicknameAvailable: boolean;
  setToggleLoginSignup: SetStateBoolean;
}

function useSignupController() {
  const { valideSignupInput } = useAuthService();

  async function handleSignup({
    enteredInfo,
    isUsernameAvailable,
    isNicknameAvailable,
    setToggleLoginSignup,
  }: SignupControllerParemeter) {
    if (
      !valideSignupInput(enteredInfo, isUsernameAvailable, isNicknameAvailable)
    )
      return alert("항목을 모두 확인해주세요.");
    try {
      await authApi.signup(enteredInfo);
      alert("회원가입 성공!");
      setToggleLoginSignup(true);
    } catch (error) {
      handleExecptionError(error);
    }
  }

  return { handleSignup };
}

export default useSignupController;
