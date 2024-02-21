import React from "react";

export default function MaxPageArrow({ isMin = false }: { isMin?: boolean }) {
  return (
    <button>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={isMin ? { transform: "rotate(180deg)" } : {}}>
        <path d="M0.874023 1.04639L9.33316 9.50552L0.874023 17.9647" stroke="#FBC531" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.37549 1.04639L17.8346 9.50552L9.37549 17.9647" stroke="#FBC531" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
