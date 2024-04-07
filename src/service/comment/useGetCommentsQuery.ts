import { commentApi } from "@/api/commentApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setComments } from "@/stores/modules/commentSlice";
import { RootState } from "@/stores/store/store";
import { Comment } from "@/types/model/comment";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetCommentsQuery(postId: number) {
  const comments = useSelector(({ commentSlice }: RootState) => commentSlice.comments);
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery<Comment[]>({
    queryKey: [QUERY_KEY.comments, postId],
    queryFn: () => commentApi.get(postId),
  });

  useEffect(() => {
    if (!data) return;
    dispatch(setComments(data));
  }, [data]);

  return { comments, isLoading };
}

export default useGetCommentsQuery;
