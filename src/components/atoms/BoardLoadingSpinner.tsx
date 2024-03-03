import React from "react";

export default function BoardLoadingSpinner() {
  const postSlots = Array.from({ length: 9 }, (_, i) => i);
  return (
    <ul className={`w-full h-full animate-pulse`}>
      {postSlots.map((_, i) => (
        <li key={i} className={`flex items-center w-full h-[10%] ${i % 2 === 1 ? "" : "bg-gray400"} ${i === postSlots.length - 1 ? "rounded-b-[20px]" : ""}`} />
      ))}
    </ul>
  );
}
