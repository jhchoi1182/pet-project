import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import { FONT_VARIANTS } from "@/styles/fonts";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import useUpdatePostController from "@/controller/postController/useUpdatePostController";
import useDeletePostController from "@/controller/postController/useDeletePostController";
import { useParams } from "next/navigation";

interface PostUpdateDeleteButtonsProps {
  isEditMode: boolean;
  setIsEditMode: SetStateBoolean;
  postInfoForEditing: {
    title: string;
    contents: string;
  };
}

export default function PostUpdateDeleteButtons({ isEditMode, setIsEditMode, postInfoForEditing }: PostUpdateDeleteButtonsProps) {
  const { id } = useParams();

  const { mutate: updateMutate } = useUpdatePostController(+id ?? 0);
  const { mutate: deleteMutate } = useDeletePostController(+id ?? 0);

  const updatePost = () => {
    updateMutate(postInfoForEditing);
    setIsEditMode(false);
  };

  const deletePost = () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    deleteMutate();
  };
  return (
    <div className={`flex gap-[10px] mt-4 ${FONT_VARIANTS.body03}`}>
      {isEditMode ? (
        <>
          <PostDetailButton onClick={updatePost}>확인</PostDetailButton>
          <PostDetailButton onClick={() => setIsEditMode(false)}>취소</PostDetailButton>
        </>
      ) : (
        <>
          <PostDetailButton onClick={() => setIsEditMode(true)}>수정</PostDetailButton>
          <PostDetailButton onClick={deletePost}>삭제</PostDetailButton>
        </>
      )}
    </div>
  );
}
