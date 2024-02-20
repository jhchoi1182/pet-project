import { BG_COLOR } from "@/styles/colors";
import React from "react";
import Logo from "../atoms/Logo";
import Input from "../atoms/base/Input";
import Button from "../atoms/base/Button";
import Close from "../atoms/icons/Close";
import { useSetRecoilState } from "recoil";
import { modalAtom } from "@/libs/atom";
import CloseButton from "./CloseButton";

interface SignupModalProps {
  setToggleLoginSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignupModal({
  setToggleLoginSignup,
}: SignupModalProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("회원가입 성공!");
    setToggleLoginSignup(true);
  };

  return (
    <form
      className={`flex flex-col items-center w-[689px] h-[622px] ${BG_COLOR.navy} rounded-[10px] shadow-xl`}
      onSubmit={handleSubmit}
    >
      <CloseButton />
      <div className={`mt-11`}>
        <Logo />
      </div>
      <div className={`flex flex-col gap-[50px] mt-[55px]`}>
        <div className={`${inputDivStyle}`}>
          <Input variant="signup" label="아이디" name="id">
            <Input.TextField variant="signup" />
          </Input>
          <Button size="small">중복 확인</Button>
        </div>
        <div className={`${inputDivStyle}`}>
          <Input variant="signup" label="닉네임" name="nickname">
            <Input.TextField variant="signup" />
          </Input>
          <Button size="small">중복 확인</Button>
        </div>
        <Input variant="signup" label="비밀번호" name="password">
          <Input.TextField variant="signup" />
        </Input>
        <Input variant="signup" label="비밀번호 확인" name="passwordConfirm">
          <Input.TextField variant="signup" />
        </Input>
      </div>
      <div className={`mt-[49px] ml-auto mr-[45px]`}>
        <Button>회원가입</Button>
      </div>
    </form>
  );
}

const inputDivStyle = `flex gap-[22px]`;
