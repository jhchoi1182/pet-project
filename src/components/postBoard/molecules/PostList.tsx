import { BG_COLOR } from "@/styles/colors";
import { PostWithoutContents } from "@/types/model/post";
import Link from "next/link";
import React from "react";

export default function PostList({ posts }: { posts: PostWithoutContents[] }) {
  const postSlots = Array.from({ length: 9 }, (_, i) => posts[i]);

  return (
    <ul className={`w-full h-full`}>
      {postSlots.map((post, i) => {
        const title = `${post?.title} ${post?.commentsCount !== 0 ? `[${post?.commentsCount}]` : ``}`;
        return (
          <li key={i} className={`flex items-center w-full h-[10%] ${i % 2 === 1 ? "" : BG_COLOR.gray400} ${i === postSlots.length - 1 ? "rounded-b-[20px]" : ""}`}>
            {post ? (
              <>
                <div className={`w-[70%]`}>
                  <div className={`w-full truncate px-3 text-center`}>
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
