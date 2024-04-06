"use client";

import { setIsRemovedNicknameCookie } from "@/stores/modules/authSlice";
import { RootState } from "@/stores/store/store";
import useHandleError from "@/service/hooks/useHandleError";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const { handleError } = useHandleError();
  const loggedInNickname = useSelector(({ authSlice }: RootState) => authSlice.loggedInNickname);
  const dispatch = useDispatch();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            handleError(error);
          },
        }),
        mutationCache: new MutationCache({
          onSuccess: (_) => {
            if (loggedInNickname) return;
            dispatch(setIsRemovedNicknameCookie(true));
          },
          onError: (error) => {
            handleError(error);
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
