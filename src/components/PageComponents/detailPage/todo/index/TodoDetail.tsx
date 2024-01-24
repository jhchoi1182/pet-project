"use client";

import { useEffect, useState } from "react";
import Button from "../../../../base/Button";
import { useRouter } from "next/navigation";
import TodoUpdateButton from "../elements/TodoUpdateButton";
import TodoDeleteButton from "../elements/TodoDeleteButton";
import TodoDetailContent from "../elements/TodoDetailContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import useTodo from "@/hooks/todoController/useTodo";

export default function TodoDetail({ todoId }: { todoId: number }) {
  const { data, isLoading } = useTodo(todoId);
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
