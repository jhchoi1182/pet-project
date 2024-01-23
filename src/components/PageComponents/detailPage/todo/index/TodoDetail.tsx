"use client";

import { useEffect, useState } from "react";
import Button from "../../../../base/Button";
import { Todo } from "@/types/model/todo";
import { useRouter } from "next/navigation";
import TodoUpdateButton from "../elements/TodoUpdateButton";
import TodoDeleteButton from "../elements/TodoDeleteButton";
import TodoDetailContent from "../elements/TodoDetailContent";
import { todoApi } from "@/api/todoApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

export default function TodoDetail({ todoId }: { todoId: number }) {
  const { data, isLoading } = useQuery<Todo>({
    queryKey: ["todo", todoId],
    queryFn: () => todoApi.getTodo(+todoId),
  });
  const { contents, dueDate } = data ?? { contents: "", dueDate: "" };

  const [editableTodo, setEditableTodo] = useState({ contents, dueDate });
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const router = useRouter();

  const TodoUpdateButtonProps = {
    todoId,
    editableTodo,
    toggleEditMode,
    setToggleEditMode,
  };
  const TodoDetailContentProps = {
    editableTodo,
    setEditableTodo,
    toggleEditMode,
  };
  console.log(contents);

  const { timeElement, articleElement } = TodoDetailContent({ ...TodoDetailContentProps });

  useEffect(() => {
    setEditableTodo({ contents, dueDate });
  }, [contents]);

  return (
    <>
      {isLoading ? (
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
