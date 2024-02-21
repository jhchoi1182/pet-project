import { authApi } from "@/api/authApi";
import { NameInputType } from "@/components/loginSignup/molecules/NameInput";
import useAuthService from "@/service/useAuthService";
import { TEXT_COLOR } from "@/styles/colors";
import { SetStateBoolean, SetStateString } from "@/types/type/utilityTypes";

function useNameDuplicationCheckController() {
  const { handleErrorResponse } = useAuthService();

  async function checkDuplication(type: NameInputType, value: string, setExceptionText: SetStateString, setValidationTextColor: SetStateString, setIsNameAvailable: SetStateBoolean) {
    try {
      const checkApi = type === "username" ? authApi.checkUsername : authApi.checkNickname;
      await checkApi(value);

      setIsNameAvailable(true);
      setExceptionText(`사용 가능한 ${type === "username" ? "아이디" : "닉네임"}입니다.`);
      setValidationTextColor(TEXT_COLOR.blue);
    } catch (error) {
      setIsNameAvailable(false);
      setValidationTextColor(TEXT_COLOR.red500);
      handleErrorResponse(error, setExceptionText);
    }
  }

  return { checkDuplication };
}

export default useNameDuplicationCheckController;
