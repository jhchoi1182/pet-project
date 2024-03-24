import React from "react";
import UserOptionsDropdown from "./UserOptionsDropdown";

export default function Username({ nickname }: { nickname: string }) {
  return (
    <div className={`flex gap-2 ml-[10.4px] text-inverse`}>
      <div className={`flex flex-col gap-3 items-center`}>
        <span className={`flex items-center`}>
          <span className={`text-yellow`}>{nickname}</span>
          <span className={`ml-2`}>님</span>
        </span>
        <p>환영합니다!</p>
      </div>
      <UserOptionsDropdown />
    </div>
  );
}
