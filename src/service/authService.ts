import { authApi } from "@/api/authApi";
import { cookieUtils } from "@/util/cookieUtils";
import exceptionService from "./exceptionService";
import axios from "axios";
import { HandleLoginParameter } from "@/types/parameter/authServiceParameter";
import { TEXT_COLOR } from "@/styles/colors";
import { SetStateString } from "@/types/type/utilityTypes";
import { AuthInputType } from "@/components/loginSignup/atom/ValidationText";
import { ErrorResponse } from "@/types/response/ErrorResponse";

const isValidUsernameOrNickname = (value: string) =>
  value.length >= 2 && value.length <= 16;
const isValidEmail = (value: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
const isValidPassword = (value: string) =>
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/.test(value);
const { setCookie, removeCookie } = cookieUtils();

function authService() {
  async function handleUserLogin({ username, password }: HandleLoginParameter) {
    const isLoginValid = username.length < 2 && password.length < 4;

    if (isLoginValid) return alert("항목을 모두 확인해주세요.");

    try {
      const { data } = await authApi.userLogin(username, password);
      setCookie(data.result.token, { expires: 7 });
    } catch (error) {
      handleExecptionError(error);
    }
  }

  async function handleWithdrawal() {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      try {
        await authApi.withdraw();
        removeCookie();
      } catch (error) {
        handleExecptionError(error);
      }
    }
  }

  function changeValidationTextColor(
    type: AuthInputType,
    value: string,
    setValidationTextColor: SetStateString,
    password?: string,
  ) {
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

  function handleErrorResponse(
    error: unknown,
    setExceptionText: SetStateString,
  ) {
    const { response } = error as ErrorResponse;
    if (!response) return alert("서버 점검중입니다.");

    const { status, data } = response;
    if (status === 400) {
      setExceptionText(
        data.resultCode === "PROFANITY_INCLUDED"
          ? "비속어를 사용할 수 없습니다."
          : "잘못된 입력값입니다.",
      );
    } else if (status === 409) {
      setExceptionText("이미 사용 중인 이름입니다.");
    } else {
      handleExecptionError(error);
    }
  }

  function handleExecptionError(error: unknown) {
    if (axios.isAxiosError(error)) {
      exceptionService(error);
    } else {
      console.error("An error occurred:", error);
    }
  }

  return {
    handleUserLogin,
    changeValidationTextColor,
    handleErrorResponse,
    handleWithdrawal,
  };
}

export default authService;
