import { TEXT_COLOR } from "@/styles/colors";
import { SetStateString } from "@/types/type/utilityTypes";
import { AuthInputType } from "@/components/loginSignup/atom/ValidationText";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import { EnteredInfoType } from "@/components/loginSignup/organisms/SignupForm";
import useHandleError from "./useHandleError";

export function useHandleExceptionText() {
  const { handleError } = useHandleError();

  function handleExceptionText(error: unknown, setExceptionText: SetStateString) {
    const { response } = error as ErrorResponse;
    if (!response) return alert("서버 점검중입니다.");
    const { status, data } = response;
    if (status === 400) {
      setExceptionText(data.resultCode === "PROFANITY_INCLUDED" ? "비속어를 사용할 수 없습니다." : "잘못된 입력값입니다.");
    } else if (status === 409) {
      setExceptionText("이미 사용 중인 이름입니다.");
    } else {
      handleError(error);
    }
  }
  return { handleExceptionText };
}

export function validationService() {
  function valideSignupInput({ username, nickname, email, password, passwordConfirm }: EnteredInfoType, isUsernameAvailable: boolean, isNicknameAvailable: boolean) {
    const isValid =
      isValidUsernameOrNickname(username) &&
      isValidUsernameOrNickname(nickname) &&
      isValidEmail(email) &&
      isValidPassword(password) &&
      password === passwordConfirm &&
      isUsernameAvailable &&
      isNicknameAvailable;
    return isValid ? true : false;
  }

  function changeValidationTextColor(type: AuthInputType, value: string, setValidationTextColor: SetStateString, password?: string) {
    if (value.length === 0) return setValidationTextColor(TEXT_COLOR.trans);

    let isValid = false;

    switch (type) {
      case "username":
      case "nickname":
        isValid = isValidUsernameOrNickname(value);
        break;
      case "email":
        isValid = isValidEmail(value);
        break;
      case "password":
        isValid = isValidPassword(value);
        break;
      case "passwordConfirm":
        isValid = password === value;
        break;
      default:
        isValid = false;
    }
    setValidationTextColor(isValid ? TEXT_COLOR.trans : TEXT_COLOR.red500);
  }

  return {
    valideSignupInput,
    changeValidationTextColor,
  };
}

function isValidUsernameOrNickname(value: string) {
  return value.length >= 2 && value.length <= 16;
}
function isValidEmail(value: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
}
function isValidPassword(value: string) {
  return /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/.test(value);
}
