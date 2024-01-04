import React from "react";
import Header from "@/components/Header";
import Form from "@/components/Form";
import TodoContextProvider from "@/context/TodoContextProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-[1200px] mx-auto">
      <Header />
      <TodoContextProvider>
        <Form />
        {children}
      </TodoContextProvider>
    </main>
  );
}
