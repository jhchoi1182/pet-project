"use client";

import { useState } from "react";
import { createContext } from "react";

type QueryData = Record<string, any>;

type QueryContext = {
  totalData: QueryData;
  setTotalData: React.Dispatch<React.SetStateAction<QueryData>>;
  prevTotalData: QueryData;
  setPrevTotalData: React.Dispatch<React.SetStateAction<QueryData>>;
  refetch: number;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
};

export const QueryContext = createContext<QueryContext>({
  totalData: {},
  setTotalData: () => {},
  prevTotalData: {},
  setPrevTotalData: () => {},
  refetch: 0,
  setRefetch: () => {},
});

export default function QueryContextProvider({ children }: { children: React.ReactNode }) {
  const [totalData, setTotalData] = useState<QueryData>({});
  const [prevTotalData, setPrevTotalData] = useState<QueryData>({});
  const [refetch, setRefetch] = useState(0);

  return (
    <QueryContext.Provider
      value={{
        totalData,
        setTotalData,
        prevTotalData,
        setPrevTotalData,
        refetch,
        setRefetch,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
