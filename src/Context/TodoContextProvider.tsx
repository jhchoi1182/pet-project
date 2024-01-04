"use client";

import { Todos } from "@/model/todo";
import { useState } from "react";
import { createContext } from "react";

type TodoContext = {
  totalTodo: Todos | undefined;
  setTotalTodo: React.Dispatch<React.SetStateAction<Todos | undefined>>;
  prevtotalTodo: Todos | undefined;
  setPrevtotalTodo: React.Dispatch<React.SetStateAction<Todos | undefined>>;
};

export const TodoContext = createContext<TodoContext>({
  totalTodo: undefined,
  setTotalTodo: () => {},
  prevtotalTodo: undefined,
  setPrevtotalTodo: () => {},
});

export default function TodoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalTodo, setTotalTodo] = useState<Todos | undefined>(undefined);
  const [prevTotalTodo, setPrevTotalTodo] = useState<Todos | undefined>(
    undefined,
  );

  return (
    <TodoContext.Provider
      value={{
        totalTodo: totalTodo,
        setTotalTodo: setTotalTodo,
        prevtotalTodo: prevTotalTodo,
        setPrevtotalTodo: setPrevTotalTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
