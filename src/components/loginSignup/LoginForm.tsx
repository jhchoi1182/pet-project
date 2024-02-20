import { BG_COLOR } from "@/styles/colors";
import React from "react";
import Logo from "../atoms/Logo";
import Input from "../atoms/base/Input";
import Button from "../atoms/base/Button";
import { useSetRecoilState } from "recoil";
import { modalAtom } from "@/libs/atom";
import CloseButton from "./CloseButton";

interface LoginModalProps {
  setToggleLoginSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginModal({ setToggleLoginSignup }: LoginModalProps) {
  return (
    <form
      className={`flex flex-col items-center w-[689px] h-[464px] ${BG_COLOR.navy} rounded-[10px] shadow-xl`}
    >
      <CloseButton />
      <div className={`mt-11`}>
        <Logo />
      </div>
      <div className={`flex flex-col gap-[53px] mt-[55px]`}>
        <Input variant="login" label="아이디" name="id">
          <Input.TextField variant="login" />
        </Input>
        <Input variant="login" label="비밀번호" name="password">
          <Input.TextField variant="login" />
        </Input>
      </div>
      <div className={`flex gap-9 mt-[52px]`}>
        <Button>로그인</Button>
        <Button onClick={() => setToggleLoginSignup(false)}>회원가입</Button>
      </div>
    </form>
  );
}
