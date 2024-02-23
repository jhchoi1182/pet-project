import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreatePostParameter {
  title: string;
  contents: string;
}

function useCreatePostController() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, contents }: CreatePostParameter) => postApi.create(title, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.post] });
    },
  });
}

export default useCreatePostController;
