import ValidationText from "@/components/ValidationText";
import Input from "@/components/base/Input";
import { TextColor } from "@/types/type/textColor";
import React, { useEffect, useState } from "react";

interface PasswordInputProps {
  type: "password" | "passwordConfirm";
  password: string;
  passwordConfirm?: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
  type,
  password,
  passwordConfirm,
  onChangeHandler,
}: PasswordInputProps) {
  const isPasswordType = type === "password";

  const [validationTextColor, setValidationTextColor] = useState(
    isPasswordType ? TextColor.BLACK : TextColor.TRANS,
  );

  const label = isPasswordType ? "비밀번호" : "비밀번호 확인";
  const value = isPasswordType ? password : passwordConfirm;
  const validationText = isPasswordType
    ? "최소 4글자 이상 입력해주세요."
    : "비밀번호와 일치하지 않습니다.";

  useEffect(() => {
    if (isPasswordType) {
      if (password.length > 0) {
        setValidationTextColor(password.length >= 4 ? TextColor.TRANS : TextColor.RED);
      }
    } else {
      setValidationTextColor(password === passwordConfirm ? TextColor.TRANS : TextColor.RED);
    }
  }, [password, passwordConfirm]);

  return (
    <div className="relative">
      <div>
        <Input variant="signup" label={label} name={type}>
          <Input.TextField
            variant="login"
            type="password"
            value={value}
            onChange={onChangeHandler}
            required
          />
        </Input>
      </div>
      <div>
        <ValidationText validationTextColor={validationTextColor} primaryText={validationText} />
      </div>
    </div>
  );
}
