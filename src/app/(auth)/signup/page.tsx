"use client";

import PasswordInput from "@/components/PageComponents/authPage/PasswordInput";
import SignupIdInput from "@/components/PageComponents/authPage/SignupIdInput";
import Button from "@/components/base/Button";
import useAuthService from "@/service/useAuthService";
import Link from "next/link";
import React, { useState } from "react";

export default function Signup() {
  const [isPassDuplication, setIsPassDuplication] = useState(false);
  const [enteredInfo, setEnteredInfo] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const { handleSignup } = useAuthService();

  const { username, password, passwordConfirm } = enteredInfo;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup({ isPassDuplication, username, password, passwordConfirm });
  };

  return (
    <form
      className="w-[660px] px-16 py-10 bg-slate-300 rounded-xl shadow-md"
      onSubmit={onSubmitHandler}
    >
      <h1 className="flex justify-center mb-12 text-4xl font-bold">Todo</h1>
      <div className="flex flex-col items-start gap-10">
        <SignupIdInput
          username={username}
          onChangeHandler={onChangeHandler}
          setIsPassDuplication={setIsPassDuplication}
        />
        <PasswordInput type="password" password={password} onChangeHandler={onChangeHandler} />
        <PasswordInput
          type="passwordConfirm"
          password={password}
          passwordConfirm={passwordConfirm}
          onChangeHandler={onChangeHandler}
        />
      </div>
      <div className="flex justify-end mt-10">
        <Button size="big">회원가입</Button>
      </div>
      <div className="flex justify-end mt-10">
        <Link href="/login" className="text-sky-500 font-bold">
          로그인 페이지로 이동
        </Link>
      </div>
    </form>
  );
}
