"use client";

import { todoApi } from "@/api/todoApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import Comments from "@/components/PageComponents/detailPage/Comments";
import TodoDetail from "@/components/PageComponents/detailPage/TodoDetail";
import { QueryContext } from "@/context/QueryContextProvider";
import useGetFetch from "@/hooks/useGetFetch";
import { Todo } from "@/types/model/todo";
import { useContext } from "react";

type DetailPageProps = {
  params: {
    id: string;
  };
};

export default function DetailPage({ params: { id } }: DetailPageProps) {
  const { totalData } = useContext(QueryContext);
  const { isLoading, isError } = useGetFetch<Todo>({
    queryKey: `todo_${id}`,
    queryFn: todoApi.getTodo(+id),
  });

  if (isError) return <div>{`${isError}`}</div>;

  const todo = totalData && totalData[`todo_${id}`];

  return (
    <section className="mt-10 flex flex-col items-center">
      {isLoading ? (
        <div className="flex items-center h-[80vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <TodoDetail todo={todo} />
          <Comments />
        </>
      )}
    </section>
  );
}
