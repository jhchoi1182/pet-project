"use client";

import { useContext, useState } from "react";
import Button from "../../base/Button";
import { Todo } from "@/types/model/todo";
import { useRouter } from "next/navigation";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import { todoApi } from "@/api/todoApi";
import useTodoFormDate from "@/hooks/useTodoFormDate";
import { QueryContext } from "@/context/QueryContextProvider";

export default function TodoDetail({ todo: { todoId, contents, dueDate } }: { todo: Todo }) {
  const { setTotalData } = useContext(QueryContext);
  const [{ contents: editableContents, dueDate: editableDueDate }, setEditableTodo] = useState({
    contents,
    dueDate,
  });
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const { onChangeHandler } = useTodoFormDate(setEditableTodo);
  const router = useRouter();

  const { mutate: updateMutate } = useUpdateFetch({
    queryKey: `todo_${todoId}`,
    queryFn: () => todoApi.modify(todoId, editableContents, editableDueDate),
    onSuccess: (data) => {
      setTotalData((prev) => ({
        ...prev,
        [`todo_${todoId}`]: data,
      }));
    },
  });
  const { mutate: deleteMutate } = useUpdateFetch({
    queryKey: `todo_${todoId}`,
    queryFn: () => todoApi.delete(todoId),
    onSuccess: () => {
      router.push("/todo");
    },
  });

  const handleUpdate = () => {
    updateMutate();
    setToggleEditMode(false);
  };
  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteMutate(todoId);
    }
  };

  return (
    <section className="w-[80%] border-2 border-teal-500 p-10 rounded-xl">
      <header className="flex justify-between items-center">
        <time className="font-bold">
          <span>목표 날짜:</span>
          <div>
            {toggleEditMode ? (
              <input
                type="date"
                name="dueDate"
                value={editableDueDate}
                onChange={onChangeHandler}
              />
            ) : (
              dueDate
            )}
          </div>
        </time>
        <div className="flex gap-7">
          {toggleEditMode ? (
            <Button variant="update" size="small" onClick={handleUpdate}>
              완료
            </Button>
          ) : (
            <Button variant="update" size="small" onClick={() => setToggleEditMode(true)}>
              수정
            </Button>
          )}
          <Button variant="delete" size="small" onClick={handleDelete}>
            삭제
          </Button>
          <Button size="small" onClick={() => router.push("/todo")}>
            뒤로가기
          </Button>
        </div>
      </header>
      <article className={"mt-14 mb-10"}>
        {toggleEditMode ? (
          <textarea
            className="border w-full h-32"
            name="contents"
            value={editableContents}
            onChange={onChangeHandler}
            required
          />
        ) : (
          <p className="whitespace-pre-wrap">{contents}</p>
        )}
      </article>
    </section>
  );
}
