import { PaginationNumGroupProps } from "@/components/postBoard/molecules/PaginationNumGroup";
import { useEffect, useState } from "react";

const pagesPerGroup = 13;

function usePagination({ currentPage, setCurrentPage, totalPages }: PaginationNumGroupProps) {
  const [pageGroupStart, setPageGroupStart] = useState(1);

  const pageGroupEnd = calculatePageGroupEnd(pageGroupStart);
  const pages = Array.from({ length: pageGroupEnd - pageGroupStart + 1 }, (_, index) => pageGroupStart + index);

  function calculatePageGroupEnd(start: number) {
    const end = start + pagesPerGroup - 1;
    return end < totalPages ? end : totalPages;
  }

  const movePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const groupNumber = Math.ceil(currentPage / pagesPerGroup);
    const newStart = (groupNumber - 1) * pagesPerGroup + 1;
    setPageGroupStart(newStart);
  }, [currentPage, totalPages]);

  return { pages, movePage };
}

export default usePagination;
