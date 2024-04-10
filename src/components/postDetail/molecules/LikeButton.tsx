"use client";

import Like from "@/components/atoms/icons/Like";
import UnLike from "@/components/atoms/icons/UnLike";
import React, { useState } from "react";

interface LikeButtonProps {
  likes: number | undefined;
}

export default function LikeButton({ likes }: LikeButtonProps) {
  const [isLike, setIsLike] = useState(false);

  return (
    <div className={`flex justify-center mt-24`}>
      <button
        className={`flex items-center gap-[10px] px-5 py-[14px] ${isLike ? "bg-blue-opacity0.2" : ""} border border-black rounded-full`}
        onClick={() => setIsLike((prev) => !prev)}
      >
        {isLike ? <Like /> : <UnLike />}
        <span>{likes ?? 0}</span>
      </button>
    </div>
  );
}
