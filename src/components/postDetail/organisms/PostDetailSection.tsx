import { FONT_VARIANTS } from "@/styles/fonts";
import { Post } from "@/types/model/post";
import React, { useState } from "react";
import PostDetailButton from "../atom/PostDetailButton";
import { useRouter } from "next/navigation";
import { BG_COLOR } from "@/styles/colors";
import { useRecoilValue } from "recoil";
import { loggedInNicknameAtom } from "@/stateStore/commonAtom";
import useUpdatePostController from "@/controller/postController/useUpdatePostController";

interface PostDetailSectionProps {
  post: Post | undefined;
}

export default function PostDetailSection({ post }: PostDetailSectionProps) {
  const { postId, title, nickname, createdAt, contents } = post ?? {};

  const [postInfoForEditing, setPostInfoForEditing] = useState({
    title: title ?? "",
    contents: contents ?? "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const loggedInNickname = useRecoilValue(loggedInNicknameAtom);
  const router = useRouter();
  const { mutate } = useUpdatePostController(postId ?? 0);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPostInfoForEditing((prev) => ({ ...prev, [name]: value }));
  };

  const updatePost = () => {
    mutate(postInfoForEditing);
    setIsEditMode(false);
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
          {loggedInNickname === nickname && (
            <div className={`flex gap-[10px] mt-4 ${FONT_VARIANTS.body03}`}>
              {isEditMode ? (
                <>
                  <PostDetailButton onClick={updatePost}>확인</PostDetailButton>
                  <PostDetailButton onClick={() => setIsEditMode(false)}>취소</PostDetailButton>
                </>
              ) : (
                <>
                  <PostDetailButton onClick={() => setIsEditMode(true)}>수정</PostDetailButton>
                  <PostDetailButton onClick={() => {}}>삭제</PostDetailButton>
                </>
              )}
            </div>
          )}
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
