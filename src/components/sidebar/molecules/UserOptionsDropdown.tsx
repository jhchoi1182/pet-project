import { Dropdown } from "@/components/atoms/base/Dropdown";
import DownArrow from "@/components/atoms/icons/DownArrow";
import withdrawController from "@/controller/authController/withdrawController";
import { usernameAtom } from "@/stateStore/commonAtom";
import { cookieUtils } from "@/util/cookieUtils";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const { removeCookie } = cookieUtils();

export default function UserOptionsDropdown() {
  const [toggleModal, setToggleModal] = useState(false);
  const setUsername = useSetRecoilState(usernameAtom);

  const handleLogout = () => {
    removeCookie();
    setToggleModal(false);
    setUsername(null);
  };

  const handleWithdraw = () => {
    withdrawController()();
    setToggleModal(false);
    setUsername(null);
  };

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
