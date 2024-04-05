"use client";

import Input from "@/components/atoms/base/Input";
import Search from "@/components/atoms/icons/Search";
import React, { FormEvent } from "react";
import SearchSort from "../molecules/SearchSort";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setInputValue, setSearchValue } from "@/redux/modules/postSlice";
import { useGetPostsController } from "@/controller/postController/useGetPostsController";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const { selectedSearchType, inputValue } = useSelector(({ postSlice }: RootState) => postSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  const { refetch } = useGetPostsController(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    sessionStorage.setItem("currentPage", "1");
    sessionStorage.setItem("selectedSearchType", selectedSearchType);
    sessionStorage.setItem("inputValue", inputValue);
    sessionStorage.setItem("searchValue", inputValue);
    dispatch(setCurrentPage(1));
    dispatch(setSearchValue(inputValue));
    refetch();
    router.push("/home");
  };

  return (
    <div className={`mb-[15%] ml-10`}>
      <SearchSort />
      <form className="flex gap-[17px] items-center" onSubmit={handleSubmit}>
        <Input variant="hideLabel" label="search" name="search" hideLabel>
          <Input.TextField variant="primary" value={inputValue} onChange={(e) => dispatch(setInputValue(e.target.value))} />
        </Input>
        <Search />
      </form>
    </div>
  );
}
