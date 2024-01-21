import { TodoContext } from "@/context/TodoContextProvider";
import { AxiosResponse } from "axios";
import { useState, useContext } from "react";

interface FetchResult<T> {
  data: T | any;
  isLoading: boolean;
  isError: unknown;
  mutate: (variables: any) => void;
}

interface FetchOptions<T> {
  queryKey: string;
  queryFn: (variables?: any) => Promise<AxiosResponse<any, any>>;
  onSuccess?: (data?: T | any, variables?: any) => void;
  optimisticData?: any;
  rollbackOnFail?: boolean;
}

const useUpdateFetch = <T>({
  queryKey,
  queryFn,
  onSuccess,
  optimisticData,
  rollbackOnFail,
}: FetchOptions<T>): FetchResult<T> => {
  const { totalTodo, setTotalTodo, prevtotalTodo, setPrevtotalTodo } = useContext(TodoContext);
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
      handleRollback();
    }

    setIsLoading(false);
  };

  const handleOptimisticUpdate = () => {
    if (optimisticData) {
      setPrevtotalTodo(totalTodo);
      setTotalTodo((prev: any) => ({
        ...prev,
        [queryKey]: optimisticData,
      }));
    }
  };

  const handleRollback = () => {
    if (rollbackOnFail) {
      setTotalTodo(prevtotalTodo);
    }
  };

  return { data, isLoading, isError, mutate: fetchData };
};

export default useUpdateFetch;
