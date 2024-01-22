"use client";

import { useState } from "react";
import Button from "../../../../base/Button";
import { Todo } from "@/types/model/todo";
import { useRouter } from "next/navigation";
import TodoUpdateButton from "../elements/TodoUpdateButton";
import TodoDeleteButton from "../elements/TodoDeleteButton";
import TodoDetailContent from "../elements/TodoDetailContent";

export default function TodoDetail({ todo: { todoId, contents, dueDate } }: { todo: Todo }) {
  const [{ contents: editableContents, dueDate: editableDueDate }, setEditableTodo] = useState({
    contents,
    dueDate,
  });
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const router = useRouter();

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
  );
}
