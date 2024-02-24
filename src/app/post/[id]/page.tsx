"use client";

import BoardTab from "@/components/atoms/BoardTab";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import PostDetailButton from "@/components/postDetail/atom/PostDetailButton";
import CommentSection from "@/components/postDetail/organisms/CommentSection";
import useGetPostController from "@/controller/postController/useGetPostController";
import { BG_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    id: number;
  };
}

export default function PostDetail({ params: { id } }: Params) {
  const { data, isLoading } = useGetPostController(id);
  const { title, nickname, createdAt, contents } = data ?? {};
  // console.log(data);
  const router = useRouter();

  return (
    <main className={`w-[72%] min-w-[1098px] h-full`}>
      <BoardTab />
      <article className={`w-[80%] h-board rounded-tr-[20px] rounded-b-[20px] px-[56px] py-[67px] ${BG_COLOR.inverse} ${FONT_VARIANTS.body03}`}>
        {isLoading ? (
          <div className={`flex justify-center items-center h-full`}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <section className={`flex justify-between`}>
              <div>
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
                <div className={`flex gap-[10px] mt-4 ${FONT_VARIANTS.body03}`}>
                  <PostDetailButton onClick={() => {}}>수정</PostDetailButton>
                  <PostDetailButton onClick={() => {}}>삭제</PostDetailButton>
                </div>
              </div>
            </section>
            <hr className={`mt-9 ${BG_COLOR.primary}`} />
            <section className={`mt-[75px]`}>{contents}</section>
            <CommentSection postId={id} />
          </>
        )}
      </article>
    </main>
  );
}
