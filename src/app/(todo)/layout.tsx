import React from "react";
import Header from "@/components/Header";
import QueryConfigContext from "@/context/QueryConfigContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-[1200px] mx-auto">
      <Header />
      <QueryConfigContext>{children}</QueryConfigContext>
    </main>
  );
}
