"use client";

import Board from "@/components/atoms/ui/Board";
import BoardTab from "@/components/atoms/ui/BoardTab";
import "../../styles/ckeditor.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import LoadingSpinner from "@/components/atoms/ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { replaceTempTagWithRealImgTag } from "@/util/ckeditorImageTransformer";

const PostForm = dynamic(() => import("@/components/write/template/PostForm"), { ssr: false });

export default function WritePage() {
  const { postId, title, contents, images } = useSelector(({ postSlice }: RootState) => postSlice.post);
  const [isLoading, setIsLoading] = useState(true);
  const savedTitle = title;
  const savedContents = replaceTempTagWithRealImgTag(contents, images);

  return (
    <main className={`relative w-[72%] min-w-[1098px] h-full`}>
      <BoardTab />
      <Board className={`relative p-14`}>
        {isLoading && (
          <div className={`absolute top-1/2 left-1/2`}>
            <LoadingSpinner />
          </div>
        )}
        <PostForm postId={postId} savedTitle={savedTitle} savedContents={savedContents} setIsLoading={setIsLoading} />
      </Board>
    </main>
  );
}
