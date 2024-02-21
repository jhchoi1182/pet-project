import React from "react";

export type AuthInputType =
  | "username"
  | "nickname"
  | "email"
  | "password"
  | "passwordConfirm";
interface ValidationTextProps {
  validationTextColor: string;
  type: AuthInputType;
  exceptionText?: string;
}

const validationText = {
  username: "2~16자를 입력해주세요.",
  nickname: "2~16자를 입력해주세요.",
  email: "이메일 형식에 맞지 않습니다.",
  password: "특수문자, 소문자, 숫자를 하나 이상씩 포함하는 8~20자",
  passwordConfirm: "비밀번호와 일치하지 않습니다.",
};

export default function ValidationText({
  validationTextColor,
  type,
  exceptionText,
}: ValidationTextProps) {
  return (
    <div
      className={`absolute top-14 ml-[184px] select-none ${validationTextColor}`}
    >
      <span>{exceptionText ? exceptionText : validationText[type]}</span>
    </div>
  );
}
