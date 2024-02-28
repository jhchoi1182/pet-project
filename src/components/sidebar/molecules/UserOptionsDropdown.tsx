import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import useDeleteAuthController from "@/controller/authController/useDeleteAuthController";
import React, { useState } from "react";

export default function UserOptionsDropdown() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { handleWithdraw } = useDeleteAuthController();

  const logoutHandler = () => {
    handleWithdraw(setToggleDropdown, "logout");
  };

  const withdrawHandler = () => {
    handleWithdraw(setToggleDropdown, "withdraw");
  };

  return (
    <div className={`relative flex`}>
      <button onClick={() => setToggleDropdown(true)}>
        <DownArrow />
      </button>
      {toggleDropdown && (
        <Dropdown setToggleDropdown={setToggleDropdown}>
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
