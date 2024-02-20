import React from "react";
import Header from "@/components/Header";
import ReactQueryProvider from "@/provider/ReactReactQueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-[1200px] mx-auto">
      <Header />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </main>
  );
}
