import React from "react";
import "../styles/globals.css";
import "../styles/reset.css";
import { Electrolize, Inter, Ubuntu } from "next/font/google";
import { Metadata, Viewport } from "next";
import Sidebar from "@/components/sidebar/template/Sidebar";
import AppProvider from "@/provider/AppProvider";

const inter = Inter({ subsets: ["latin"] });
export const ubuntu = Ubuntu({ weight: "500", subsets: ["latin"] });
const electrolize = Electrolize({ weight: "400", subsets: ["latin"], variable: "--font-electrolize" });

export const metadata: Metadata = {
  applicationName: "StudySync",
  title: {
    default: "StudySync",
    template: "[StudySync] | %s",
  },
  description: "공부를 주제로 잡다한 이야기를 나누는 커뮤니티",
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`bg-navy ${inter.className} ${electrolize.variable}`}>
      <body className={`flex w-full h-screen min-w-[1920px] min-h-[800px] py-[76px]`}>
        <AppProvider>
          <Sidebar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
