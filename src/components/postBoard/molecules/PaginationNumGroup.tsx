import React from "react";
import MaxPageArrow from "@/components/atoms/icons/MaxPageArrow";
import NextPageArrow from "@/components/atoms/icons/NextPageArrow";
import { TEXT_COLOR } from "@/styles/colors";
import { SetStateNumber } from "@/types/type/utilityTypes";
import usePagination from "@/service/postService/usePagination";

export interface PaginationNumGroupProps {
  currentPage: number;
  setCurrentPage: SetStateNumber;
  totalPages: number;
}

export default function PaginationNumGroup({ currentPage, setCurrentPage, totalPages }: PaginationNumGroupProps) {
  const { pages, movePage } = usePagination({ currentPage, setCurrentPage, totalPages });

  return (
    <div className={`flex items-end w-[80%] h-[60px] px-10 ${TEXT_COLOR.yellow}`}>
      <div className={`flex justify-between w-full`}>
        <div className={`flex gap-5`}>
          <div className={`w-5`}>{currentPage > 1 && <MaxPageArrow isMin onClick={() => movePage(1)} />}</div>
          <div className={`w-2`}>{currentPage > 1 && <NextPageArrow isPrev onClick={() => movePage(Math.max(1, currentPage - 1))} />}</div>
        </div>
        <ul className={`flex gap-12`}>
          {pages.map((page) => (
            <li key={page} className={`${currentPage === page ? "font-bold" : ""}`}>
              <button onClick={() => movePage(page)}>{page}</button>
            </li>
          ))}
        </ul>
        <div className={`flex gap-5`}>
          <div className={`w-2`}>{currentPage < totalPages && <NextPageArrow onClick={() => movePage(Math.min(totalPages, currentPage + 1))} />}</div>
          <div className={`w-5`}>{currentPage < totalPages && <MaxPageArrow onClick={() => movePage(totalPages)} />}</div>
        </div>
      </div>
    </div>
  );
}
