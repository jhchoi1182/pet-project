import React from "react";
import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next.js TODO 리스트 만들기",
    template: "Next.js TODO 리스트 만들기 | %s",
  },
  description: "필사즉생 필생즉사 스터디 모임 과제",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="w-[1200px] mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
