import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { commentsAtom } from "@/stateStore/commentAtom";
import { Comment } from "@/types/model/comment";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function useGetCommentsController(postId: number) {
  const [comments, setComments] = useRecoilState(commentsAtom);

  const { data } = useQuery<Comment[]>({
    queryKey: [QUERY_KEY.comments, postId],
    queryFn: () => commentApi.get(postId),
  });

  useEffect(() => {
    if (!data) return;
    setComments(data);
  }, [data]);

  return { comments };
}

export default useGetCommentsController;
