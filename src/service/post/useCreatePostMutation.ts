import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { UnionOfCategoryAtCreate } from "@/types/type/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface CreatePostParameter {
  category: UnionOfCategoryAtCreate;
  title: string;
  contents: string;
  images: string[];
}

function useCreatePostMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ category, title, contents, images }: CreatePostParameter) => postApi.create(category, title, contents, images),
    onSuccess: () => {
      alert("작성한 글이 게시되었습니다.");
      router.back();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
    },
  });
}

export default useCreatePostMutation;
