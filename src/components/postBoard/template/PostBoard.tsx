"use client";

import BoardLoadingSpinner from "@/components/atoms/ui/BoardLoadingSpinner";
import { useGetPostsController } from "@/controller/postController/useGetPostsController";
import React from "react";
import PostList from "../molecules/PostList";
import PaginationNumGroup from "../molecules/PaginationNumGroup";
import Board from "@/components/atoms/ui/Board";

export default function PostBoard() {
  const { data, isLoading } = useGetPostsController(true);
  const { content = [], totalPages = 0 } = data ?? {};

  return (
    <>
      <Board>
        <header className={`flex items-center w-full h-[10%] font-semibold border-b-[1px] border-black`}>
          <div className={`w-[70%] text-center`}>제목</div>
          <div className={`w-[15%] text-center`}>작성자</div>
          <div className={`w-[15%] text-center`}>작성일</div>
        </header>
        {!isLoading ? <PostList posts={content} /> : <BoardLoadingSpinner />}
      </Board>
      <PaginationNumGroup totalPages={totalPages} />
    </>
  );
}
