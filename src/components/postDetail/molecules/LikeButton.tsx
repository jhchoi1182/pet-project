"use client";

import Like from "@/components/atoms/icons/Like";
import UnLike from "@/components/atoms/icons/UnLike";
import useToggleLikePostMutation from "@/service/post/useToggleLikePostMutation";
import React, { useEffect, useState } from "react";

interface LikeButtonProps {
  postId: number | undefined;
  likes: number | undefined;
  hasLiked: boolean | undefined;
}

export default function LikeButton({ postId, likes, hasLiked }: LikeButtonProps) {
  const [isLike, setIsLike] = useState(false);

  const { mutate } = useToggleLikePostMutation(postId ?? 1);

  const handleClick = () => {
    setIsLike((prev) => !prev);
    mutate();
  };

  useEffect(() => {
    setIsLike(hasLiked ?? false);
  }, [hasLiked]);

  return (
    <div className={`flex justify-center mt-24`}>
      <button
        className={`flex items-center gap-[10px] px-5 py-[14px] ${isLike ? "bg-blue-opacity0.2" : ""} border border-black rounded-full`}
        onClick={handleClick}
      >
        {isLike ? <Like /> : <UnLike />}
        <span>{likes ?? 0}</span>
      </button>
    </div>
  );
}
