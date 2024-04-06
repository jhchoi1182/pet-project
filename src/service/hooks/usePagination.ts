import { setCurrentPage } from "@/stores/modules/postSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const pagesPerGroup = 13;

function usePagination(currentPage: number, totalPages: number) {
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const dispatch = useDispatch();

  const pageGroupEnd = calculatePageGroupEnd(pageGroupStart);
  const pages = Array.from({ length: pageGroupEnd - pageGroupStart + 1 }, (_, index) => pageGroupStart + index);

  function calculatePageGroupEnd(start: number) {
    const end = start + pagesPerGroup - 1;
    return end < totalPages ? end : totalPages;
  }

  const movePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
