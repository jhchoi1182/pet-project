"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Todo, TodoContext } from "@/utils/Context";
import { useState } from "react";
import { Metadata } from "next";
import Form from "@/components/Form";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next.js TODO 리스트 만들기",
    template: "Next.js TODO 리스트 만들기 | %s",
  },
  description: "필사즉생 필생즉사 스터디 모임 과제",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <html lang="en" className={inter.className}>
      <body className="w-[1200px] mx-auto">
        <Header />
        <TodoContext.Provider value={{ todos, setTodos }}>
          <Form />
          {children}
        </TodoContext.Provider>
      </body>
    </html>
  );
}
