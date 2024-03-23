import React from "react";
import CommentForm from "../molecules/CommentForm";
import CommentItem from "../atom/CommentItem";
import useCreatCommentController from "@/controller/commentController/useCreatCommentController";
import { Comment } from "@/types/model/comment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const { mutate } = useCreatCommentController(postId);
  const loggedInNickname = useSelector(({ authSlice }: RootState) => authSlice.loggedInNickname);

  const createComment = (comment: string) => {
    mutate(comment);
  };

  return (
    <section className={`mt-36`}>
      <div className={`text-body04`}>{`댓글 수 (${comments?.length})`}</div>
      {loggedInNickname ? <CommentForm type="create" onSubmit={createComment} /> : <></>}
      <hr className={`mt-[60px] bg-primary`} />
      <div className={``}>
        <ul>
          {comments?.map((comment, i) => (
            <li key={i}>
              <CommentItem postId={postId} comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
