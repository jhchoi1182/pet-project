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
    default: "StudySync",
    template: "[StudySync] | %s",
  },
  description: "공부를 주제로 잡다한 이야기를 나누는 커뮤니티.",
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
