import React from "react";
import Link from "next/link";
import LoginSignupModal from "../../loginSignup/template/LoginSignupModal";
import Logo from "../../atoms/ui/Logo";
import UsernameOrLoginButton from "../organisms/UsernameOrLoginButton";
import { cookies } from "next/headers";
import SearchInput from "../organisms/SearchInput";
import WriteButton from "../atom/WriteButton";
import CategorySelect from "../atom/CategorySelect";

async function getNickname() {
  return cookies().get("nickname");
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
      <div className={`flex flex-col items-center h-full justify-around`}>
        <WriteButton />
        <CategorySelect />
        <SearchInput />
      </div>
      <LoginSignupModal />
    </section>
  );
}
