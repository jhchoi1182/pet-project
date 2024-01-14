"use client";

import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import Tooltip from "@/components/Tooltip";
import InfoIcon from "@/components/icons/InfoIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { authApi } from "@/api/authApi";

export default function Login() {
  const [enteredInfo, setEnteredInfo] = useState({
    username: "",
    password: "",
  });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const router = useRouter();

  const { username, password } = enteredInfo;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEnteredInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await authApi.login(username, password);
    const result = await response.json();
    console.log(result);
  };

  return (
    <form
      className="w-[500px] px-16 py-10 bg-slate-300 rounded-xl shadow-md"
      onSubmit={onSubmitHandler}
    >
      <h1 className="flex justify-center mb-12 text-4xl font-bold">Todo</h1>
      <div className="flex flex-col items-center gap-10">
        <Input variant="login" label="아이디" name="username">
          <Input.TextField variant="login" value={username} onChange={onChangeHandler} required />
        </Input>
        <Input variant="login" label="비밀번호" name="password">
          <Input.TextField
            variant="login"
            type="password"
            value={password}
            onChange={onChangeHandler}
            required
          />
        </Input>
      </div>
      <div className="flex justify-between mt-14">
        <Button size="big">로그인</Button>
        <Button size="big" type="button" onClick={() => router.push("/signup")}>
          회원가입
        </Button>
      </div>
      <div className="relative flex justify-end mt-10">
        <Link
          href="/todo"
          className="flex items-center gap-2 text-sky-500 font-bold"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <span>
            <InfoIcon />
          </span>
          <span>게스트 로그인</span>
        </Link>
        {isTooltipVisible && <Tooltip text="개인 계정 대신 공용 계정을 사용합니다." />}
      </div>
    </form>
  );
}
