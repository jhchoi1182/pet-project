import { PaginationNumGroupParameter } from "@/components/postBoard/molecules/PaginationNumGroup";
import { paginationAtom } from "@/stateStore/postAtom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

const pagesPerGroup = 13;

function usePagination({ currentPage, totalPages }: PaginationNumGroupParameter) {
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const setCurrentPage = useSetRecoilState(paginationAtom);

  const pageGroupEnd = calculatePageGroupEnd(pageGroupStart);
  const pages = Array.from({ length: pageGroupEnd - pageGroupStart + 1 }, (_, index) => pageGroupStart + index);

  function calculatePageGroupEnd(start: number) {
    const end = start + pagesPerGroup - 1;
    return end < totalPages ? end : totalPages;
  }

  const movePage = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem("currentPage", page + "");
  };

  useEffect(() => {
    const groupNumber = Math.ceil(currentPage / pagesPerGroup);
    const newStart = (groupNumber - 1) * pagesPerGroup + 1;
    setPageGroupStart(newStart);
  }, [currentPage, totalPages]);

  return { pages, movePage };
}

export default usePagination;
