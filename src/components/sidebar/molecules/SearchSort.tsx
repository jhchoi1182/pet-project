import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store/store";
import { setSelectedSearchType } from "@/stores/modules/postSlice";
import { UnionOfSearchType } from "@/types/type/post";

const searchType = ["제목+내용", "제목", "내용", "작성자"] as const;

export default function SearchSort() {
  const selectedSearchType = useSelector(({ postSlice }: RootState) => postSlice.selectedSearchType);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dispatch = useDispatch();

  const handleClickDropdownList = (type: UnionOfSearchType) => {
    dispatch(setSelectedSearchType(type));
    setToggleDropdown(false);
  };

  return (
    <div className={`flex gap-3 mb-3 text-body03 text-yellow`}>
      <span data-testid={`selectedSearchType`} className="w-20 text-center">
        {selectedSearchType}
      </span>
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
