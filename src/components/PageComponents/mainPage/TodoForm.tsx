"use client";

import { todoApi } from "@/api/todoApi";
import { useState } from "react";
import Button from "../../base/Button";
import Input from "../../base/Input";
import useTodoInputHandler from "@/hooks/useTodoInputHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoWithoutId } from "@/types/model/todo";

export default function TodoForm() {
  const [{ contents, dueDate }, setEnteredTodo] = useState({ contents: "", dueDate: "" });
  const { onChangeHandler } = useTodoInputHandler(setEnteredTodo);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ contents, dueDate }: TodoWithoutId) => todoApi.post(contents, dueDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contents === "" || dueDate === "") return;
    const todo = {
      contents,
      dueDate,
    };
    mutate(todo);
    setEnteredTodo({ contents: "", dueDate: "" });
  };

  return (
    <form
      className="flex items-center justify-between h-24 bg-slate-300 rounded-md px-5"
      onSubmit={onSubmitHandler}
    >
      <div className="flex items-center gap-10">
        <Input variant="todo" label="내용" name="contents">
          <Input.TextField variant="todo" value={contents} onChange={onChangeHandler} required />
        </Input>
        <Input variant="todo" label="목표 날짜" name="dueDate">
          <Input.TextField
            variant="todo"
            type="date"
            value={dueDate}
            onChange={onChangeHandler}
            required
          />
        </Input>
      </div>
      <Button size="small">추가하기</Button>
    </form>
  );
}
