"use client";

import useHandleError from "@/service/useHandleError";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const { handleError } = useHandleError();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        handleError(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        handleError(error);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
