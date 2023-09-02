"use client";

import TodoCard from "@/components/TodoCard";
import { responseTodo } from "@/service/todo";
import { todoApi } from "@/service/api";
import useGetFetch from "@/util/useGetFetch";
import { useContext } from "react";
import { QueryContext } from "@/Context/QueryContextProvider";

const FONT_STYLE = "text-2xl font-bold py-6";
const TODOBOX_STYLE = "grid grid-cols-4 gap-5";

export default function Home() {
  const { totalData } = useContext(QueryContext);
  const { isLoading, isError } = useGetFetch<responseTodo[]>({
    queryKey: "todo",
    queryFn: todoApi.getTodo(),
  });

  if (isError) return <div>{`${isError}`}</div>;

  return (
    <section>
      {isLoading ? (
        <div className="text-center mt-24 text-3xl font-bold">로딩중...</div>
      ) : (
        <>
          <h2 className={FONT_STYLE}>Working.. 🔥</h2>
          <ul className={TODOBOX_STYLE}>
            {totalData?.todo?.map((todo: responseTodo) => {
              return !todo.isDone && <TodoCard key={todo._id} todo={todo} />;
            })}
          </ul>
          <h2 className={FONT_STYLE}>Done..! 🎉</h2>
          <ul className={TODOBOX_STYLE}>
            {totalData?.todo?.map((todo: responseTodo) => {
              return todo.isDone && <TodoCard key={todo._id} todo={todo} />;
            })}
          </ul>
        </>
      )}
    </section>
  );
}
