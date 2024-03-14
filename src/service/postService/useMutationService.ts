import { QUERY_KEY } from "@/config/queyKeyConfig";
import { postAtom } from "@/stateStore/postAtom";
import { Post } from "@/types/model/post";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

function useMutationService(postId: number) {
  const queryClient = useQueryClient();
  const setPost = useSetRecoilState(postAtom);

  function handleOptimisticUpdate({ title, contents }: { title: string; contents: string }) {
    const prevPost = queryClient.getQueryData<Post>([QUERY_KEY.post, postId]);
    setPost((prev) => ({ ...prev, title, contents }));
    queryClient.setQueryData([QUERY_KEY.post, postId], {
      ...prevPost,
      title,
      contents,
    });
    return { prevPost };
  }

  function replaceFreshTitleCacheForPagination({ title }: { title: string }) {
    const currentPage = sessionStorage.getItem("currentPage") ?? 1;
    const prevPosts = queryClient.getQueryData<PostsResponse>([QUERY_KEY.posts, +currentPage]);
    const updatedPosts = prevPosts?.content?.map((post) => (post.postId === postId ? { ...post, title } : post));
    queryClient.setQueryData([QUERY_KEY.posts, currentPage], { ...prevPosts, content: updatedPosts });
  }

  function handleRollback(context: { prevPost: Post | undefined } | undefined) {
    if (!context) return;
    if (context?.prevPost) {
      queryClient.setQueryData([QUERY_KEY.post, postId], context.prevPost);
      setPost(context.prevPost);
    }
  }

  return { handleOptimisticUpdate, replaceFreshTitleCacheForPagination, handleRollback };
}

export default useMutationService;
