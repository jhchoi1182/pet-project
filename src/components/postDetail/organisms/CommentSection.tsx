import Button from "@/components/atoms/base/Button";
import useGetCommentsController from "@/controller/commentController/useGetCommentsController";
import { FONT_VARIANTS } from "@/styles/fonts";
import React from "react";
import CommentForm from "../molecules/CommentForm";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "@/stateStore/commonAtom";
import { BG_COLOR } from "@/styles/colors";

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { data, isLoading } = useGetCommentsController(postId);
  const username = useRecoilValue(usernameAtom);

  console.log(data);

  return (
    <section className={`mt-36`}>
      <div className={`${FONT_VARIANTS.body04}`}>{`댓글 수 (${data?.length})`}</div>
      {username ? <CommentForm postId={postId} /> : <></>}
      <hr className={`mt-[60px] ${BG_COLOR.primary}`} />
      <div className={``}>
        <ul>
          {data?.map((comment, i) => (
            <li key={i}>
              <div className={`flex gap-5 mt-6 ${FONT_VARIANTS.body04}`}>
                <span>{comment.nickname}</span>
                <span>{comment.createdAt}</span>
              </div>
              <div className={`mt-10 ml-[6px]`}>
                <span>{comment.comment}</span>
              </div>
              <hr className={`mt-6 ${BG_COLOR.primary}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
