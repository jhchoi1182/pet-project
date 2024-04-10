import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { RootState } from "@/stores/store/store";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

function usePrefetchPosts() {
  const { selectedCategory, selectedSearchType, inputValue } = useSelector(({ postSlice }: RootState) => postSlice);
  const queryClient = useQueryClient();

  return (page: number) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.posts, selectedCategory, page],
      queryFn: () => postApi.search(selectedCategory, selectedSearchType, inputValue, page - 1),
    });
  };
}

export default usePrefetchPosts;
