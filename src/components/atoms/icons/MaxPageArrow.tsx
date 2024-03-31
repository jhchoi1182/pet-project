import React from "react";

interface MaxPageArrowParameter extends React.HTMLAttributes<HTMLButtonElement> {
  isMin?: boolean;
}

export default function MaxPageArrow({ isMin = false, ...props }: MaxPageArrowParameter) {
  return (
    <button aria-label="맨 처음/맨 끝 페이지로 이동 버튼" {...props}>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={isMin ? { transform: "rotate(180deg)" } : {}}>
        <path d="M0.874023 1.04639L9.33316 9.50552L0.874023 17.9647" stroke="#FBC531" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.37549 1.04639L17.8346 9.50552L9.37549 17.9647" stroke="#FBC531" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
