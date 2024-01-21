import { TodoContext } from "@/context/TodoContextProvider";
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
}

const useGetFetch = <T>({ queryKey, queryFn, onSuccess }: FetchOptions<T>): FetchResult<T> => {
  const { setTotalTodo } = useContext(TodoContext);
  const [data, setData] = useState<T | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<unknown>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const { result } = (await queryFn).data;
        setTotalTodo((prev: any) => ({
          ...prev,
          [queryKey]: result,
        }));
        setData(result);
        onSuccess && onSuccess(result);
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export default useGetFetch;
