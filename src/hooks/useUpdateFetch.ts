import { TodoContext } from "@/context/TodoContextProvider";
import { useState, useContext } from "react";

interface FetchResult<T> {
  data: T | any;
  isLoading: boolean;
  isError: unknown;
  mutate: (variables: any) => void;
}

interface FetchOptions<T> {
  queryKey: string;
  queryFn: (variables?: any) => Promise<Response>;
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
      const response = await queryFn(variables);
      if (!response.ok) {
        handleRollback();
        const error = await response.json();
        throw new Error(error.message ?? "네트워크 요청 실패");
      }
      const result = await response.json();
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
