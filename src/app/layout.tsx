import React from "react";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { BG_COLOR } from "@/styles/colors";
import Sidebar from "@/components/Sidebar";
import StudySyncProvider from "@/provider/StudySyncProvider";
import { FONT_VARIANTS } from "@/styles/fonts";

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
    <html lang="en" className={`${BG_COLOR.navy} ${inter.className}`}>
      <body className={`flex w-full h-screen min-w-[1920px] min-h-[800px] py-[76px]`}>
        <StudySyncProvider>
          <Sidebar />
          {children}
        </StudySyncProvider>
      </body>
    </html>
  );
}
