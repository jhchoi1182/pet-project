import { ErrorResponse } from "@/types/response/ErrorResponse";
import axios from "axios";
import useAuthManagementService from "../auth/useAuthManagementService";

function useHandleError() {
  const { removeNickname } = useAuthManagementService();

  function handleError(error: unknown, skipNameRemove: boolean = false) {
    const { response } = error as ErrorResponse;

    if (!response) return alert("서버 점검중입니다.");

    if (axios.isAxiosError(error)) {
      const { resultCode } = error.response?.data;

      switch (resultCode) {
        case "URL_NOT_FOUND":
        case "METHOD_NOT_ALLOWED":
        case "HTTP_MESSAGE_NOT_READABLE":
          alert("잘못된 요청입니다.");
          break;
        case "PASSWORDS_NOT_MATCHING":
          alert("비밀번호가 일치하지 않습니다.");
          break;
        case "INVALID_REQUEST_VALUE":
        case "INVALID_INFO":
          alert("요청 값이 유효하지 않습니다.");
          break;
        case "PROFANITY_INCLUDED":
          alert("비속어가 포함되어 있습니다.");
          break;
        case "INVALID_PERMISSION":
        case "INVALID_TOKEN":
        case "AUTHENTICATION_ERROR":
          !skipNameRemove && removeNickname();
          alert("로그인 후 이용해주세요.");
          break;
        case "USER_NOT_FOUND":
        case "USER_REMOVED":
          alert("사용자를 찾을 수 없습니다.");
          break;
        case "Post_NOT_FOUND":
        case "COMMENT_NOT_FOUND":
          alert("요청한 정보를 찾을 수 없습니다.");
          break;
        case "DUPLICATED_NAME":
          alert("이미 존재하는 이름입니다.");
          break;
        default:
          alert("서버 연결에 실패했습니다.");
          break;
      }
    } else {
      console.error("An error occurred:", error);
    }
  }

  return { handleError };
}

export default useHandleError;
