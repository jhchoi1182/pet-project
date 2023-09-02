import { QueryContext } from "@/Context/QueryContextProvider";
import { useState, useEffect, useContext } from "react";

interface FetchResult<T> {
  data: T | any;
  isLoading: boolean;
  isError: unknown;
}

interface FetchOptions<T> {
  queryKey: string;
  queryFn: Promise<Response>;
  onSuccess?: (data?: T | any) => void;
}

const useGetFetch = <T>({
  queryKey,
  queryFn,
  onSuccess,
}: FetchOptions<T>): FetchResult<T> => {
  const { setTotalData } = useContext(QueryContext);
  const [data, setData] = useState<T | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await queryFn;
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error ?? "네트워크 요청 실패");
        }
        const result = await response.json();
        setTotalData((prev: any) => ({
          ...prev,
          [queryKey]: result,
        }));
        setData(result);
        onSuccess && onSuccess(result);
        setIsLoading(false);
      } catch (error) {
        setIsError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export default useGetFetch;
