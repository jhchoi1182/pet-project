import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { postAtom } from "@/stateStore/postAtom";
import { Post } from "@/types/model/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

interface MutateParameter {
  title: string;
  contents: string;
}

function useUpdatePostController(postId: number) {
  const queryClient = useQueryClient();
  const setPost = useSetRecoilState(postAtom);

  return useMutation({
    mutationFn: ({ title, contents }: MutateParameter) => postApi.update(postId, title, contents),
    onMutate: ({ title, contents }) => {
      const prevPost = queryClient.getQueryData<Post>([QUERY_KEY.post, postId]);
      setPost((prev) => ({ ...prev, title, contents }));
      queryClient.setQueryData([QUERY_KEY.post, postId], {
        ...prevPost,
        title,
        contents,
      });
      return { prevPost };
    },
    onError: (error, _, context) => {
      if (!context) return;
      if (context?.prevPost) {
        queryClient.setQueryData([QUERY_KEY.post, postId], context.prevPost);
        setPost(context.prevPost);
      }
    },
  });
}

export default useUpdatePostController;
