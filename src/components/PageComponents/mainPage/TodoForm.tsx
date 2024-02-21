"use client";

import { useState } from "react";
import Button from "../../atoms/base/Button";
import Input from "../../atoms/base/Input";

import useTodoPost from "@/controller/todoController/useTodoPost";
import todoService from "@/service/todoService";

export default function TodoForm() {
  const [enteredTodo, setEnteredTodo] = useState({ contents: "", dueDate: "" });
  const { handleInputChange } = todoService();
  const { mutate } = useTodoPost();

  const { handlePost } = todoService();
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleInputChange(event, setEnteredTodo);
  };

  const { contents, dueDate } = enteredTodo;
  const handlePostParameter = {
    enteredTodo,
    setEnteredTodo,
    mutate,
  };

  return (
    <form
      className="flex items-center justify-between h-24 bg-slate-300 rounded-md px-5"
      onSubmit={(event) => handlePost({ ...handlePostParameter, event })}
    >
      <div className="flex items-center gap-10">
        <Input variant="todo" label="내용" name="contents">
          <Input.TextField
            variant="todo"
            value={contents}
            onChange={onChangeHandler}
            required
          />
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
