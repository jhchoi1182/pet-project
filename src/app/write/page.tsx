"use client";

import Board from "@/components/atoms/ui/Board";
import BoardTab from "@/components/atoms/ui/BoardTab";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../styles/ckeditor.css";
import dynamic from "next/dynamic";
import PostDetailButton from "@/components/postDetail/atom/PostDetailButton";
const PostEditor = dynamic(() => import("@/components/write/PostEditor"), { ssr: false });

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!window.confirm("글을 게시하시겠습니까?")) return;
    console.log(title);
    console.log(content);
  };

  useEffect(() => {
    if (type === "create") return;
  }, []);

  return (
    <main className={`relative w-[72%] min-w-[1098px] h-full`}>
      <BoardTab />
      <Board className={`p-14`}>
        <form className={`h-full`} onSubmit={handleSubmit}>
          <div className={`flex justify-between mb-10`}>
            <div className="w-[70%]">
              <input
                className={`w-full px-1 pb-3 border-b-2 text-xl focus:outline-none`}
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-8">
              <PostDetailButton type="button" onClick={() => router.back()}>
                뒤로가기
              </PostDetailButton>
              <PostDetailButton>완료</PostDetailButton>
            </div>
          </div>
          <PostEditor content={content} setContent={setContent} />
        </form>
      </Board>
    </main>
  );
}
