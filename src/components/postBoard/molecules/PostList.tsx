import { BG_COLOR } from "@/styles/colors";
import { PostWithoutContents } from "@/types/model/post";
import Link from "next/link";
import React from "react";

export default function PostList({ posts }: { posts: PostWithoutContents[] }) {
  const postSlots = Array.from({ length: 9 }, (_, i) => posts[i]);

  return (
    <ul className={`w-full h-full`}>
      {postSlots.map((post, i) => (
        <li key={i} className={`flex items-center w-full h-[10%] ${i % 2 === 1 ? "" : BG_COLOR.gray400} ${i === postSlots.length - 1 ? "rounded-b-[20px]" : ""}`}>
          {post ? (
            <>
              <Link className={`w-[70%]`} href={`/post/${post.postId}`}>
                <div className={`text-center`}>{`${post.title} ${post.commentsCount !== 0 ? `[${post.commentsCount}]` : ``}`}</div>
              </Link>
              <div className={`w-[15%] text-center`}>{post.nickname}</div>
              <div className={`w-[15%] text-center`}>{post.createdAt}</div>
            </>
          ) : (
            <></>
          )}
        </li>
      ))}
    </ul>
  );
}
