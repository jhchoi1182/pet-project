se client";

import { postApi } from "@/api/postApi";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useEffect } from "react";
import useHandleError from "../../service/hooks/useHandleError";

function InitializeViewRecordCookie({ hasPostViewRecordCookie }: { hasPostViewRecordCookie: RequestCookie | undefined }) {
  const { handleError } = useHandleError();

  useEffect(() => {
    const initializeViewRecord = async () => {
      if (!hasPostViewRecordCookie) {
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

export default InitializeViewRecordCookie;
