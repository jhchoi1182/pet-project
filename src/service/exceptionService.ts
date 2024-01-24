import { AxiosError } from "axios";

function exceptionService(error: AxiosError<any, any>) {
  if (!error) return;

  const { resultCode } = error?.response?.data;

  switch (resultCode) {
    case "PASSWORDS_NOT_MATCHING":
      alert("비밀번호가 일치하지 않습니다.");
      break;
    case "INVALID_REQUEST_VALUE":
      alert("요청 값이 유효하지 않습니다.");
      break;
    case "INVALID_INFO":
      alert("입력값이 유효하지 않습니다.");
      break;
    case "INVALID_PERMISSION":
      alert("사용자 권한이 유효하지 않습니다.");
      break;
    case "USER_NOT_FOUND":
      alert("사용자를 찾을 수 없습니다.");
      break;
    case "TODO_NOT_FOUND":
      alert("Todo를 찾을 수 없습니다.");
      break;
    case "COMMENT_NOT_FOUND":
      alert("댓글을 찾을 수 없습니다.");
      break;
    case "DUPLICATED_USER_NAME":
      alert("이미 존재하는 계정입니다.");
      break;
    default:
      alert("알 수 없는 오류가 발생했습니다.");
      break;
  }
}

export default exceptionService;
