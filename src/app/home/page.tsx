"use client";

import BoardLoadingSpinner from "@/components/atoms/BoardLoadingSpinner";
import PaginationNumGroup from "@/components/postBoard/molecules/PaginationNumGroup";
import PostList from "@/components/postBoard/molecules/PostList";
import usePostsController from "@/controller/posrController/usePostsController";
import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = usePostsController(currentPage - 1);
  const { content = [], totalPages = 0 } = data ?? {};

  return (
    <main className={`w-[72%] min-w-[1098px] h-full`}>
      <nav className={`h-nav ${FONT_VARIANTS.body02}`}>
        <ul className={`h-full`}>
          <li className={`flex justify-center items-center w-[12%] h-full rounded-t-[20px] ${BG_COLOR.inverse}`}>쉼터</li>
        </ul>
      </nav>
      <section className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] ${BG_COLOR.inverse} ${FONT_VARIANTS.body03}`}>
        <header className={`flex items-center w-full h-[10%] font-semibold border-b-[1px] border-black`}>
          <div className={`w-[70%] text-center`}>제목</div>
          <div className={`w-[15%] text-center`}>작성자</div>
          <div className={`w-[15%] text-center`}>작성일</div>
        </header>
        <PostList posts={content} />
      </section>
      <PaginationNumGroup currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </main>
  );
}
