"use client";

import React from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { isLoadingAtom, isSocialLoginInProgressAtom, loginModalAtom } from "@/stateStore/commonAtom";
import AuthModal from "../../loginSignup/template/AuthModal";
import Logo from "../../atoms/Logo";
import PostForm from "../molecules/PostForm";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
const UsernameOrLoginButton = dynamic(() => import("../organisms/UsernameOrLoginButton"), { ssr: false });

export default function Sidebar() {
  const activeLoginModal = useRecoilValue(loginModalAtom);
  const isLoading = useRecoilValue(isLoadingAtom);
  const isSocialLoginInProgress = useRecoilValue(isSocialLoginInProgressAtom);

  return (
    <section className={`flex flex-col items-center w-[28%] h-full`}>
      <Link href={`/home`} className="mt-16">
        <Logo />
      </Link>
      <div className={`h-52 mt-[60px] text-body02`}>
        {isLoading && (
          <div className="mt-6">
            <LoadingSpinner />
          </div>
        )}
        {!isSocialLoginInProgress && <UsernameOrLoginButton />}
      </div>
      <PostForm />
      {activeLoginModal && <AuthModal />}
    </section>
  );
}
