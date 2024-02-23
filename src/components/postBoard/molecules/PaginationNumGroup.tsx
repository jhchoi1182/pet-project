import MaxPageArrow from "@/components/atoms/icons/MaxPageArrow";
import NextPageArrow from "@/components/atoms/icons/NextPageArrow";
import { TEXT_COLOR } from "@/styles/colors";
import { SetStateNumber } from "@/types/type/utilityTypes";
import React, { useEffect, useState } from "react";

interface PaginationNumGroupProps {
  currentPage: number;
  setCurrentPage: SetStateNumber;
  totalPages: number;
}

const pagesPerGroup = 13;

export default function PaginationNumGroup({ currentPage, setCurrentPage, totalPages }: PaginationNumGroupProps) {
  const [pageGroupStart, setPageGroupStart] = useState(1);

  const pageGroupEnd = pageGroupStart + 12 < totalPages ? pagesPerGroup : totalPages - pageGroupStart + 1;
  const pages = Array.from({ length: pageGroupEnd }, (_, i) => pageGroupStart + i);

  const moveMinPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(1);
    setPageGroupStart(1);
  };

  const movePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
  };
  const moveNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const moveMaxPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(totalPages ?? 0);
    const lastGroupStart = totalPages - (totalPages % pagesPerGroup || pagesPerGroup);
    setPageGroupStart(lastGroupStart + 1);
  };

  useEffect(() => {
    if (currentPage > pageGroupStart + 12) {
      setPageGroupStart((prev) => prev + pagesPerGroup);
    }
    if (currentPage < pageGroupStart) {
      setPageGroupStart((prev) => prev - pagesPerGroup);
    }
  }, [currentPage]);

  return (
    <div className={`flex items-end w-[80%] h-[60px] px-10 ${TEXT_COLOR.yellow}`}>
      <div className={`flex justify-between w-full`}>
        <div className={`flex gap-5`}>
          <div className={`w-5`}>{currentPage !== 1 && <MaxPageArrow isMin onClick={moveMinPage} />}</div>
          <div className={`w-2`}>{currentPage !== 1 && <NextPageArrow isPrev onClick={movePrevPage} />}</div>
        </div>
        <ul className={`flex gap-12`}>
          {pages.map((v, i) => (
            <li key={i} className={`${currentPage === v ? "font-bold" : ""}`}>
              <button onClick={() => setCurrentPage(v)}>{v}</button>
            </li>
          ))}
        </ul>
        <div className={`flex gap-5`}>
          <div className={`w-2`}>{currentPage !== totalPages && <NextPageArrow onClick={moveNextPage} />}</div>
          <div className={`w-5`}>{currentPage !== totalPages && <MaxPageArrow onClick={moveMaxPage} />}</div>
        </div>
      </div>
    </div>
  );
}
