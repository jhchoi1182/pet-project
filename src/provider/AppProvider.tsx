"use client";

import React from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { Provider } from "react-redux";
import { store } from "@/stores/store/store";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <ReactQueryProvider>
          {children}
          <div id="portal"></div>
        </ReactQueryProvider>
      </Provider>
    </>
  );
}
