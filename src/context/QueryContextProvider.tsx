"use client";

import { useState } from "react";
import { createContext } from "react";

type QueryData = Record<string, any>;

type QueryContext = {
  totalData: QueryData;
  setTotalData: React.Dispatch<React.SetStateAction<QueryData>>;
  prevTotalData: QueryData;
  setPrevTotalData: React.Dispatch<React.SetStateAction<QueryData>>;
};

export const QueryContext = createContext<QueryContext>({
  totalData: {},
  setTotalData: () => {},
  prevTotalData: {},
  setPrevTotalData: () => {},
});

export default function QueryContextProvider({ children }: { children: React.ReactNode }) {
  const [totalData, setTotalData] = useState<QueryData>({});
  const [prevTotalData, setPrevTotalData] = useState<QueryData>({});

  return (
    <QueryContext.Provider
      value={{
        totalData,
        setTotalData,
        prevTotalData,
        setPrevTotalData,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
