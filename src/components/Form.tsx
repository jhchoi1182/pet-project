"use client";

import { TodoContext } from "@/context/TodoContextProvider";
import { Todos } from "@/model/todo";
import { todoApi } from "@/service/api";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import { useContext, useState } from "react";
import Button from "./Button";

const INPUT_STYLE = "rounded-lg h-8 px-3";

export default function Form() {
  const { setTotalTodo } = useContext(TodoContext);
  const [enteredTodo, setEnteredTodo] = useState({ contents: "", date: "" });

  const { mutate } = useUpdateFetch({
    queryKey: "todos",
    queryFn: (todo) => todoApi.postTodo(todo),
    onSuccess: (data) => {
      setTotalTodo((prev: Todos | undefined) => ({
        ...prev,
        todos: data,
      }));
    },
  });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (enteredTodo.contents === "" || enteredTodo.date === "") return;
    const { contents, date } = enteredTodo;
    const todo = {
      contents: contents,
      date: date,
      isDone: false,
    };
    mutate(todo);
    setEnteredTodo({ contents: "", date: "" });
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "date" && isPastDate(value)) {
      alert("과거의 날짜는 선택할 수 없습니다.");
    } else {
      setEnteredTodo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isPastDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate;
  };

  return (
    <form
      className="flex items-center justify-between h-24 bg-slate-300 rounded-md px-5"
      onSubmit={onSubmitHandler}
    >
      <div className="flex items-center gap-3">
        <label className="font-bold" htmlFor="contents">
          내용
        </label>
        <input
          className={INPUT_STYLE}
          id="contents"
          name="contents"
          value={enteredTodo.contents}
          onChange={onChangeHandler}
          required
        />
        <label className="font-bold" htmlFor="date">
          목표 날짜
        </label>
        <input
          className={INPUT_STYLE}
          type="date"
          id="date"
          name="date"
          value={enteredTodo.date}
          onChange={onChangeHandler}
          required
        />
      </div>
      <Button size="small">추가하기</Button>
    </form>
  );
}
