"use client";

import { useState } from "react";
import { createContext } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

type totalTodo = {
  [key: string]: any;
};

type TodoContext = {
  totalTodo: totalTodo | undefined;
  setTotalTodo: React.Dispatch<React.SetStateAction<totalTodo | undefined>>;
  prevtotalTodo: totalTodo | undefined;
  setPrevtotalTodo: React.Dispatch<React.SetStateAction<totalTodo | undefined>>;
};

export const TodoContext = createContext<TodoContext>({
  totalTodo: undefined,
  setTotalTodo: () => {},
  prevtotalTodo: undefined,
  setPrevtotalTodo: () => {},
});

export default function TodoContextProvider({ children }: ChildrenProps) {
  const [totalTodo, setTotalTodo] = useState<totalTodo | undefined>(undefined);
  const [prevTotalTodo, setPrevTotalTodo] = useState<totalTodo | undefined>(
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
