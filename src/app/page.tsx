"use client";

import { useContext, useEffect } from "react";
import TodoCard from "@/components/TodoCard";
import { __getTodo } from "@/service/todo";
import { TodoContext } from "@/Context/TodoContextProvider";

const FONT_STYLE = "text-2xl font-bold py-6";
const TODOBOX_STYLE = "grid grid-cols-4 gap-5";

export default function Home() {
  const { todos, setTodos, setPrevTodos, isLoading, setIsLoading } = useContext(TodoContext);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const responseTodo = await __getTodo();
        setTodos(responseTodo);
        setPrevTodos(responseTodo);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    };
    fetchTodos();
  }, [setIsLoading, setTodos, setPrevTodos]);

  return (
    <section>
      {isLoading ? (
        <div className="text-center mt-24 text-3xl font-bold">로딩중...</div>
      ) : (
        <>
          <h2 className={FONT_STYLE}>Working.. 🔥</h2>
          <ul className={TODOBOX_STYLE}>
            {todos?.map((todo) => {
              return !todo.isDone && <TodoCard key={todo._id} todo={todo} />;
            })}
          </ul>
          <h2 className={FONT_STYLE}>Done..! 🎉</h2>
          <ul className={TODOBOX_STYLE}>
            {todos?.map((todo) => {
              return todo.isDone && <TodoCard key={todo._id} todo={todo} />;
            })}
          </ul>
        </>
      )}
    </section>
  );
}
