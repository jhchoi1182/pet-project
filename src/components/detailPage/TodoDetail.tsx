"use client";

import React from "react";
import Button from "../base/Button";
import { Todo } from "@/types/model/todo";
import { useRouter } from "next/navigation";

export default function TodoDetail({ todo }: { todo: Todo }) {
  const router = useRouter();

  return (
    <section className="w-[80%] border-2 border-teal-500 p-10 rounded-xl">
      <header className="flex justify-between items-center">
        <time className="font-bold">목표 날짜: {todo.date}</time>
        <div className="flex gap-7">
          <Button variant="update" size="small">
            수정
          </Button>
          <Button variant="delete" size="small">
            삭제
          </Button>
          <Button size="small" onClick={() => router.push("/todo")}>
            뒤로가기
          </Button>
        </div>
      </header>
      <article className="mt-20 mb-10">
        <p>{todo.contents}</p>
      </article>
    </section>
  );
}
