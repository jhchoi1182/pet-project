import React from "react";
import "../styles/globals.css";
import "../styles/reset.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { BG_COLOR } from "@/styles/colors";
import Sidebar from "@/components/sidebar/template/Sidebar";
import AppProvider from "@/provider/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "진화 중...",
    template: "진화 중... | %s",
  },
  description: "배운 기술을 실제로 적용하며 점진적으로 기능을 추가해 나가는 것을 목표로 진행되고 있는 개인 프로젝트.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${BG_COLOR.navy} ${inter.className}`}>
      <body className={`flex w-full h-screen min-w-[1920px] min-h-[800px] py-[76px]`}>
        <AppProvider>
          <Sidebar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
