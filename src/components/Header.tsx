"use client";

import React from "react";
import Button from "./base/Button";
import { cookieUtils } from "@/utils/cookieUtils";
import { useRouter } from "next/navigation";
import authService from "@/service/authService";

const { removeCookie } = cookieUtils();

export default function Header() {
  const router = useRouter();
  const { handleWithdrawal } = authService(router);

  const handleLogout = () => {
    removeCookie();
    router.push("/login");
  };

  return (
    <section className="flex items-center justify-between h-12 border px-5 mb-5">
      <div>My Todo List</div>
      <div className="flex gap-5">
        <Button size="small" onClick={handleLogout}>
          로그아웃
        </Button>
        <Button variant="delete" size="small" onClick={handleWithdrawal}>
          탈퇴
        </Button>
      </div>
    </section>
  );
}
