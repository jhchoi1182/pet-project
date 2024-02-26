import { FONT_VARIANTS } from "@/styles/fonts";
import { Post } from "@/types/model/post";
import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import { useRouter } from "next/navigation";
import { BG_COLOR } from "@/styles/colors";
import { useRecoilValue } from "recoil";
import { loggedInNicknameAtom } from "@/stateStore/commonAtom";

interface PostDetailSectionProps {
  post: Post | undefined;
}

export default function PostDetailSection({ post }: PostDetailSectionProps) {
  const loggedInNickname = useRecoilValue(loggedInNicknameAtom);
  const router = useRouter();
  const { title, nickname, createdAt, contents } = post ?? {};

  return (
    <>
      <section className={`flex justify-between`}>
        <div className={`w-[75%]`}>
          <h1 className={`${FONT_VARIANTS.body02}`}>{title}</h1>
          <div className={`flex gap-[55px] mt-[30px] ${FONT_VARIANTS.body04}`}>
            <span>{nickname}</span>
            <span>{createdAt}</span>
          </div>
        </div>
        <div className={`flex flex-col self-end mr-[50px]`}>
          <div className={`flex ml-auto`}>
            <PostDetailButton onClick={() => router.back()}>뒤로가기</PostDetailButton>
          </div>
          {loggedInNickname === nickname && (
            <div className={`flex gap-[10px] mt-4 ${FONT_VARIANTS.body03}`}>
              <PostDetailButton onClick={() => {}}>수정</PostDetailButton>
              <PostDetailButton onClick={() => {}}>삭제</PostDetailButton>
            </div>
          )}
        </div>
      </section>
      <hr className={`mt-9 ${BG_COLOR.primary}`} />
      <section className={`mt-[75px] leading-6`}>{contents}</section>
    </>
  );
}
