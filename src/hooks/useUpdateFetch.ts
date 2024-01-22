import { QueryContext } from "@/context/QueryContextProvider";
import { ErrorResponse } from "@/types/response/errorResponse";
import { AxiosResponse } from "axios";
import { useState, useContext } from "react";

interface FetchResult<T> {
  data: T | any;
  isLoading: boolean;
  isError: unknown;
  mutate: (variables?: any) => void;
}

interface FetchOptions<T> {
  queryKey: string;
  queryFn: (variables?: any) => Promise<AxiosResponse<any, any>>;
  onSuccess?: (data?: T | any, variables?: any) => void;
  onError?: (error?: unknown, variables?: any) => void;
  optimisticData?: any;
  rollbackOnFail?: boolean;
}

const useUpdateFetch = <T>({
  queryKey,
  queryFn,
  onSuccess,
  onError,
  optimisticData,
  rollbackOnFail,
}: FetchOptions<T>): FetchResult<T> => {
  const { totalData, setTotalData, prevTotalData, setPrevTotalData } = useContext(QueryContext);
  const [data, setData] = useState<T | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<unknown>(null);

  const fetchData = async (variables: any) => {
    setIsLoading(true);
    handleOptimisticUpdate();

    try {
      const { result } = (await queryFn(variables)).data;
      setData(result);
      onSuccess && onSuccess(result, variables);
    } catch (error) {
      setIsError(error);
      onError && onError(error, variables);
      handleRollback();
    }

    setIsLoading(false);
  };

  const handleOptimisticUpdate = () => {
    if (optimisticData) {
      setPrevTotalData(totalData);
      setTotalData((prev) => ({
        ...prev,
        [queryKey]: optimisticData,
      }));
    }
  };

  const handleRollback = () => {
    if (rollbackOnFail) {
      setTotalData(prevTotalData);
    }
  };

  return { data, isLoading, isError, mutate: fetchData };
};

export default useUpdateFetch;
