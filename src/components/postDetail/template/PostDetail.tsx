"use client";

import BoardTab from "@/components/atoms/ui/BoardTab";
import React from "react";
import PostDetailSection from "../organisms/PostDetailSection";
import CommentSection from "../organisms/CommentSection";
import LoadingSpinner from "@/components/atoms/ui/LoadingSpinner";
import useGetPostQuery from "@/service/post/useGetPostQuery";
import useGetCommentsQuery from "@/service/comment/useGetCommentsQuery";
import Board from "@/components/atoms/ui/Board";
import useUpdatePostViewMutation from "@/service/post/useUpdatePostViewMutation";

export default function PostDetail({ id }: { id: string }) {
  const { data: viewCount } = useUpdatePostViewMutation(+id);
  const { data, isLoading } = useGetPostQuery(+id);
  const { comments } = useGetCommentsQuery(+id);

  return (
    <>
      <BoardTab />
      <Board className={`px-[56px] py-[67px] overflow-auto`}>
        {isLoading ? (
          <div className={`flex justify-center items-center h-full`}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <PostDetailSection post={data} viewCount={viewCount} />
            <CommentSection postId={+id} comments={comments} />
          </>
        )}
      </Board>
    </>
  );
}
