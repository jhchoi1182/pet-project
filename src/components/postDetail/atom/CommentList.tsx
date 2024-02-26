import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { Comment } from "@/types/model/comment";
import React from "react";

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <>
      {comments?.map(({ nickname, createdAt, comment }, i) => (
        <li key={i}>
          <div className={`flex gap-5 mt-6 ${FONT_VARIANTS.body04}`}>
            <span>{nickname}</span>
            <span>{createdAt}</span>
          </div>
          <div className={`mt-10 ml-[6px]`}>
            <span>{comment}</span>
          </div>
          <hr className={`mt-10 ${BG_COLOR.primary}`} />
        </li>
      ))}
    </>
  );
}
