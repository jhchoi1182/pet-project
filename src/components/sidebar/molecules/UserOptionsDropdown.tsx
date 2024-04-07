import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import useDeleteAuthAxios from "@/service/auth/useDeleteAuthAxios";
import React, { useState } from "react";

export default function UserOptionsDropdown() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { handleWithdraw } = useDeleteAuthAxios();

  const logoutHandler = () => {
    handleWithdraw(setToggleDropdown, "logout");
  };

  const withdrawHandler = () => {
    handleWithdraw(setToggleDropdown, "withdraw");
  };

  return (
    <div className={`relative flex`}>
      <DownArrow aria-label="사용자 옵션 열기" onClick={() => setToggleDropdown(true)} />
      {toggleDropdown && (
        <Dropdown topRight={`top-5 -right-0`} setToggleDropdown={setToggleDropdown}>
          <Dropdown.li first onClick={logoutHandler}>
            로그아웃
          </Dropdown.li>
          <Dropdown.li end textColor="red" onClick={withdrawHandler}>
            회원 탈퇴
          </Dropdown.li>
        </Dropdown>
      )}
    </div>
  );
}
