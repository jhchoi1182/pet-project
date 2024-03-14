import { postApi } from "@/api/postApi";
import useMutationService from "@/service/postService/useMutationService";
import { useMutation } from "@tanstack/react-query";

interface MutateParameter {
  title: string;
  contents: string;
}

function useUpdatePostController(postId: number) {
  const { handleOptimisticUpdate, replaceFreshTitleCacheForPagination, handleRollback } = useMutationService(postId);

  return useMutation({
    mutationFn: ({ title, contents }: MutateParameter) => postApi.update(postId, title, contents),
    onMutate: (variables) => {
      return handleOptimisticUpdate(variables);
    },
    onSuccess(_, variables) {
      replaceFreshTitleCacheForPagination(variables);
    },
    onError: (error, _, context) => {
      handleRollback(context);
    },
  });
}

export default useUpdatePostController;
