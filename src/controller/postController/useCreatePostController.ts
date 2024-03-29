import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface CreatePostParameter {
  title: string;
  contents: string;
  images: string[];
}

function useCreatePostController() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: ({ title, contents, images }: CreatePostParameter) => postApi.create(title, contents, images),
    onSuccess: () => {
      alert("작성한 글이 게시되었습니다.");
      router.back();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
    },
  });
}

export default useCreatePostController;
