"use client";

import Input from "@/components/atoms/base/Input";
import Search from "@/components/atoms/icons/Search";
import React, { FormEvent, useState } from "react";
import SearchSort from "../molecules/SearchSort";

export const searchType = ["제목+내용", "제목", "내용", "작성자"];

export default function SearchInput() {
  const [selectedSearchType, setSelectedSearchType] = useState<(typeof searchType)[number]>(searchType[0]);

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(inputValue);
  };

  return (
    <div className={`mb-[15%] ml-10`}>
      <SearchSort selectedSearchType={selectedSearchType} setSelectedSearchType={setSelectedSearchType} />
      <form className="flex gap-[17px] items-center" onSubmit={handleSubmit}>
        <Input variant="hideLabel" label="search" name="search" hideLabel>
          <Input.TextField variant="primary" onChange={(e) => setInputValue(e.target.value)} />
        </Input>
        <Search />
      </form>
    </div>
  );
}
