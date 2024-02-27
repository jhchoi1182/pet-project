import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import useWithdrawController from "@/controller/authController/useWithdrawController";
import useAuthService from "@/service/useAuthService";
import React, { useState } from "react";

export default function UserOptionsDropdown() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { removeNickname } = useAuthService();
  const { handleWithdraw } = useWithdrawController();

  const logoutHandler = () => {
    setToggleDropdown(false);
    removeNickname();
  };

  const withdrawHandler = () => {
    handleWithdraw(setToggleDropdown);
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
