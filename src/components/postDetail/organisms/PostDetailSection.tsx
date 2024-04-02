import { Post } from "@/types/model/post";
import React from "react";
import PostDetailButton from "../atom/PostDetailButton";
import { useRouter } from "next/navigation";
import PostUpdateDeleteButtons from "../molecules/PostUpdateDeleteButtons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import "../../../styles/ckeditor.css";
import { convertTagsToMedia } from "@/util/ckeditorImageTransformer";

export default function PostDetailSection({ post }: { post: Post | undefined }) {
  const { title, nickname, createdAt, contents, images } = post ?? {};

  const loggedInNickname = useSelector(({ authSlice }: RootState) => authSlice.loggedInNickname);
  const router = useRouter();

  return (
    <>
      <section className={`flex justify-between`}>
        <div className={`w-[75%]`}>
          <h1 className={`text-body02`}>{title}</h1>
          <div className={`flex gap-[55px] mt-[30px] text-body04`}>
            <span>{nickname}</span>
            <span>{createdAt}</span>
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
    </>
  );
}
