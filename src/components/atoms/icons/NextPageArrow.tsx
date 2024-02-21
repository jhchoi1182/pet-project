import React from "react";

export default function NextPageArrow({
  isPrev = false,
}: {
  isPrev?: boolean;
}) {
  return (
    <button>
      <svg
        width="10"
        height="19"
        viewBox="0 0 10 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={isPrev ? { transform: "rotate(180deg)" } : {}}
      >
        <path
          d="M1 1L9.47682 9.47682L1 17.9536"
          stroke="#FBC531"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}
