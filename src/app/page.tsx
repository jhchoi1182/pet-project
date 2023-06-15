"use client";

import { useEffect } from "react";
import TodoCard from "@/components/TodoCard";
import { getTodo } from "@/service/todo";

const FONT_STYLE = "text-2xl font-bold py-6";
const TODOBOX_STYLE = "grid grid-cols-4 gap-5";

export default function Home() {

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <section>
      <h2 className={FONT_STYLE}>Working.. 🔥</h2>
      <ul className={TODOBOX_STYLE}>
        {/* {todos?.map((todo) => {
          return !todo.isDone && <TodoCard key={todo.id} todo={todo} />;
        })} */}
      </ul>
      <h2 className={FONT_STYLE}>Done..! 🎉</h2>
      <ul className={TODOBOX_STYLE}>
        {/* {todos?.map((todo) => {
          return todo.isDone && <TodoCard key={todo.id} todo={todo} />;
        })} */}
      </ul>
    </section>
  );
}
