"use client";

import TodoCard from "@/components/mainPage/TodoCard";
import { todoApi } from "@/api/todoApi";
import useGetFetch from "@/hooks/useGetFetch";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContextProvider";
import { Todo, Todos } from "../../../types/model/todo";
import TodoForm from "@/components/mainPage/TodoForm";

const FONT_STYLE = "text-2xl font-bold py-6";
const TODOBOX_STYLE = "grid grid-cols-4 gap-5";

export default function Home() {
  const { totalTodo } = useContext(TodoContext);
  const { isLoading, isError } = useGetFetch<Todos>({
    queryKey: "todos",
    queryFn: todoApi.getTodo(),
  });

  if (isError) return <div>DB 연결 실패</div>;

  return (
    <section>
      <TodoForm />
      {isLoading ? (
        <div className="text-center mt-24 text-3xl font-bold">로딩중...</div>
      ) : (
        <>
          <h2 className={FONT_STYLE}>Working.. 🔥</h2>
          <ul className={TODOBOX_STYLE}>
            {totalTodo?.todos?.map((todo: Todo) => {
              return !todo.isDone && <TodoCard key={todo._id} todo={todo} />;
            })}
          </ul>
          <h2 className={FONT_STYLE}>Done..! 🎉</h2>
          <ul className={TODOBOX_STYLE}>
            {totalTodo?.todos?.map((todo: Todo) => {
              return todo.isDone && <TodoCard key={todo._id} todo={todo} />;
            })}
          </ul>
        </>
      )}
    </section>
  );
}
