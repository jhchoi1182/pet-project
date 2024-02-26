import Button from "@/components/atoms/base/Button";
import useGetCommentsController from "@/controller/commentController/useGetCommentsController";
import { FONT_VARIANTS } from "@/styles/fonts";
import React from "react";
import CommentForm from "../molecules/CommentForm";
import { useRecoilValue } from "recoil";
import { loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { BG_COLOR } from "@/styles/colors";
import CommentItem from "../atom/CommentItem";
import useCreatComment from "@/controller/commentController/useCreatComment";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { mutate } = useCreatComment(postId);
  const { data } = useGetCommentsController(postId);
  const loggedInNickname = useRecoilValue(loggedInNicknameAtom);

  const createComment = (comment: string) => {
    mutate(comment);
  };

  return (
    <section className={`mt-36`}>
      <div className={`${FONT_VARIANTS.body04}`}>{`댓글 수 (${data?.length})`}</div>
      {loggedInNickname ? <CommentForm type="create" onSubmit={createComment} /> : <></>}
      <hr className={`mt-[60px] ${BG_COLOR.primary}`} />
      <div className={``}>
        <ul>
          {data?.map((comment, i) => (
            <li key={i}>
              <CommentItem postId={postId} comment={comment} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
