import { postApi } from "@/api/postApi";
import { QUERY_KEY } from "@/config/queyKeyConfig";
import { RootState } from "@/redux/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

interface CreatePostParameter {
  title: string;
  contents: string;
}

function useCreatePostController(
  setEnteredValue: React.Dispatch<
    React.SetStateAction<{
      title: string;
      contents: string;
    }>
  >,
) {
  const queryClient = useQueryClient();
  const currentPage = useSelector(({ postSlice }: RootState) => postSlice.currentPage);
  return useMutation({
    mutationFn: ({ title, contents }: CreatePostParameter) => postApi.create(title, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.posts, currentPage] });
      setEnteredValue({ title: "", contents: "" });
      alert("작성한 글이 게시되었습니다.");
    },
  });
}

export default useCreatePostController;
