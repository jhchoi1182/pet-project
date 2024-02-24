"use client";

import TodoCard from "@/components/PageComponents/mainPage/TodoCard";
import { Todo } from "../../../types/model/post";
import TodoForm from "@/components/PageComponents/mainPage/TodoForm";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import useTodos from "@/controller/postController/useGetPostsController";

const FONT_STYLE = "text-2xl font-bold py-6";
const TODOBOX_STYLE = "grid grid-cols-4 gap-5";

export default function Home() {
  const { data, isLoading } = useTodos();

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
