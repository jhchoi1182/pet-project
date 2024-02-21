import { authApi } from "@/api/authApi";
import { NameInputType } from "@/components/loginSignup/molecules/NameInput";
import authService from "@/service/authService";
import {
  nicknameDuplicationAtom,
  usernameDuplicationAtom,
} from "@/stateStore/authAtom";
import { TEXT_COLOR } from "@/styles/colors";
import { SetStateString } from "@/types/type/utilityTypes";
import { useSetRecoilState } from "recoil";

function useNameDuplicationCheckController() {
  const setUsernameDuplication = useSetRecoilState(usernameDuplicationAtom);
  const setNicknameDuplication = useSetRecoilState(nicknameDuplicationAtom);
  const { handleErrorResponse } = authService();

  async function checkDuplication(
    type: NameInputType,
    value: string,
    setExceptionText: SetStateString,
    setValidationTextColor: SetStateString,
  ) {
    try {
      const checkApi =
        type === "username" ? authApi.checkUsername : authApi.checkNickname;
      await checkApi(value);

      const setDuplication =
        type === "username" ? setUsernameDuplication : setNicknameDuplication;
      setDuplication(true);
      setExceptionText(
        `사용 가능한 ${type === "username" ? "아이디" : "닉네임"}입니다.`,
      );
      setValidationTextColor(TEXT_COLOR.blue);
    } catch (error) {
      const setDuplication =
        type === "username" ? setUsernameDuplication : setNicknameDuplication;
      setDuplication(false);
      setValidationTextColor(TEXT_COLOR.red500);
      handleErrorResponse(error, setExceptionText);
    }
  }

  return { checkDuplication };
}

export default useNameDuplicationCheckController;
