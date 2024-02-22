import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import React, { useState } from "react";

export default function UserOptionsDropdown() {
  const [toggleModal, setToggleModal] = useState(false);

  const handleLogout = () => {};
  const handleWithdraw = () => {};

  return (
    <div className={`relative flex`}>
      <button onClick={() => setToggleModal(true)}>
        <DownArrow />
      </button>
      {toggleModal && (
        <Dropdown setToggleModal={setToggleModal}>
          <Dropdown.li first onClick={handleLogout}>
            로그아웃
          </Dropdown.li>
          <Dropdown.li end textColor="red" onClick={handleWithdraw}>
            회원 탈퇴
          </Dropdown.li>
        </Dropdown>
      )}
    </div>
  );
}
