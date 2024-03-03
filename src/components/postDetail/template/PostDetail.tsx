"use client";

import BoardTab from "@/components/atoms/BoardTab";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import React from "react";
import PostDetailSection from "../organisms/PostDetailSection";
import CommentSection from "../organisms/CommentSection";
import { useGetPostController } from "@/controller/postController/useGetPostController";

export default function PostDetail({ id }: { id: string }) {
  const { data, isLoading } = useGetPostController(+id);
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
            <PostDetailSection post={data} />
            <CommentSection postId={+id} />
          </>
        )}
      </article>
    </>
  );
}
