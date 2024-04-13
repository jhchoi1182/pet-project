import React from "react";
import CommentItem from "../atom/CommentItem";
import { Comment } from "@/types/model/comment";
import TempCommentForm from "./TempCommentForm";

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  return (
    <section className={`mt-16`}>
      <div className={`text-body04`}>{`댓글 수 (${comments?.length})`}</div>
      <TempCommentForm postId={postId} />
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
