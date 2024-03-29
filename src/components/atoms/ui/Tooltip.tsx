import React from "react";

export default function Tooltip({ text }: { text: string }) {
  return (
    <div className="absolute -top-24 -right-10">
      <div className="relative w-52 bg-white rounded-lg p-3 tooltipTail">{text}</div>
    </div>
  );
}
