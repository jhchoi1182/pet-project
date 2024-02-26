import React from "react";

interface PostDetailButtonProps {
  onClick: () => void;
  children: string;
}

export default function PostDetailButton({ onClick, children }: PostDetailButtonProps) {
  return (
    <button className={`border border-[#D9D9D9] px-4 py-2`} onClick={onClick}>
      {children}
    </button>
  );
}
