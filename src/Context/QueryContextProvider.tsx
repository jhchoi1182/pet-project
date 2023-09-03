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
  totalData: TotalData | undefined;
  setTotalData: React.Dispatch<React.SetStateAction<TotalData | undefined>>;
  prevTotalData: TotalData | undefined;
  setPrevTotalData: React.Dispatch<React.SetStateAction<TotalData | undefined>>;
};

export const QueryContext = createContext<QueryContext>({
  totalData: undefined,
  setTotalData: () => {},
  prevTotalData: undefined,
  setPrevTotalData: () => {},
});

export default function QueryContextProvider({ children }: ChildrenProps) {
  const [totalData, setTotalData] = useState<TotalData | undefined>(undefined);
  const [prevTotalData, setPrevTotalData] = useState<TotalData | undefined>(
    undefined,
  );

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
