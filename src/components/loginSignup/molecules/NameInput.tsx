import Button from "@/components/atoms/base/Button";
import Input from "@/components/atoms/base/Input";
import React, { useEffect, useState } from "react";
import ValidationText from "../atom/ValidationText";
import { TEXT_COLOR } from "@/styles/colors";
import authService from "@/service/authService";

export type NameInputType = "username" | "nickname";
interface NameInputProps {
  type: NameInputType;
  value: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameDuplicationCheck: (type: NameInputType) => void;
}

const label = {
  username: "아이디",
  nickname: "닉네임",
};

export default function NameInput({
  type,
  value,
  handleInputChange,
  handleNameDuplicationCheck,
}: NameInputProps) {
  const [validationTextColor, setValidationTextColor] = useState(
    TEXT_COLOR.trans,
  );

  const { changeValidationTextColor } = authService();

  useEffect(() => {
    changeValidationTextColor(type, value, setValidationTextColor);
  }, [value]);

  return (
    <div className={`relative`}>
      <div className={`flex gap-[22px]`}>
        <Input variant="signup" label={label[type]} name={type}>
          <Input.TextField
            variant="signup"
            onChange={handleInputChange}
            required
          />
        </Input>
        <Button
          size="small"
          type="button"
          onClick={() => handleNameDuplicationCheck(type)}
        >
          중복 확인
        </Button>
      </div>
      <ValidationText type={type} validationTextColor={validationTextColor} />
    </div>
  );
}
