"use client";

import TodoCard from "@/components/TodoCard";
import { __getTodo, responseTodo } from "@/service/todo";
import { todoApi } from "@/service/api";
import useGetFetch from "@/util/useGetFetch";
import { useState } from "react";

const FONT_STYLE = "text-2xl font-bold py-6";
const TODOBOX_STYLE = "grid grid-cols-4 gap-5";

export default function Home() {
  const [todos, setTodos] = useState<responseTodo[]>([]);
  const { isLoading, isError } = useGetFetch<responseTodo[]>({
    queryFn: todoApi.getTodo(),
    onSuccess: (data) => {
      setTodos(data);
    },
  });

  console.log(todos);

  if (isError) return <div>{`${isError}`}</div>;

  return (
    <section>
      {isLoading ? (
        <div className="text-center mt-24 text-3xl font-bold">로딩중...</div>
      ) : (
        <>
          <h2 className={FONT_STYLE}>Working.. 🔥</h2>
          <ul className={TODOBOX_STYLE}>
            {todos?.map((todo) => {
              return (
                !todo.isDone && (
                  <TodoCard key={todo._id} todo={todo} setTodos={setTodos} />
                )
              );
            })}
          </ul>
          <h2 className={FONT_STYLE}>Done..! 🎉</h2>
          <ul className={TODOBOX_STYLE}>
            {todos?.map((todo) => {
              return (
                todo.isDone && (
                  <TodoCard key={todo._id} todo={todo} setTodos={setTodos} />
                )
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
