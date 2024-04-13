"use client";

import Like from "@/components/atoms/icons/Like";
import UnLike from "@/components/atoms/icons/UnLike";
import useToggleLikePostMutation from "@/service/post/useToggleLikePostMutation";
import { setIsLike } from "@/stores/modules/authSlice";
import { RootState } from "@/stores/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface LikeButtonProps {
  postId: number | undefined;
  likes: number | undefined;
  hasLiked: boolean | undefined;
}

export default function LikeButton({ postId, likes, hasLiked }: LikeButtonProps) {
  const isLike = useSelector(({ authSlice }: RootState) => authSlice.isLike);
  const dispatch = useDispatch();

  const { mutate } = useToggleLikePostMutation(postId ?? 1, dispatch);

  useEffect(() => {
    dispatch(setIsLike(hasLiked ?? false));
  }, [hasLiked]);

  return (
    <div className={`flex justify-center mt-24`}>
      <button
        className={`flex items-center gap-[10px] px-5 py-[14px] ${isLike ? "bg-blue-opacity0.2" : ""} border border-black rounded-full`}
        onClick={() => mutate()}
      >
        {isLike ? <Like /> : <UnLike />}
        <span>{likes ?? 0}</span>
      </button>
    </div>
  );
}
