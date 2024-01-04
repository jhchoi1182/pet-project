"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InfoIcon from "@/components/icons/InfoIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Login() {
  const router = useRouter();

  return (
    <form className="w-[500px] px-16 py-10 bg-slate-300 rounded-xl shadow-md">
      <h1 className="flex justify-center mb-12 text-4xl font-bold">Todo</h1>
      <div className="flex flex-col items-center gap-10">
        <Input variant="login" label="아이디" name="id">
          <Input.TextField variant="login" />
        </Input>
        <Input variant="login" label="비밀번호" name="password">
          <Input.TextField variant="login" />
        </Input>
      </div>
      <div className="flex justify-between mt-14">
        <Button size="big">로그인</Button>
        <Button size="big" type="button" onClick={() => router.push("/signup")}>
          회원가입
        </Button>
      </div>
      <div className="flex justify-end mt-10">
        <Link href="/todo" className="flex items-center gap-2 text-sky-500 font-bold">
          <span>
            <InfoIcon />
          </span>
          <span>게스트 로그인</span>
        </Link>
      </div>
    </form>
  );
}

export default Login;
