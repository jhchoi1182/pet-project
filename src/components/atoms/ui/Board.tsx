import React from "react";

interface BoardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Board({ children, className = "" }: BoardProps) {
  return <section className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] bg-inverse text-body03 ${className}`}>{children}</section>;
}
