"use client";

import BoardTab from "@/components/atoms/BoardTab";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import CommentSection from "@/components/postDetail/organisms/CommentSection";
import PostDetailSection from "@/components/postDetail/organisms/PostDetailSection";
import useGetPostController from "@/controller/postController/useGetPostController";
import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";

interface Params {
  params: {
    id: string;
  };
}

export default function PostDetail({ params: { id } }: Params) {
  const { data, isLoading } = useGetPostController(+id);

  return (
    <main className={`relative w-[72%] min-w-[1098px] h-full`}>
      <BoardTab />
      <article className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] px-[56px] py-[67px] ${BG_COLOR.inverse} ${FONT_VARIANTS.body03} overflow-auto`}>
        {isLoading ? (
          <div className={`flex justify-center items-center h-full`}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <PostDetailSection post={data} />
            <CommentSection postId={+id} />
          </>
        )}
      </article>
    </main>
  );
}
