import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { PostsResponse } from "@/types/response/postsResponse";
import { CategoryAtCreate, UnionOfCategoryAtCreate } from "@/types/type/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface MutateParameter {
  category: UnionOfCategoryAtCreate;
  title: string;
  contents: string;
  images: string[];
}

function useUpdatePostMutation(postId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ category, title, contents, images }: MutateParameter) => postApi.update(postId, category, title, contents, images),
    onSuccess(_, { category, title, contents, images }) {
      alert("수정이 완료됐습니다.");
      router.back();
      const currentPage = sessionStorage.getItem("currentPage") ?? 1;
      const selectedCategory = sessionStorage.getItem("selectedCategory") ?? "전체";
      const formattedCategory = CategoryAtCreate[category];
      const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, selectedCategory, +currentPage]);
      const updatedPosts = prevPosts?.content?.map((post) =>
        post.postId === postId ? { ...post, category: formattedCategory, title, contents, images } : post,
      );
      queryClient.setQueryData([QUERY_KEY.posts, selectedCategory, +currentPage], { ...prevPosts, content: updatedPosts });
    },
  });
}

export default useUpdatePostMutation;
