"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { RecoilRoot } from "recoil";

export default function StudySyncProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <RecoilRoot>
          {children}
          <div id="portal"></div>
        </RecoilRoot>
      </ReactQueryProvider>
    </>
  );
}
