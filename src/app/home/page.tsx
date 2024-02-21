"use client";

import MaxPageArrow from "@/components/atoms/icons/MaxPageArrow";
import NextPageArrow from "@/components/atoms/icons/NextPageArrow";
import { BG_COLOR, TEXT_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";

const pages = Array.from({ length: 13 }, (_, i) => i + 1);

export default function Home() {
  return (
    <section className="w-[1098px] min-w-[1098px] h-full">
      <nav className={`h-nav ${FONT_VARIANTS.body02}`}>
        <ul className={`h-full`}>
          <li
            className={`flex justify-center items-center w-[161px] h-full rounded-t-[20px] ${BG_COLOR.inverse}`}
          >
            쉼터
          </li>
        </ul>
      </nav>
      <div
        className={`w-[1098px] h-board rounded-tr-[20px] rounded-b-[20px] ${BG_COLOR.inverse}`}
      ></div>
      <div
        className={`flex justify-between items-end h-[60px] px-10 ${TEXT_COLOR.yellow}`}
      >
        <div className="flex gap-5">
          <NextPageArrow isPrev />
          <MaxPageArrow isMin />
        </div>
        <ul className="flex gap-12">
          {pages.map((v, i) => (
            <li key={i}>
              <button>{v}</button>
            </li>
          ))}
        </ul>
        <div className="flex gap-5">
          <NextPageArrow />
          <MaxPageArrow />
        </div>
      </div>
    </section>
  );
}
