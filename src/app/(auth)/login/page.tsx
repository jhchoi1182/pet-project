"use client";

import Button from "@/components/base/Button";
import Input from "@/components/base/Input";
import Tooltip from "@/components/Tooltip";
import InfoIcon from "@/components/icons/InfoIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
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
        {isTooltipVisible && <Tooltip text="데이터베이스 대신 로컬 스토리지를 사용합니다." />}
      </div>
    </form>
  );
}
