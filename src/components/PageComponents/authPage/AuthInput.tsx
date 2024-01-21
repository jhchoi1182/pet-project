import ValidationText from "@/components/PageComponents/authPage/ValidationText";
import Input from "@/components/base/Input";
import { TextColor } from "@/types/type/textColor";
import React, { useEffect, useState } from "react";

interface AuthInputProps {
  variant: "login" | "signup";
  type: "username" | "password" | "passwordConfirm";
  value: string;
  password?: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const label = {
  username: "아이디",
  password: "비밀번호",
  passwordConfirm: "비밀번호 확인",
};
const validationText = {
  username: "최소 2글자 이상 입력해주세요.",
  password: "최소 4글자 이상 입력해주세요.",
  passwordConfirm: "비밀번호와 일치하지 않습니다.",
};

export default function AuthInput({
  type,
  variant,
  value,
  password,
  onChangeHandler,
}: AuthInputProps) {
  const [validationTextColor, setValidationTextColor] = useState(
    type === "passwordConfirm" ? TextColor.TRANS : TextColor.BLACK,
  );

  const inputType = type === "username" ? "text" : "password";

  useEffect(() => {
    if (type === "username" && value.length > 0) {
      setValidationTextColor(value.length >= 2 ? TextColor.TRANS : TextColor.RED);
    } else if (type === "password" && value.length > 0) {
      setValidationTextColor(value.length >= 4 ? TextColor.TRANS : TextColor.RED);
    } else if (type === "passwordConfirm") {
      setValidationTextColor(password === value ? TextColor.TRANS : TextColor.RED);
    }
  }, [type, value, password]);

  return (
    <div className="relative">
      <div>
        <Input variant={variant} label={label[type]} name={type}>
          <Input.TextField
            variant={variant}
            type={inputType}
            value={value}
            onChange={onChangeHandler}
            required
          />
        </Input>
      </div>
      <div>
        <ValidationText
          validationTextColor={validationTextColor}
          primaryText={validationText[type]}
        />
      </div>
    </div>
  );
}
