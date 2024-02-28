"use client";

import useHandleError from "@/service/useHandleError";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const { handleError } = useHandleError();

  const handleCacheEvent = (event: any) => {
    if (event?.state?.status === "error") {
      handleError(event.state.error);
    }
  };

  queryClient.getQueryCache().subscribe((query) => handleCacheEvent(query));
  queryClient.getMutationCache().subscribe((mutation) => handleCacheEvent(mutation));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
