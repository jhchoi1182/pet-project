import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import useDeletePostController from "@/controller/postController/useDeletePostController";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/types/model/post";

export default function PostUpdateDeleteButtons({ post }: { post: Post | undefined }) {
  const { id } = useParams();
  const router = useRouter();
  const { mutate: deleteMutate } = useDeletePostController(+id ?? 0);

  const handleUpdateButtonClick = () => {
    router.push(`/write?type=update`);
  };

  const deletePost = () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
    deleteMutate();
  };

  return (
    <div className={`flex gap-[10px] mt-4 text-body03`}>
      <PostDetailButton onClick={handleUpdateButtonClick}>수정</PostDetailButton>
      <PostDetailButton onClick={deletePost}>삭제</PostDetailButton>
    </div>
  );
}
