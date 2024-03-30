import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import React, { useState } from "react";
import { searchType } from "../organisms/SearchInput";

interface SearchSortProps {
  selectedSearchType: string;
  setSelectedSearchType: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchSort({ selectedSearchType, setSelectedSearchType }: SearchSortProps) {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleClickDropdownList = (type: string) => {
    setSelectedSearchType(type);
    setToggleDropdown(false);
  };

  return (
    <div className={`flex gap-3 mb-3 text-body03 text-yellow`}>
      <span className="w-20 text-center">{selectedSearchType}</span>
      <div className="relative">
        <DownArrow aria-label="검색 분류 열기" onClick={() => setToggleDropdown(true)} />
        {toggleDropdown && (
          <Dropdown variant="search" topRight={`top-7 right-2`} setToggleDropdown={setToggleDropdown}>
            {searchType.map((type, i) => (
              <Dropdown.li key={i} first={i === 0} end={i === searchType.length - 1} onClick={() => handleClickDropdownList(type)}>
                {type}
              </Dropdown.li>
            ))}
          </Dropdown>
        )}
      </div>
    </div>
  );
}
