import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { Comment } from "@/types/model/comment";
import React, { useState } from "react";
import PostDetailButton from "./PostDetailButton";
import useUpdateComment from "@/controller/commentController/useUpdateComment";
import CommentForm from "../molecules/CommentForm";
import { useRecoilState } from "recoil";
import { openCommentEditorAtom } from "@/stateStore/commentAtom";

interface CommentItemProps {
  postId: number;
  comment: Comment;
}

export default function CommentItem({ postId, comment: { commentId, nickname, createdAt, comment } }: CommentItemProps) {
  const [openCommentEditor, setOpenCommentEditor] = useRecoilState(openCommentEditorAtom);
  const { mutate } = useUpdateComment(postId, commentId);

  const editComment = (editedComment: string) => {
    mutate(editedComment);
    setOpenCommentEditor(null);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex gap-3">
        {openCommentEditor !== commentId && <PostDetailButton onClick={() => setOpenCommentEditor(commentId)}>수정</PostDetailButton>}
        <PostDetailButton onClick={() => {}}>삭제</PostDetailButton>
      </div>
      <div className={`flex gap-5 mt-6 ${FONT_VARIANTS.body04}`}>
        <span>{nickname}</span>
        <span>{createdAt}</span>
      </div>
      <div className={`mt-10 ml-[6px] leading-6`}>{openCommentEditor === commentId ? <CommentForm type="update" onSubmit={editComment} initialComment={comment} /> : <span>{comment}</span>}</div>
      <hr className={`mt-10 ${BG_COLOR.primary}`} />
    </div>
  );
}
