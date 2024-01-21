import { authApi } from "@/api/authApi";
import { ErrorResponse } from "@/types/response/errorResponse";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface HandleSignupParametor {
  isPassDuplication: boolean;
  username: string;
  password: string;
  passwordConfirm: string;
}

const auth = (router: AppRouterInstance) => {
  const handleSignup = async ({
    isPassDuplication,
    username,
    password,
    passwordConfirm,
  }: HandleSignupParametor) => {
    const isSignupValid =
      !isPassDuplication &&
      username.length < 2 &&
      password.length < 4 &&
      password !== passwordConfirm;

    if (isSignupValid) return alert("항목을 모두 확인해주세요.");

    try {
      await authApi.signup(username, password, passwordConfirm);
      alert("회원가입 성공!");
      router.push("/login");
    } catch (error) {
      const { status } = (error as ErrorResponse).response;
      if (status === 400) return alert("비밀번호를 확인해주세요.");
      if (status === 409) return alert("이미 존재하는 계정입니다.");
    }
  };

  return { handleSignup };
};

export default auth;
