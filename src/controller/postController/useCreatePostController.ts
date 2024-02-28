import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { paginationAtom } from "@/stateStore/postAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

interface CreatePostParameter {
  title: string;
  contents: string;
}

function useCreatePostController() {
  const queryClient = useQueryClient();
  const currentPage = useRecoilValue(paginationAtom);
  return useMutation({
    mutationFn: ({ title, contents }: CreatePostParameter) => postApi.create(title, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts, currentPage] });
      alert("작성한 글이 게시되었습니다.");
    },
  });
}

export default useCreatePostController;
