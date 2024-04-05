"use client";

import { useGetPostsController } from "@/controller/postController/useGetPostsController";
import { setCurrentPage, setSelectedCategory } from "@/redux/modules/postSlice";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const sortCategory = ["전체", "잡담", "모집", "정보", "질문"] as const;
export type SortCategoryType = (typeof sortCategory)[number];

export default function CategorySelect() {
  const selectedCategory = useSelector(({ postSlice }: RootState) => postSlice.selectedCategory);
  const dispatch = useDispatch();
  const router = useRouter();

  const { refetch } = useGetPostsController(false);

  const handleClick = async (category: SortCategoryType) => {
    sessionStorage.setItem("currentPage", "1");
    sessionStorage.setItem("selectedCategory", category);
    await dispatch(setSelectedCategory(category));
    dispatch(setCurrentPage(1));
    refetch();
    router.push("/home");
  };

  return (
    <div className={`flex flex-col items-center`}>
      <span className={`text-body02 text-inverse mb-[20px]`}>분류</span>
      <ul className={`flex flex-wrap justify-center w-[175px] gap-[15px] text-body01 text-yellow`}>
        {sortCategory.map((category, i) => (
          <li key={i} className={`${category === selectedCategory ? "text-body02" : ""} -mb-[8px]`}>
            <button onClick={() => handleClick(category)}>{category}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
