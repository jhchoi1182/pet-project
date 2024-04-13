import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setInputValue, setSelectedCategory, setSelectedSearchType } from "@/stores/modules/postSlice";
import { RootState } from "@/stores/store/store";
import { UnionOfCategoryAtSearch, UnionOfSearchType } from "@/types/type/post";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetPostsQuery(enabled: boolean, resetToFirstPage?: boolean) {
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
    queryKey: [QUERY_KEY.posts, selectedCategory, currentPage],
    queryFn: () => postApi.search(selectedCategory, selectedSearchType, inputValue, resetToFirstPage ? 0 : currentPage - 1),
    enabled: isReady && enabled,
    staleTime: 60 * 1000,
    gcTime: 60 * 1000,
  });

  const isLoading = !isReady || isQueryLoading;

  return { data, isLoading, refetch };
}

export default useGetPostsQuery;
