import { PostWithoutContents } from "@/types/model/post";
import Link from "next/link";
import React from "react";

export enum Category {
  "CHAT" = "잡담",
  "RECRUIT" = "모집",
  "INFORMATION" = "정보",
  "QUESTION" = "질문",
}

export default function PostList({ posts }: { posts: PostWithoutContents[] }) {
  const postSlots = Array.from({ length: 9 }, (_, i) => posts[i]);

  return (
    <ul className={`w-full h-full`}>
      {postSlots.map((post, i) => {
        const title = `${post?.title} ${post?.commentsCount !== 0 ? `[${post?.commentsCount}]` : ``}`;
        return (
          <li key={i} className={`flex items-center w-full h-[10%] ${i % 2 === 1 ? "" : "bg-gray400"} ${i === postSlots.length - 1 ? "rounded-b-[20px]" : ""}`}>
            {posts.length === 0 ? (
              i === 4 && <div className={`flex mx-auto`}>게시글 없음</div>
            ) : post ? (
              <>
                <div className={`w-[10%] text-center`}>{Category[post.category]}</div>
                <div className={`w-[60%]`}>
                  <div className={`w-full truncate p-3 text-center`}>
                    <Link href={`/post/${post.postId}`}>{title}</Link>
                  </div>
                </div>
                <div className={`w-[15%] text-center`}>{post.nickname}</div>
                <div className={`w-[15%] text-center`}>{post.createdAt}</div>
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
