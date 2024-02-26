import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { Comment } from "@/types/model/comment";
import { useQuery } from "@tanstack/react-query";

function useGetCommentsController(postId: number) {
  return useQuery<Comment[]>({
    queryKey: [QUERY_KEY.comments, postId],
    queryFn: () => commentApi.get(postId),
  });
}

export default useGetCommentsController;
