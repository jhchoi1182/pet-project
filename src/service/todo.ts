import { NextResponse } from "next/server";

export interface requestTodo {
  title: string;
  contents: string;
}

export async function getTodo() {
  const response = await fetch("/api/");

  const data = await response.json();
  console.log(data.todos);

  return data.todos;
}

export async function postTodo(data: requestTodo) {
  const todo = { ...data, isDone: false };
  const response = await fetch("/api/", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  return NextResponse.json(res);
}
