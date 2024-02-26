import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { Comment } from "@/types/model/comment";
import React from "react";
import PostDetailButton from "./PostDetailButton";
import useUpdateCommentController from "@/controller/commentController/useUpdateCommentController";
import CommentForm from "../molecules/CommentForm";
import { useRecoilState } from "recoil";
import { openCommentEditorAtom } from "@/stateStore/commentAtom";
import useDeleteCommentController from "@/controller/commentController/useDeleteCommentController";

interface CommentItemProps {
  postId: number;
  comment: Comment;
}

export default function CommentItem({ postId, comment: { commentId, nickname, createdAt, comment } }: CommentItemProps) {
  const [openCommentEditor, setOpenCommentEditor] = useRecoilState(openCommentEditorAtom);
  const { mutate: updateMutate } = useUpdateCommentController(postId, commentId);
  const { mutate: deleteMutate } = useDeleteCommentController(postId, commentId);

  const editComment = (editedComment: string) => {
    updateMutate(editedComment);
    setOpenCommentEditor(null);
  };

  const deleteComment = () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
    deleteMutate();
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 flex gap-3">
        {openCommentEditor !== commentId && <PostDetailButton onClick={() => setOpenCommentEditor(commentId)}>수정</PostDetailButton>}
        <PostDetailButton onClick={deleteComment}>삭제</PostDetailButton>
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
