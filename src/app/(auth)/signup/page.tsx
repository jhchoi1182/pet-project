"use client";

import AuthInput from "@/components/PageComponents/authPage/AuthInput";
import SignupIdInput from "@/components/PageComponents/authPage/SignupIdInput";
import Button from "@/components/base/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signup() {
  const [isPassDuplication, setIsPassDuplication] = useState(false);
  const [enteredInfo, setEnteredInfo] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const router = useRouter();

  const { username, password, passwordConfirm } = enteredInfo;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const auth = (await import("@/service/authService")).default;
    const { handleSignup } = auth(router);
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
        <AuthInput
          variant="signup"
          type="password"
          value={password}
          onChangeHandler={onChangeHandler}
        />
        <AuthInput
          variant="signup"
          type="passwordConfirm"
          value={passwordConfirm}
          password={password}
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
