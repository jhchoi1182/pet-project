import { QueryContext } from "@/context/QueryContextProvider";
import { AxiosResponse } from "axios";
import { useState, useEffect, useContext } from "react";

interface FetchResult<T> {
  data: T | any;
  isLoading: boolean;
  isError: unknown;
}

interface FetchOptions<T> {
  queryKey: string;
  queryFn: Promise<AxiosResponse<any, any>>;
  onSuccess?: (data?: T | any) => void;
  onError?: (error?: unknown) => void;
}

const useGetFetch = <T>({
  queryKey,
  queryFn,
  onSuccess,
  onError,
}: FetchOptions<T>): FetchResult<T> => {
  const { setTotalData } = useContext(QueryContext);
  const [data, setData] = useState<T | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<unknown>(null);

  const fetchData = async () => {
    try {
      const { result } = (await queryFn).data;
      setTotalData((prev) => ({
        ...prev,
        [queryKey]: result,
      }));
      setData(result);
      onSuccess && onSuccess(result);
    } catch (error) {
      setIsError(error);
      onError && onError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export default useGetFetch;
