import React from "react";

interface NextPageArrowParameter {
  isPrev?: boolean;
  onClick: () => void;
}

export default function NextPageArrow({ isPrev = false, onClick }: NextPageArrowParameter) {
  return (
    <button aria-label="이전/다음 페이지 버튼" onClick={onClick}>
      <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={isPrev ? { transform: "rotate(180deg)" } : {}}>
        <path d="M1 1L9.47682 9.47682L1 17.9536" stroke="#FBC531" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
