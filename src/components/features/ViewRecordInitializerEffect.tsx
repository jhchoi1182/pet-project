"use client";

import { useEffect } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { postApi } from "@/api/postApi";
import useHandleError from "@/service/hooks/useHandleError";

export default function ViewRecordInitializerEffect({ postViewRecordCookie }: { postViewRecordCookie: RequestCookie | undefined }) {
  const { handleError } = useHandleError();

  useEffect(() => {
    const initializeViewRecord = async () => {
      if (!postViewRecordCookie) {
        try {
          await postApi.setInitialViewRecordCookie();
        } catch (error) {
          handleError(error);
        }
      }
    };
    initializeViewRecord();
  }, []);

  return <></>;
}
