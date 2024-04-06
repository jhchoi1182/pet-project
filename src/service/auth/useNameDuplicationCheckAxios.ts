import { authApi } from "@/api/authApi";
import { NameInputType } from "@/components/loginSignup/molecules/NameInput";
import { useHandleExceptionText } from "@/service/validationService";
import { SetStateBoolean, SetStateString } from "@/types/type/utilityTypes";

function useNameDuplicationCheckAxios() {
  const { handleExceptionText } = useHandleExceptionText();
  async function checkDuplication(
    type: NameInputType,
    value: string,
    setExceptionText: SetStateString,
    setValidationTextColor: SetStateString,
    setIsNameAvailable: SetStateBoolean,
  ) {
    try {
      const checkApi = type === "username" ? authApi.checkUsername : authApi.checkNickname;
      await checkApi(value);

      setIsNameAvailable(true);
      setExceptionText(`사용 가능한 ${type === "username" ? "아이디" : "닉네임"}입니다.`);
      setValidationTextColor("text-blue");
    } catch (error) {
      setIsNameAvailable(false);
      setValidationTextColor("text-red500");
      handleExceptionText(error, setExceptionText);
    }
  }

  return { checkDuplication };
}

export default useNameDuplicationCheckAxios;
