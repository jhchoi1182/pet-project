import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface MutateParameter {
  title: string;
  contents: string;
  images: string[];
}

function useUpdatePostController(postId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ title, contents, images }: MutateParameter) => postApi.update(postId, title, contents, images),
    onSuccess() {
      alert("수정이 완료됐습니다.");
      router.back();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts] });
    },
  });
}

export default useUpdatePostController;
