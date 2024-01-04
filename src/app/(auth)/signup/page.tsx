"use client";

import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Signup() {
  const router = useRouter();

  return (
    <form className="w-[660px] px-16 py-10 bg-slate-300 rounded-xl shadow-md">
      <h1 className="flex justify-center mb-12 text-4xl font-bold">Todo</h1>
      <div className="flex flex-col items-start gap-10">
        <div className="flex justify-between w-full">
          <Input variant="signup" label="아이디" name="id">
            <Input.TextField variant="login" />
          </Input>
          <Button size="small" type="button" onClick={() => {}}>
            중복 확인
          </Button>
        </div>
        <Input variant="signup" label="비밀번호" name="password">
          <Input.TextField variant="login" />
        </Input>
        <Input variant="signup" label="비밀번호 확인" name="passwordConfirm">
          <Input.TextField variant="login" />
        </Input>
      </div>
      <div className="flex justify-end mt-10">
        <Button size="big" type="button" onClick={() => router.push("/todo")}>
          회원가입
        </Button>
      </div>
      <div className="flex justify-end mt-10">
        <Link href="/login" className="text-sky-500 font-bold">
          로그인 페이지로 이동
        </Link>
      </div>
    </form>
  );
}
