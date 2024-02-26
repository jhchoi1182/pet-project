import { FONT_VARIANTS } from "@/styles/fonts";
import { Post } from "@/types/model/post";
import React, { useState } from "react";
import PostDetailButton from "../atom/PostDetailButton";
import { useRouter } from "next/navigation";
import { BG_COLOR } from "@/styles/colors";
import { useRecoilValue } from "recoil";
import { loggedInNicknameAtom } from "@/stateStore/commonAtom";
import PostUpdateDeleteButtons from "../molecules/PostUpdateDeleteButtons";

interface PostDetailSectionProps {
  post: Post | undefined;
}

export default function PostDetailSection({ post }: PostDetailSectionProps) {
  const { title, nickname, createdAt, contents } = post ?? {};

  const [postInfoForEditing, setPostInfoForEditing] = useState({
    title: title ?? "",
    contents: contents ?? "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const loggedInNickname = useRecoilValue(loggedInNicknameAtom);
  const router = useRouter();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPostInfoForEditing((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <section className={`flex justify-between`}>
        <div className={`w-[75%]`}>
          {isEditMode ? (
            <input className={`w-full px-3 py-1 border border-black rounded-md`} name="title" value={postInfoForEditing.title} onChange={handleOnChange} placeholder="제목을 입력해주세요." />
          ) : (
            <h1 className={`${FONT_VARIANTS.body02}`}>{title}</h1>
          )}
          <div className={`flex gap-[55px] mt-[30px] ${FONT_VARIANTS.body04}`}>
            <span>{nickname}</span>
            <span>{createdAt}</span>
          </div>
        </div>
        <div className={`flex flex-col self-end mr-[50px]`}>
          <div className={`flex ml-auto`}>
            <PostDetailButton onClick={() => router.back()}>뒤로가기</PostDetailButton>
          </div>
          {loggedInNickname === nickname && <PostUpdateDeleteButtons isEditMode={isEditMode} setIsEditMode={setIsEditMode} postInfoForEditing={postInfoForEditing} />}
        </div>
      </section>
      <hr className={`mt-9 ${BG_COLOR.primary}`} />
      {isEditMode ? (
        <textarea
          className={`w-full h-[300px] mt-[75px] p-3 leading-6 border border-black rounded-[10px]`}
          name="contents"
          value={postInfoForEditing.contents}
          onChange={handleOnChange}
          placeholder="내용을 입력해주세요."
        />
      ) : (
        <section className={`mt-[75px] leading-6`}>{contents}</section>
      )}
    </>
  );
}
