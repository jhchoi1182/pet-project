"use client";

import MaxPageArrow from "@/components/atoms/icons/MaxPageArrow";
import NextPageArrow from "@/components/atoms/icons/NextPageArrow";
import { BG_COLOR, TEXT_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { useState } from "react";

const pages = Array.from({ length: 13 }, (_, i) => i + 1);
const posts = [
  {
    postId: 1,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
  {
    postId: 2,
    title: "해변 걷다 주운 지갑, 8개월 전 해변서 잃어버린 내 지갑",
    nickname: "정신차려이각박한세상속에서",
    commentsCount: 3,
    registeredAt: "24/02/19",
  },
  {
    postId: 3,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
  {
    postId: 4,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
  {
    postId: 5,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
  {
    postId: 6,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
  {
    postId: 7,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
  {
    postId: 8,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
  {
    postId: 9,
    title: "이것은 제목입니다.",
    nickname: "안녕",
    commentsCount: 3,
    registeredAt: "16:30",
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <main className="w-[72%] min-w-[1098px] h-full">
      <nav className={`h-nav ${FONT_VARIANTS.body02}`}>
        <ul className={`h-full`}>
          <li
            className={`flex justify-center items-center w-[12%] h-full rounded-t-[20px] ${BG_COLOR.inverse}`}
          >
            쉼터
          </li>
        </ul>
      </nav>
      <section
        className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] ${BG_COLOR.inverse} ${FONT_VARIANTS.body03}`}
      >
        <header
          className={`flex items-center w-full h-[10%] font-semibold border-b-[1px] border-black`}
        >
          <div className={`w-[70%] text-center`}>제목</div>
          <div className={`w-[15%] text-center`}>작성자</div>
          <div className={`w-[15%] text-center`}>작성일</div>
        </header>
        <ul className={`w-full h-full`}>
          {posts.map(
            ({ postId, title, nickname, commentsCount, registeredAt }, i) => (
              <li
                key={postId}
                className={`flex items-center w-full h-[10%] ${
                  i % 2 === 1 ? "" : BG_COLOR.gray400
                } ${i === posts.length - 1 ? "rounded-b-[20px]" : ""}`}
              >
                <div
                  className={`w-[70%] text-center`}
                >{`${title} [${commentsCount}]`}</div>
                <div className={`w-[15%] text-center`}>{nickname}</div>
                <div className={`w-[15%] text-center`}>{registeredAt}</div>
              </li>
            ),
          )}
        </ul>
      </section>
      <div
        className={`flex justify-between items-end w-[80%] h-[60px] px-10 ${TEXT_COLOR.yellow}`}
      >
        <div className={`flex gap-5`}>
          <MaxPageArrow isMin />
          <NextPageArrow isPrev />
        </div>
        <ul className={`flex gap-12`}>
          {pages.map((v, i) => (
            <li
              key={i}
              className={`${currentPage === i + 1 ? "font-bold" : ""}`}
            >
              <button>{v}</button>
            </li>
          ))}
        </ul>
        <div className={`flex gap-5`}>
          <NextPageArrow />
          <MaxPageArrow />
        </div>
      </div>
    </main>
  );
}
