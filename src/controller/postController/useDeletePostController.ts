import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useDeletePostController(postId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => postApi.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
      router.back();
    },
  });
}

export default useDeletePostController;
