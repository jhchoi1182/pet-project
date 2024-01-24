import { useEffect, useState } from "react";
import Input from "../../base/Input";
import Button from "../../base/Button";
import ValidationText from "./ValidationText";
import { authApi } from "@/api/authApi";
import { TextColor } from "@/types/type/textColor";
import axios from "axios";
import { ErrorResponse } from "@/types/response/ErrorResponse";

interface SignupIdInputProps {
  username: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsPassDuplication: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignupIdInput({
  username,
  onChangeHandler,
  setIsPassDuplication,
}: SignupIdInputProps) {
  const [validationTextColor, setValidationTextColor] = useState(TextColor.BLACK);
  const [checkResultText, setCheckResultText] = useState("");

  const validationText = "최소 2글자 이상 입력해주세요.";

  const checkDuplication = async () => {
    try {
      await authApi.checkId(username);
      setCheckResultText("사용 가능한 아이디입니다.");
      setValidationTextColor(TextColor.GREEN);
      setIsPassDuplication(true);
    } catch (error) {
      if (!axios.isAxiosError(error)) return console.error(error);
      const { status } = (error as ErrorResponse).response;
      setValidationTextColor(TextColor.RED);
      setIsPassDuplication(false);
      if (status === 400) return setCheckResultText("잘못된 입력값입니다.");
      if (status === 409) return setCheckResultText("이미 사용 중인 아이디입니다.");
    }
  };

  useEffect(() => {
    if (username.length > 0) {
      setValidationTextColor(username.length >= 2 ? TextColor.TRANS : TextColor.RED);
    }
  }, [username]);

  return (
    <div className="relative w-full">
      <div className="flex justify-between">
        <Input variant="signup" label="아이디" name="username">
          <Input.TextField variant="login" value={username} onChange={onChangeHandler} required />
        </Input>
        <Button size="small" type="button" className="-mt-[2px]" onClick={checkDuplication}>
          중복 확인
        </Button>
      </div>
      <div>
        <ValidationText
          validationTextColor={validationTextColor}
          primaryText={validationText}
          exceptionalText={checkResultText}
        />
      </div>
    </div>
  );
}
