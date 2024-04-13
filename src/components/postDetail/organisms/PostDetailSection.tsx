import { Post } from "@/types/model/post";
import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import { useRouter } from "next/navigation";
import PostUpdateDeleteButtons from "../molecules/PostUpdateDeleteButtons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store/store";
import "../../../styles/ckeditor.css";
import { convertTagsToMedia } from "@/util/ckeditorImageTransformer";
import { Category } from "@/components/postBoard/molecules/PostList";
import LikeButton from "../molecules/LikeButton";

export default function PostDetailSection({ post }: { post: Post | undefined }) {
  const { postId, category, title, nickname, createdAt, contents, images, views, likes, hasLiked } = post ?? {};

  const loggedInNickname = useSelector(({ authSlice }: RootState) => authSlice.loggedInNickname);
  const router = useRouter();

  return (
    <>
      <section className={`flex justify-between`}>
        <div className={`w-[75%]`}>
          <div className={`text-body03 mb-5`}>
            <span>{Category[category ?? "CHAT"]}</span>
          </div>
          <h1 className={`text-body02`}>{title}</h1>
          <div className={`flex gap-[55px] mt-[30px]`}>
            <span className={`text-body04`}>{nickname}</span>
            <span className={`text-body04`}>{createdAt}</span>
            <span className={`text-body03`}>{`조회수 ${views}`}</span>
            <span className={`text-body03`}>{`추천수 ${likes}`}</span>
          </div>
        </div>
        <div className={`flex flex-col self-end mr-[50px]`}>
          <div className={`flex ml-auto`}>
            <PostDetailButton onClick={() => router.back()}>뒤로가기</PostDetailButton>
          </div>
          {loggedInNickname === nickname && <PostUpdateDeleteButtons post={post} />}
        </div>
      </section>
      <hr className={`mt-9 bg-primary`} />
      <section className={`no-tailwind mt-[75px] leading-6`} dangerouslySetInnerHTML={{ __html: convertTagsToMedia(contents ?? "", images ?? []) }} />
      <LikeButton postId={postId} likes={likes} hasLiked={hasLiked} />
    </>
  );
}
