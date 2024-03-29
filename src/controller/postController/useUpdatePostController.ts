import { postApi } from "@/api/postApi";
import useMutationService from "@/service/postService/useMutationService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface MutateParameter {
  title: string;
  contents: string;
  images: string[];
}

function useUpdatePostController(postId: number) {
  const router = useRouter();
  const { replaceFreshTitleCacheForPagination } = useMutationService(postId);

  return useMutation({
    mutationFn: ({ title, contents, images }: MutateParameter) => postApi.update(postId, title, contents, images),
    onSuccess(_, variables) {
      replaceFreshTitleCacheForPagination(variables);
      alert("수정이 완료됐습니다.");
      router.back();
    },
  });
}

export default useUpdatePostController;
