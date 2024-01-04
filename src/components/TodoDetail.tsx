"use client";

import React from "react";
import Button from "./base/Button";
import { Todo } from "@/model/todo";
import { useRouter } from "next/navigation";

export default function TodoDetail({ todo }: { todo: Todo }) {
  const router = useRouter();

  return (
    <div className="w-[80%] border-2 border-teal-500 p-10 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold">날짜: {todo.date}</h1>
        <div className="flex gap-7">
          <Button variant="update" size="small">
            수정
          </Button>
          <Button variant="delete" size="small">
            삭제
          </Button>
          <Button size="small" onClick={() => router.back()}>
            뒤로가기
          </Button>
        </div>
      </div>
      <div className="mt-20 mb-10">
        <p>{todo.contents}</p>
      </div>
    </div>
  );
}
