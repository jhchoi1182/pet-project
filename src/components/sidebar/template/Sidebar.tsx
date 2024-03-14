import React from "react";
import Link from "next/link";
import AuthModal from "../../loginSignup/template/AuthModal";
import Logo from "../../atoms/Logo";
import PostForm from "../molecules/PostForm";
import UsernameOrLoginButton from "../organisms/UsernameOrLoginButton";

export default function Sidebar() {
  return (
    <section className={`flex flex-col items-center w-[28%] h-full`}>
      <Link href={`/home`} className="mt-16">
        <Logo />
      </Link>
      <div className={`h-52 mt-[60px] text-body02`}>
        <UsernameOrLoginButton />
      </div>
      <PostForm />
      <AuthModal />
    </section>
  );
}
