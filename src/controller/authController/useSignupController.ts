import { authApi } from "@/api/authApi";
import { EnteredInfoType } from "@/components/loginSignup/organisms/SignupForm";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import useHandleError from "@/service/useHandleError";
import { validationService } from "@/service/validationService";

interface SignupControllerParemeter {
  enteredInfo: EnteredInfoType;
  isUsernameAvailable: boolean;
  isNicknameAvailable: boolean;
  setToggleLoginSignup: SetStateBoolean;
}
const { valideSignupInput } = validationService();

function useSignupController() {
  const { handleError } = useHandleError();
  async function handleSignup({ enteredInfo, isUsernameAvailable, isNicknameAvailable, setToggleLoginSignup }: SignupControllerParemeter) {
    if (!valideSignupInput(enteredInfo, isUsernameAvailable, isNicknameAvailable)) return alert("항목을 모두 확인해주세요.");
    try {
      await authApi.signup(enteredInfo);
      alert("회원가입 성공!");
      setToggleLoginSignup(true);
    } catch (error) {
      handleError(error);
    }
  }

  return { handleSignup };
}

export default useSignupController;
