"use client";

import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import useDeletePostMutation from "@/service/post/useDeletePostMutation";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/types/model/post";
import { replaceTempTagWithRealImgTag } from "@/util/ckeditorImageTransformer";
import { CategoryAtUpdate } from "@/types/type/post";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store/store";

export default function PostUpdateDeleteButtons({ post, nickname }: { post: Post | undefined; nickname: string | undefined }) {
  const loggedInNickname = useSelector(({ authSlice }: RootState) => authSlice.loggedInNickname);
  const { category = "CHAT", postId = 0, title = "", contents = "", images = [] } = post ?? {};

  const { id } = useParams();
  const router = useRouter();
  const { mutate: deleteMutate } = useDeletePostMutation(+id ?? 0);

  const handleUpdateButtonClick = () => {
    sessionStorage.setItem("savedPostId", postId + "");
    sessionStorage.setItem("savedCategory", CategoryAtUpdate[category]);
    sessionStorage.setItem("savedTitle", title);
    sessionStorage.setItem("savedContents", replaceTempTagWithRealImgTag(contents, images));
    router.push(`/write?type=update`);
  };

  const deletePost = () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    deleteMutate();
  };

  return (
    <>
      {loggedInNickname === nickname && (
        <div className={`flex gap-[10px] mt-4 text-body03`}>
          <PostDetailButton onClick={handleUpdateButtonClick}>수정</PostDetailButton>
          <PostDetailButton onClick={deletePost}>삭제</PostDetailButton>
        </div>
      )}
    </>
  );
}
