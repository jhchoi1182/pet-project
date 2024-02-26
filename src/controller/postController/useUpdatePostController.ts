import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface MutateParameter {
  title: string;
  contents: string;
}

function useUpdatePostController(postId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, contents }: MutateParameter) => postApi.update(postId, title, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.post, postId] });
    },
  });
}

export default useUpdatePostController;
