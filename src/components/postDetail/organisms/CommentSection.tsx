import Button from "@/components/atoms/base/Button";
import useGetCommentsController from "@/controller/commentController/useGetCommentsController";
import { FONT_VARIANTS } from "@/styles/fonts";
import React from "react";
import CommentForm from "../molecules/CommentForm";
import { useRecoilValue } from "recoil";
import { loggedInNicknameAtom } from "@/stateStore/commonAtom";
import { BG_COLOR } from "@/styles/colors";
import CommentList from "../atom/CommentList";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { data } = useGetCommentsController(postId);
  const loggedInNickname = useRecoilValue(loggedInNicknameAtom);

  return (
    <section className={`mt-36`}>
      <div className={`${FONT_VARIANTS.body04}`}>{`댓글 수 (${data?.length})`}</div>
      {loggedInNickname ? <CommentForm postId={postId} /> : <></>}
      <hr className={`mt-[60px] ${BG_COLOR.primary}`} />
      <div className={``}>
        <ul>
          <CommentList comments={data ?? []} />
        </ul>
      </div>
    </section>
  );
}
