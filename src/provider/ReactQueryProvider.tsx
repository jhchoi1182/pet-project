"use client";

import useHandleError from "@/service/useHandleError";
import { isRemovedNicknameCookieAtom, loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const { handleError } = useHandleError();
  const loggedInNickname = useRecoilValue(loggedInNicknameAtom);
  const isRemovedNicknameCookie = useSetRecoilState(isRemovedNicknameCookieAtom);

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        handleError(error);
      },
    }),
    mutationCache: new MutationCache({
      onSuccess: (_) => {
        if (loggedInNickname) return;
        isRemovedNicknameCookie(true);
      },
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
