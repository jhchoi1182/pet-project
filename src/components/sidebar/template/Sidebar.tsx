"use client";

import React from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { loginModalAtom } from "@/stateStore/commonAtom";
import AuthModal from "../../loginSignup/template/AuthModal";
import Logo from "../../atoms/Logo";
import UsernameOrLoginButton from "../organisms/UsernameOrLoginButton";
import PostForm from "../molecules/PostForm";

export default function Sidebar() {
  const activeLoginModal = useRecoilValue(loginModalAtom);

  return (
    <section className={`flex flex-col items-center w-[28%] h-full`}>
      <Link href={`/home`} className="mt-16">
        <Logo />
      </Link>
      <UsernameOrLoginButton />
      <PostForm />
      {activeLoginModal && <AuthModal />}
    </section>
  );
}
