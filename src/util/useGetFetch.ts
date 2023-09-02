import { useState, useEffect } from "react";

interface FetchResult<T> {
  data: T | unknown;
  isLoading: boolean;
  isError: unknown;
}

interface FetchOptions<T> {
  queryFn: Promise<Response>;
  onSuccess?: (data?: T | any) => void;
}

const useGetFetch = <T>({
  queryFn,
  onSuccess,
}: FetchOptions<T>): FetchResult<T> => {
  const [data, setData] = useState<T | unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await queryFn;
        if (!response.ok) {
          throw new Error("네트워크 요청 실패");
        }
        const { todos } = await response.json();
        setData(todos);
        onSuccess && onSuccess(todos);
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
