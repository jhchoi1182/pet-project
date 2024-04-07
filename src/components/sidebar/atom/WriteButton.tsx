"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store/store";

export default function WriteButton() {
  const loggedInNickname = useSelector(({ authSlice }: RootState) => authSlice.loggedInNickname);
  const router = useRouter();

  const handleClick = () => {
    if (!loggedInNickname) return alert("권한이 없습니다.");
    router.push(`/write?type=create`);
  };

  return (
    <button onClick={handleClick}>
      <div className={`text-body02 text-inverse`}>게시글 작성하기</div>
    </button>
  );
}
