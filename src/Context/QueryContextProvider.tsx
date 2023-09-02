"use client";

import { useState } from "react";
import { createContext } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

type TotalData = {
  [key: string]: any;
};

type QueryContext = {
  totalData: TotalData | null;
  setTotalData: React.Dispatch<React.SetStateAction<TotalData | null>>;
  prevTotalData: TotalData | null;
  setPrevTotalData: React.Dispatch<React.SetStateAction<TotalData | null>>;
};

export const QueryContext = createContext<QueryContext>({
  totalData: null,
  setTotalData: () => {},
  prevTotalData: null,
  setPrevTotalData: () => {},
});

export default function QueryContextProvider({ children }: ChildrenProps) {
  const [totalData, setTotalData] = useState<TotalData | null>(null);
  const [prevTotalData, setPrevTotalData] = useState<TotalData | null>(null);

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
