import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex justify-center items-center w-full h-full">{children}</main>;
}
