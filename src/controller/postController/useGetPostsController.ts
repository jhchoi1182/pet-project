import { postApi } from "@/api/postApi";
import { searchType } from "@/components/sidebar/molecules/SearchSort";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { setInputValue, setSelectedSearchType } from "@/redux/modules/postSlice";
import { RootState } from "@/redux/store/store";
import { PostsResponse } from "@/types/response/postsResponse";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useGetPostsController(enabled: boolean) {
  const { currentPage, selectedSearchType, inputValue } = useSelector(({ postSlice }: RootState) => postSlice);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedSearchType = sessionStorage.getItem("selectedSearchType") ?? "제목+내용";
    const inputValue = sessionStorage.getItem("inputValue") ?? "";
    dispatch(setSelectedSearchType(selectedSearchType));
    dispatch(setInputValue(inputValue));
    setIsReady(true);
  }, []);

  return useQuery<PostsResponse>({
    queryKey: [QUERY_KEY.posts, currentPage],
    queryFn: () => postApi.search(selectedSearchType as (typeof searchType)[number], inputValue, currentPage - 1),
    enabled: isReady && enabled,
    staleTime: 60 * 1000,
  });
}
