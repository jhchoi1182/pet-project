"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { RecoilRoot } from "recoil";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RecoilRoot>
        <Provider store={store}>
          <ReactQueryProvider>
            {children}
            <div id="portal"></div>
          </ReactQueryProvider>
        </Provider>
      </RecoilRoot>
    </>
  );
}
