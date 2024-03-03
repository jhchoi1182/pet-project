"use client";

import BoardLoadingSpinner from "@/components/atoms/BoardLoadingSpinner";
import BoardTab from "@/components/atoms/BoardTab";
import PaginationNumGroup from "@/components/postBoard/molecules/PaginationNumGroup";
import PostList from "@/components/postBoard/molecules/PostList";
import { useGetPostsController } from "@/controller/postController/useGetPostsController";
import { paginationAtom } from "@/stateStore/postAtom";
import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Home() {
  const [currentPage, setCurrentPage] = useRecoilState(paginationAtom);
  const { data, isLoading } = useGetPostsController(currentPage);
  const { content = [], totalPages = 0 } = data ?? {};

  useEffect(() => {
    const savedCurrentPage = Number(sessionStorage.getItem("currentPage"));
    if (savedCurrentPage) return setCurrentPage(savedCurrentPage);
  }, []);

  return (
    <main className={`w-[72%] min-w-[1098px] h-full`}>
      <BoardTab />
      <section className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] ${BG_COLOR.inverse} ${FONT_VARIANTS.body03}`}>
        <header className={`flex items-center w-full h-[10%] font-semibold border-b-[1px] border-black`}>
          <div className={`w-[70%] text-center`}>제목</div>
          <div className={`w-[15%] text-center`}>작성자</div>
          <div className={`w-[15%] text-center`}>작성일</div>
        </header>
        {isLoading ? <BoardLoadingSpinner /> : <PostList posts={content} />}
      </section>
      <PaginationNumGroup currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
