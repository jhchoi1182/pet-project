import Input from "@/components/atoms/base/Input";
import { TEXT_COLOR } from "@/styles/colors";
import React, { useEffect, useState } from "react";
import ValidationText from "../atom/ValidationText";
import validationService from "@/service/validationService";

export type EmailPasswordType = "email" | "password" | "passwordConfirm";
interface EmailPasswordInputProps {
  type: EmailPasswordType;
  value: string;
  password?: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const label = {
  email: "이메일",
  password: "비밀번호",
  passwordConfirm: "비밀번호 확인",
};

const { changeValidationTextColor } = validationService();

export default function EmailPasswordInput({ type, value, password, handleInputChange }: EmailPasswordInputProps) {
  const [validationTextColor, setValidationTextColor] = useState(type === "password" ? TEXT_COLOR.inverse : TEXT_COLOR.trans);

  useEffect(() => {
    changeValidationTextColor(type, value, setValidationTextColor, password);
  }, [value, password]);

  return (
    <>
      <div className="relative">
        <Input variant="signup" label={label[type]} name={type}>
          <Input.TextField variant="signup" type={type === "passwordConfirm" ? "password" : type} onChange={handleInputChange} required />
        </Input>
        <ValidationText type={type} validationTextColor={validationTextColor} />
      </div>
    </>
  );
}
