import { postApi } from "@/api/postApi";
import { studySyncServerURL } from "@/config/envConfig";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { Post } from "@/types/model/post";
import { useQuery } from "@tanstack/react-query";

export function useGetPostController(postId: number) {
  return useQuery<Post>({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => postApi.getPost(postId),
  });
}

export async function fetchPostServerSide(id: string): Promise<Post> {
  try {
    const response = await fetch(studySyncServerURL + `/post/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const { result } = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts");
  }
}
