"use client";

import PaginationNumGroup from "@/components/postBoard/molecules/PaginationNumGroup";
import usePostsController from "@/controller/posrController/usePostsController";
import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = usePostsController(currentPage - 1);
  const { content, totalPages = 0 } = data ?? {};

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
        <ul className={`w-full h-full`}>
          {content?.map(({ postId, title, nickname, commentsCount, createdAt }, i) => (
            <li key={postId} className={`flex items-center w-full h-[10%] ${i % 2 === 1 ? "" : BG_COLOR.gray400} ${i === content?.length - 1 ? "rounded-b-[20px]" : ""}`}>
              <div className={`w-[70%] text-center`}>{`${title} ${commentsCount !== 0 ? `[${commentsCount}]` : ``}`}</div>
              <div className={`w-[15%] text-center`}>{nickname}</div>
              <div className={`w-[15%] text-center`}>{createdAt}</div>
            </li>
          ))}
        </ul>
      </section>
      <PaginationNumGroup currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </main>
  );
}
