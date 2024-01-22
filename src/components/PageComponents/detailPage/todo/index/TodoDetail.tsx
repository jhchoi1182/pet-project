"use client";

import { useContext, useState } from "react";
import Button from "../../../../base/Button";
import { Todo } from "@/types/model/todo";
import { useRouter } from "next/navigation";
import TodoUpdateButton from "../elements/TodoUpdateButton";
import TodoDeleteButton from "../elements/TodoDeleteButton";
import TodoDetailContent from "../elements/TodoDetailContent";
import { QueryContext } from "@/context/QueryContextProvider";
import useGetFetch from "@/hooks/useGetFetch";
import { todoApi } from "@/api/todoApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import exception from "@/service/exception";

export default function TodoDetail({ todoId }: { todoId: number }) {
  const { totalData } = useContext(QueryContext);
  const todo = totalData[`todo_${todoId}`];

  const [{ contents: editableContents, dueDate: editableDueDate }, setEditableTodo] = useState({
    contents: todo?.contents,
    dueDate: todo?.dueDate,
  });
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const router = useRouter();

  const { isLoading } = useGetFetch<Todo>({
    queryKey: `todo_${todoId}`,
    queryFn: todoApi.getTodo(+todoId),
    onSuccess: (data) => {
      setEditableTodo({ contents: data?.contents, dueDate: data?.dueDate });
    },
    onError: (error) => {
      exception(error);
    },
  });

  const TodoUpdateButtonProps = {
    todoId,
    editableContents,
    editableDueDate,
    toggleEditMode,
    setToggleEditMode,
  };
  const TodoDetailContentProps = {
    editableContents,
    editableDueDate,
    setEditableTodo,
    toggleEditMode,
  };

  const { timeElement, articleElement } = TodoDetailContent({ ...TodoDetailContentProps });

  return (
    <>
      {isLoading || !todo ? (
        <div className="flex justify-center items-center h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="w-[80%] border-2 border-teal-500 p-10 rounded-xl">
          <header className="flex justify-between items-center">
            {timeElement}
            <div className="flex gap-7">
              <TodoUpdateButton {...TodoUpdateButtonProps} />
              <TodoDeleteButton todoId={todoId} />
              <Button size="small" onClick={() => router.push("/todo")}>
                뒤로가기
              </Button>
            </div>
          </header>
          {articleElement}
        </section>
      )}
    </>
  );
}
