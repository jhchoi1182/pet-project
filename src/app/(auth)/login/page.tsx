"use client";

import Button from "@/components/base/Button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import authService from "@/service/authService";
import AuthInput from "@/components/PageComponents/authPage/AuthInput";
import GuestLoginText from "@/components/PageComponents/authPage/GuestLoginText";

export default function Login() {
  const [enteredInfo, setEnteredInfo] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { handleUserLogin, handleGuestLogin } = authService(router);

  const { username, password } = enteredInfo;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUserLogin({ username, password });
  };

  return (
    <form
      className="w-[500px] px-16 py-10 bg-slate-300 rounded-xl shadow-md"
      onSubmit={onSubmitHandler}
    >
      <h1 className="flex justify-center mb-12 text-4xl font-bold">Todo</h1>
      <div className="flex flex-col items-center gap-10">
        <AuthInput
          variant="login"
          type="username"
          value={username}
          onChangeHandler={onChangeHandler}
        />
        <AuthInput
          variant="login"
          type="password"
          value={password}
          onChangeHandler={onChangeHandler}
        />
      </div>
      <div className="flex justify-between mt-14">
        <Button size="big">로그인</Button>
        <Button size="big" type="button" onClick={() => router.push("/signup")}>
          회원가입
        </Button>
      </div>
      <GuestLoginText handleGuestLogin={handleGuestLogin} />
    </form>
  );
}
