import { ErrorResponse } from "@/types/response/ErrorResponse";
import axios, { AxiosError } from "axios";

export function handleExecptionError(error: unknown) {
  const { response } = error as ErrorResponse;
  if (!response) return alert("서버 점검중입니다.");
  if (axios.isAxiosError(error)) {
    exceptionService(error);
  } else {
    console.error("An error occurred:", error);
  }
}

export function exceptionService(error: AxiosError<any, any>) {
  if (!error) return;

  const { resultCode } = error?.response?.data;

  switch (resultCode) {
    case "URL_NOT_FOUND":
      alert("잘못된 요청입니다.");
      break;
    case "METHOD_NOT_ALLOWED":
      alert("잘못된 요청입니다.");
      break;
    case "HTTP_MESSAGE_NOT_READABLE":
      alert("잘못된 요청입니다.");
      break;
    case "PASSWORDS_NOT_MATCHING":
      alert("비밀번호가 일치하지 않습니다.");
      break;
    case "INVALID_REQUEST_VALUE":
      alert("요청 값이 유효하지 않습니다.");
      break;
    case "INVALID_INFO":
      alert("입력값이 유효하지 않습니다.");
      break;
    case "PROFANITY_INCLUDED":
      alert("비속어가 포함되어 있습니다.");
      break;
    case "INVALID_PERMISSION":
      alert("사용자 권한이 유효하지 않습니다.");
      break;
    case "USER_NOT_FOUND":
      alert("사용자를 찾을 수 없습니다.");
      break;
    case "USER_REMOVED":
      alert("탈퇴한 계정입니다.");
      break;
    case "Post_NOT_FOUND":
      alert("게시글을 찾을 수 없습니다.");
      break;
    case "COMMENT_NOT_FOUND":
      alert("댓글을 찾을 수 없습니다.");
      break;
    case "DUPLICATED_NAME":
      alert("이미 존재하는 이름입니다.");
      break;
    case "SERVER_ERROR":
      alert("서버 처리 과정에서 오류가 발생했습니다.");
      break;
    default:
      alert("알 수 없는 오류가 발생했습니다.");
      break;
  }
}
