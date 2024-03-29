import React from "react";
import Link from "next/link";
import AuthModal from "../../loginSignup/template/AuthModal";
import Logo from "../../atoms/ui/Logo";
import UsernameOrLoginButton from "../organisms/UsernameOrLoginButton";
import { cookies } from "next/headers";

async function getNickname() {
  const nickname = cookies().get("nickname");
  return nickname;
}

export default async function Sidebar() {
  const nickname = await getNickname();
  return (
    <section className={`flex flex-col items-center w-[28%] h-full`}>
      <Link href={`/home`} className="mt-16">
        <Logo />
      </Link>
      <div className={`h-52 mt-[60px] text-body02`}>
        <UsernameOrLoginButton nickname={nickname} />
      </div>
      <Link href={`/write?type=create`}>
        <div className={`text-body02 text-inverse`}>게시글 작성하기</div>
      </Link>
      <AuthModal />
    </section>
  );
}
