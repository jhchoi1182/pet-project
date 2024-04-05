import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setInputValue, setSelectedCategory, setSelectedSearchType } from "@/redux/modules/postSlice";
import { RootState } from "@/redux/store/store";
import { UnionOfCategoryAtSearch, UnionOfSearchType } from "@/types/request/post";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useGetPostsController(enabled: boolean) {
  const { currentPage, selectedCategory, selectedSearchType, inputValue } = useSelector(({ postSlice }: RootState) => postSlice);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedCategory = (sessionStorage.getItem("selectedCategory") as UnionOfCategoryAtSearch) ?? "전체";
    const selectedSearchType = (sessionStorage.getItem("selectedSearchType") as UnionOfSearchType) ?? "제목+내용";
    const inputValue = sessionStorage.getItem("inputValue") ?? "";
    dispatch(setSelectedCategory(selectedCategory));
    dispatch(setSelectedSearchType(selectedSearchType));
    dispatch(setInputValue(inputValue));
    setIsReady(true);
  }, []);

  const {
    data,
    isLoading: isQueryLoading,
    refetch,
  } = useQuery<PostsResponse>({
    queryKey: [QUERY_KEY.posts, currentPage],
    queryFn: () => postApi.search(selectedCategory, selectedSearchType, inputValue, currentPage - 1),
    enabled: isReady && enabled,
    staleTime: 60 * 1000,
  });

  const isLoading = !isReady || isQueryLoading;

  return { data, isLoading, refetch };
}

export function usePrefetchPosts() {
  const { selectedCategory, selectedSearchType, inputValue } = useSelector(({ postSlice }: RootState) => postSlice);
  const queryClient = useQueryClient();

  return (page: number) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEY.posts, page],
      queryFn: () => postApi.search(selectedCategory, selectedSearchType, inputValue, page - 1),
      staleTime: 60 * 1000,
    });
  };
}
