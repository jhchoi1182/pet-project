"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { RecoilRoot } from "recoil";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RecoilRoot>
        <ReactQueryProvider>
          {children}
          <div id="portal"></div>
        </ReactQueryProvider>
      </RecoilRoot>
    </>
  );
}
