import { postApi } from "@/api/postApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface CreatePostParameter {
  title: string;
  contents: string;
  images: string[];
}

function useCreatePostController() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ title, contents, images }: CreatePostParameter) => postApi.create(title, contents, images),
    onSuccess: () => {
      alert("작성한 글이 게시되었습니다.");
      router.back();
    },
  });
}

export default useCreatePostController;
