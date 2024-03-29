import React, { ButtonHTMLAttributes } from "react";

interface PostDetailButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export default function PostDetailButton({ children, ...props }: PostDetailButtonProps) {
  return (
    <button className={`border border-[#D9D9D9] px-4 py-2`} {...props}>
      {children}
    </button>
  );
}
