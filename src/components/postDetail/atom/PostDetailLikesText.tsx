import { RootState } from "@/stores/store/store";
import React from "react";
import { useSelector } from "react-redux";

export default function PostDetailLikesText() {
  const likes = useSelector(({ postSlice }: RootState) => postSlice.postLikes);
  return <span className={`text-body03`}>{`추천수 ${likes}`}</span>;
}
