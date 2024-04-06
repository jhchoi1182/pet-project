import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import useDeletePostMutation from "@/service/post/useDeletePostMutation";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/types/model/post";
import { replaceTempTagWithRealImgTag } from "@/util/ckeditorImageTransformer";

export default function PostUpdateDeleteButtons({ post }: { post: Post | undefined }) {
  const { postId = 0, title = "", contents = "", images = [] } = post ?? {};

  const { id } = useParams();
  const router = useRouter();
  const { mutate: deleteMutate } = useDeletePostMutation(+id ?? 0);

  const handleUpdateButtonClick = () => {
    sessionStorage.setItem("savedPostId", postId + "");
    sessionStorage.setItem("savedCategory", title);
    sessionStorage.setItem("savedTitle", title);
    sessionStorage.setItem("savedContents", replaceTempTagWithRealImgTag(contents, images));
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
