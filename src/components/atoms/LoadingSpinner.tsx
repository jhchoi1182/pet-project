import { BG_COLOR } from "@/styles/colors";
import React from "react";

const circleCount = 3;
const size = `w-2 h-2`;

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-4">
      {Array.from({ length: circleCount }).map((_, index) => (
        <div
          key={index}
          className={`${size} ${BG_COLOR.yellow} rounded-full animate-bounce`}
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );
}
