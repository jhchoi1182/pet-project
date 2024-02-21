import { commentApi } from "@/api/commentApi";
import { Comment } from "@/types/model/comment";
import { useQuery } from "@tanstack/react-query";

function useComments(todoId: number) {
  return useQuery<Comment[]>({
    queryKey: ["comment", todoId],
    queryFn: () => commentApi.get(+todoId),
  });
}

export default useComments;
