"use client";

import React, { useEffect } from "react";
import MaxPageArrow from "@/components/atoms/icons/MaxPageArrow";
import NextPageArrow from "@/components/atoms/icons/NextPageArrow";
import usePagination from "@/service/postService/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setCurrentPage } from "@/redux/modules/postSlice";

interface PaginationNumGroupProps {
  totalPages: number;
}

export default function PaginationNumGroup({ totalPages }: PaginationNumGroupProps) {
  const currentPage = useSelector(({ postSlice }: RootState) => postSlice.currentPage);
  const dispatch = useDispatch();
  const { pages, movePage } = usePagination(currentPage, totalPages);

  useEffect(() => {
    const savedCurrentPage = Number(sessionStorage.getItem("currentPage"));
    if (savedCurrentPage) dispatch(setCurrentPage(savedCurrentPage));
  }, []);

  return (
    <div className={`flex items-end w-[80%] h-[60px] px-10 text-yellow`}>
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
