import { Post } from "@/types/model/post";
import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import PostUpdateDeleteButtons from "../molecules/PostUpdateDeleteButtons";
import "../../../styles/ckeditor.css";
import { convertTagsToMedia } from "@/util/ckeditorImageTransformer";
import LikeButton from "../molecules/LikeButton";

enum Category {
  "CHAT" = "잡담",
  "RECRUIT" = "모집",
  "INFORMATION" = "정보",
  "QUESTION" = "질문",
}

interface PostDetailSectionProps {
  post: Post | undefined;
}

export default function PostDetailSection({ post }: PostDetailSectionProps) {
  const { postId, category, title, nickname, createdAt, contents, images, views, likes, hasLiked } = post ?? {};

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
            <span className={`text-body03`}>
              <span>조회수 </span>
              <span>{views ?? 0}</span>
            </span>
            <span className={`text-body03`}>{`추천수 ${likes}`}</span>
          </div>
        </div>
        <div className={`flex flex-col self-end mr-[50px]`}>
          <div className={`flex ml-auto`}>
            <PostDetailButton>뒤로가기</PostDetailButton>
          </div>
          <PostUpdateDeleteButtons post={post} nickname={nickname} />
        </div>
      </section>
      <hr className={`mt-9 bg-primary`} />
      <section className={`no-tailwind mt-[75px] leading-6`} dangerouslySetInnerHTML={{ __html: convertTagsToMedia(contents ?? "", images ?? []) }} />
      <LikeButton postId={postId} likes={likes} hasLiked={hasLiked} />
    </>
  );
}
