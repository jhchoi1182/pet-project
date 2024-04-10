"use client";

import React, { useEffect } from "react";
import MaxPageArrow from "@/components/atoms/icons/MaxPageArrow";
import NextPageArrow from "@/components/atoms/icons/NextPageArrow";
import usePagination from "@/service/hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store/store";
import { setCurrentPage } from "@/stores/modules/postSlice";
import usePrefetchPosts from "@/service/post/usePrefetchPosts";

interface PaginationNumGroupProps {
  totalPages: number;
}

export default function PaginationNumGroup({ totalPages }: PaginationNumGroupProps) {
  const currentPage = useSelector(({ postSlice }: RootState) => postSlice.currentPage);
  const dispatch = useDispatch();
  const { pages, movePage } = usePagination(currentPage, totalPages);
  const prefetchPosts = usePrefetchPosts();

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  useEffect(() => {
    const savedCurrentPage = Number(sessionStorage.getItem("currentPage"));
    if (savedCurrentPage) dispatch(setCurrentPage(savedCurrentPage));
  }, []);

  return (
    <div className={`flex items-end w-[80%] h-[60px] px-10 text-yellow`}>
      <div className={`flex justify-between w-full`}>
        <div className={`flex gap-5`}>
          <div className={`w-5`}>{currentPage > 1 && <MaxPageArrow isMin onMouseEnter={() => prefetchPosts(1)} onClick={() => movePage(1)} />}</div>
          <div className={`w-2`}>
            {currentPage > 1 && <NextPageArrow isPrev onMouseEnter={() => prefetchPosts(prevPage)} onClick={() => movePage(prevPage)} />}
          </div>
        </div>
        <ul className={`flex gap-12`}>
          {pages.map((page) => (
            <li key={page} className={`${currentPage === page ? "font-bold" : ""}`}>
              <button onClick={() => movePage(page)} onMouseEnter={() => prefetchPosts(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
        <div className={`flex gap-5`}>
          <div className={`w-2`}>
            {currentPage < totalPages && <NextPageArrow onMouseEnter={() => prefetchPosts(nextPage)} onClick={() => movePage(nextPage)} />}
          </div>
          <div className={`w-5`}>
            {currentPage < totalPages && <MaxPageArrow onMouseEnter={() => prefetchPosts(totalPages)} onClick={() => movePage(totalPages)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
