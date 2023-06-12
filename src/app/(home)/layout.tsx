"use client";

import React from "react";
import Form from "@/components/Form";
import { useState } from "react";
import { Todo, TodoContext } from "@/utils/Context";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <main>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <Form />
        {children}
      </TodoContext.Provider>
    </main>
  );
}
