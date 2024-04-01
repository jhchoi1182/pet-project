"use client";

import { useRouter } from "next/navigation";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";

export default function WriteButton({ accessToken }: { accessToken: RequestCookie | undefined }) {
  const router = useRouter();
  const handleClick = () => {
    if (!accessToken) return alert("권한이 없습니다.");
    router.push(`/write?type=create`);
  };

  return (
    <button onClick={handleClick}>
      <div className={`text-body02 text-inverse`}>게시글 작성하기</div>
    </button>
  );
}
