import Tooltip from "@/components/Tooltip";
import InfoIcon from "@/components/icons/InfoIcon";
import React, { useState } from "react";

export default function GuestLoginText({
  handleGuestLogin,
}: {
  handleGuestLogin: () => Promise<void>;
}) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative flex justify-end mt-10 cursor-pointer" onClick={handleGuestLogin}>
      <div
        className="flex items-center gap-2 text-sky-500 font-bold"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <span>
          <InfoIcon />
        </span>
        <span>게스트 로그인</span>
      </div>
      {isTooltipVisible && <Tooltip text="개인 계정 대신 공용 계정을 사용합니다." />}
    </div>
  );
}
