"use client";

import { RootState } from "@/stores/store/store";
import React from "react";
import { useSelector } from "react-redux";
import CommentForm from "../molecules/CommentForm";
import useCreatCommentMutation from "@/service/comment/useCreatCommentMutation";

export default function TempCommentForm({ postId }: { postId: number }) {
  const { mutate } = useCreatCommentMutation(postId);
  const createComment = (comment: string) => {
    mutate(comment);
  };
  const loggedInNickname = useSelector(({ authSlice }: RootState) => authSlice.loggedInNickname);
  return <>{loggedInNickname ? <CommentForm type="create" onSubmit={createComment} /> : <></>}</>;
}
