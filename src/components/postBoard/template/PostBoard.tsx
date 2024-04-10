"use client";

import BoardLoadingSpinner from "@/components/atoms/ui/BoardLoadingSpinner";
import useGetPostsQuery from "@/service/post/useGetPostsQuery";
import React from "react";
import PostList from "../molecules/PostList";
import PaginationNumGroup from "../molecules/PaginationNumGroup";
import Board from "@/components/atoms/ui/Board";

export default function PostBoard() {
  const { data, isLoading } = useGetPostsQuery(true);
  const { content = [], totalPages = 0 } = data ?? {};

  return (
    <>
      <Board>
        <header className={`flex items-center w-full h-[10%] pr-[2%] font-semibold border-b-[1px] border-black`}>
          <div className={`w-[10%] text-center`}>분류</div>
          <div className={`w-[49%] text-center`}>제목</div>
          <div className={`w-[15%] text-center`}>작성자</div>
          <div className={`w-[10%] text-center`}>작성일</div>
          <div className={`w-[8%] text-center`}>조회</div>
          <div className={`w-[8%] text-center`}>추천</div>
        </header>
        {isLoading ? <BoardLoadingSpinner /> : <PostList posts={content} />}
      </Board>
      <PaginationNumGroup totalPages={totalPages} />
    </>
  );
}
