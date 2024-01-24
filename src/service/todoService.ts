import { TodoWithoutId } from "@/types/model/todo";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SetStateTodoInput = React.Dispatch<React.SetStateAction<TodoWithoutId>>;
type Mutate = UseMutateFunction<AxiosResponse<any, any>, Error, void, unknown>;
interface HandlePostParametor {
  enteredTodo: TodoWithoutId;
  setEnteredTodo: React.Dispatch<
    React.SetStateAction<{
      contents: string;
      dueDate: string;
    }>
  >;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, TodoWithoutId, unknown>;
  event: React.FormEvent<HTMLFormElement>;
}
interface HandleUpdateParametor {
  editableTodo: TodoWithoutId;
  mutate: Mutate;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function todoService() {
  const handlePost = async ({
    enteredTodo: { contents, dueDate },
    setEnteredTodo,
    mutate,
    event,
  }: HandlePostParametor) => {
    event.preventDefault();
    if (contents === "" || dueDate === "") return;
    const todo = {
      contents,
      dueDate,
    };
    mutate(todo);
    setEnteredTodo({ contents: "", dueDate: "" });
  };

  const handleUpdate = ({ editableTodo, mutate, setToggleEditMode }: HandleUpdateParametor) => {
    const { contents, dueDate } = editableTodo;
    if (contents === "" || dueDate === "") return;
    mutate();
    setToggleEditMode(false);
  };

  const handleDelete = (mutate: Mutate) => {
    if (window.confirm("삭제하시겠습니까?")) {
      mutate();
    }
  };

  const handleInputChange = (event: InputEvent, setTodoInput: SetStateTodoInput) => {
    const { name, value } = event.target;
    if (name === "dueDate" && isPastDate(value)) {
      alert("과거의 날짜는 선택할 수 없습니다.");
    } else {
      setTodoInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isPastDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate;
  };

  return { handlePost, handleUpdate, handleDelete, handleInputChange };
}

export default todoService;
