import { Todo } from "@/utils/Context";
import { NextResponse } from "next/server";

export async function postTodo(todo: Todo) {
  const response = await fetch("/api/", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
