"use client";

import BoardTab from "@/components/atoms/ui/BoardTab";
import React from "react";
import PostDetailSection from "../organisms/PostDetailSection";
import CommentSection from "../organisms/CommentSection";
import LoadingSpinner from "@/components/atoms/ui/LoadingSpinner";
import { useGetPostController } from "@/controller/postController/useGetPostController";
import useGetCommentsController from "@/controller/commentController/useGetCommentsController";
import Board from "@/components/atoms/ui/Board";

export default function PostDetail({ id }: { id: string }) {
  const { data, isLoading } = useGetPostController(+id);
  const { comments } = useGetCommentsController(+id);
  
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
            <PostDetailSection post={data} />
            <CommentSection postId={+id} comments={comments} />
          </>
        )}
      </Board>
    </>
  );
}
