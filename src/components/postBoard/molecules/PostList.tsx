import HighlightMatch from "@/components/atoms/ui/HighlightMatch";
import { setSearchValue } from "@/stores/modules/postSlice";
import { RootState } from "@/stores/store/store";
import { PostWithoutContents } from "@/types/model/post";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export enum Category {
  "CHAT" = "잡담",
  "RECRUIT" = "모집",
  "INFORMATION" = "정보",
  "QUESTION" = "질문",
}

export default function PostList({ posts }: { posts: PostWithoutContents[] }) {
  const { selectedSearchType, searchValue } = useSelector(({ postSlice }: RootState) => postSlice);
  const dispatch = useDispatch();

  const postSlots = Array.from({ length: 9 }, (_, i) => posts[i]);
  const shouldHighlightTitle = selectedSearchType === "제목" || selectedSearchType === "제목+내용";
  const shouldHighlightNickname = selectedSearchType === "작성자";

  useEffect(() => {
    const sessionValue = sessionStorage.getItem("searchValue");
    dispatch(setSearchValue(sessionValue));
  }, []);

  return (
    <ul className={`w-full h-full`}>
      {postSlots.map((post, i) => {
        const title = shouldHighlightTitle
          ? HighlightMatch(post?.title, searchValue)
          : `${post?.title} ${post?.commentsCount !== 0 ? `[${post?.commentsCount}]` : ``}`;
        const nickname = shouldHighlightNickname ? HighlightMatch(post?.nickname, searchValue) : post?.nickname;

        return (
          <li
            key={i}
            className={`flex items-center w-full h-[10%] pr-[2%] ${i % 2 === 1 ? "" : "bg-gray400"} ${i === postSlots.length - 1 ? "rounded-b-[20px]" : ""}`}
          >
            {posts?.length === 0 ? (
              i === 4 && <div className={`flex mx-auto -pr-[3%]`}>게시글 없음</div>
            ) : post ? (
              <>
                <div className={`w-[10%] text-center`}>{Category[post?.category]}</div>
                <div className={`w-[49%]`}>
                  <div className={`w-full truncate p-3 text-center`}>
                    <Link href={`/post/${post?.postId}`}>{title}</Link>
                  </div>
                </div>
                <div className={`w-[15%] text-center`}>{nickname}</div>
                <div className={`w-[10%] text-center`}>{post?.createdAt}</div>
                <div className={`w-[8%] text-center`}>{post?.view}</div>
                <div className={`w-[8%] text-center`}>{post?.likes}</div>
              </>
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </ul>
  );
}
