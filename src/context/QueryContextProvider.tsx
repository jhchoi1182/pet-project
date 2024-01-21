"use client";

import { useState } from "react";
import { createContext } from "react";

type QueryData = {
  [key: string]: any[];
};

type QueryContext = {
  totalData: QueryData | undefined;
  setTotalData: React.Dispatch<React.SetStateAction<QueryData | undefined>>;
  prevTotalData: QueryData | undefined;
  setPrevTotalData: React.Dispatch<React.SetStateAction<QueryData | undefined>>;
  refetch: number;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
};

export const QueryContext = createContext<QueryContext>({
  totalData: undefined,
  setTotalData: () => {},
  prevTotalData: undefined,
  setPrevTotalData: () => {},
  refetch: 0,
  setRefetch: () => {},
});

export default function QueryContextProvider({ children }: { children: React.ReactNode }) {
  const [totalData, setTotalData] = useState<QueryData | undefined>(undefined);
  const [prevTotalData, setPrevTotalData] = useState<QueryData | undefined>(undefined);
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
