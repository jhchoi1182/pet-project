import { BG_COLOR, TEXT_COLOR } from "@/styles/colors";
import React, { useState } from "react";
import Logo from "../../atoms/Logo";
import Button from "../../atoms/base/Button";
import CloseButton from "../molecules/CloseButton";
import NameInput, { NameInputType } from "../molecules/NameInput";
import useNameDuplicationCheckController from "@/controller/authController/useNameDuplicationCheckController";
import EmailPasswordInput from "../molecules/EmailPasswordInput";

interface SignupModalProps {
  setToggleLoginSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignupModal({
  setToggleLoginSignup,
}: SignupModalProps) {
  const [enteredInfo, setEnteredInfo] = useState({
    username: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  // const { handleSignup } = authService();
  // handleSignup({ isPassDuplication, username, password, passwordConfirm });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToggleLoginSignup(true);
  };

  return (
    <form
      className={`flex flex-col items-center w-[689px] h-[710px] ${BG_COLOR.navy} rounded-[10px] shadow-xl`}
      onSubmit={handleSubmit}
    >
      <CloseButton />
      <div className={`mt-11`}>
        <Logo />
      </div>
      <div className={`flex flex-col gap-[50px] mt-[55px]`}>
        <NameInput
          type="username"
          value={enteredInfo.username}
          handleInputChange={handleInputChange}
        />
        <NameInput
          type="nickname"
          value={enteredInfo.nickname}
          handleInputChange={handleInputChange}
        />
        <EmailPasswordInput
          type="email"
          value={enteredInfo.email}
          handleInputChange={handleInputChange}
        />
        <EmailPasswordInput
          type="password"
          value={enteredInfo.password}
          handleInputChange={handleInputChange}
        />
        <EmailPasswordInput
          type="passwordConfirm"
          value={enteredInfo.passwordConfirm}
          password={enteredInfo.password}
          handleInputChange={handleInputChange}
        />
      </div>
      <div className={`mt-[49px] ml-auto mr-[45px]`}>
        <Button>회원가입</Button>
      </div>
    </form>
  );
}
