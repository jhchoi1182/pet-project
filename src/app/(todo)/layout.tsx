import React from "react";
import Header from "@/components/Header";
import QueryContextProvider from "@/context/QueryContextProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-[1200px] mx-auto">
      <Header />
      <QueryContextProvider>{children}</QueryContextProvider>
    </main>
  );
}
