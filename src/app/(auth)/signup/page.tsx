"use client";

import { authApi } from "@/api/authApi";
import SignupIdInput from "@/components/authPage/SignupIdInput";
import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import Link from "next/link";
import React, { useState } from "react";

export default function Signup() {
  const [enteredInfo, setEnteredInfo] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const { username, password, passwordConfirm } = enteredInfo;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await authApi.signup(username, password, passwordConfirm);
  };

  return (
    <form
      className="w-[660px] px-16 py-10 bg-slate-300 rounded-xl shadow-md"
      onSubmit={onSubmitHandler}
    >
      <h1 className="flex justify-center mb-12 text-4xl font-bold">Todo</h1>
      <div className="flex flex-col items-start gap-10">
        <SignupIdInput username={username} onChangeHandler={onChangeHandler} />
        <Input variant="signup" label="비밀번호" name="password">
          <Input.TextField
            variant="login"
            type="password"
            value={password}
            onChange={onChangeHandler}
            required
          />
        </Input>
        <Input variant="signup" label="비밀번호 확인" name="passwordConfirm">
          <Input.TextField
            variant="login"
            type="password"
            value={passwordConfirm}
            onChange={onChangeHandler}
            required
          />
        </Input>
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
