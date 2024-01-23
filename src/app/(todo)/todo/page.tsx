"use client";

import TodoCard from "@/components/PageComponents/mainPage/TodoCard";
import { todoApi } from "@/api/todoApi";
import { Todo } from "../../../types/model/todo";
import TodoForm from "@/components/PageComponents/mainPage/TodoForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const FONT_STYLE = "text-2xl font-bold py-6";
const TODOBOX_STYLE = "grid grid-cols-4 gap-5";

export default function Home() {
  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => todoApi.getTodos(),
  });

  return (
    <section>
      <TodoForm />
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <h2 className={FONT_STYLE}>Working.. 🔥</h2>
          <ul className={TODOBOX_STYLE}>
            {data?.map((todo: Todo) => {
              return !todo.isDone && <TodoCard key={todo.todoId} todo={todo} />;
            })}
          </ul>
          <h2 className={FONT_STYLE}>Done..! 🎉</h2>
          <ul className={TODOBOX_STYLE}>
            {data?.map((todo: Todo) => {
              return todo.isDone && <TodoCard key={todo.todoId} todo={todo} />;
            })}
          </ul>
        </>
      )}
    </section>
  );
}
