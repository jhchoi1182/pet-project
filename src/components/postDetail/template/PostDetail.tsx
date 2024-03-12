"use client";

import BoardTab from "@/components/atoms/BoardTab";
import React from "react";
import PostDetailSection from "../organisms/PostDetailSection";
import CommentSection from "../organisms/CommentSection";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { useGetPostController } from "@/controller/postController/useGetPostController";
import useGetCommentsController from "@/controller/commentController/useGetCommentsController";

export default function PostDetail({ id }: { id: string }) {
  const { post, isLoading } = useGetPostController(+id);
  const { comments } = useGetCommentsController(+id);

  return (
    <>
      <BoardTab />
      <article className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] px-[56px] py-[67px] bg-inverse text-body03 overflow-auto`}>
        {isLoading ? (
          <div className={`flex justify-center items-center h-full`}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <PostDetailSection post={post} />
            <CommentSection postId={+id} comments={comments} />
          </>
        )}
      </article>
    </>
  );
}
