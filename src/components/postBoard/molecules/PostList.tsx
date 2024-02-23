import { BG_COLOR } from "@/styles/colors";
import { PostWithoutContents } from "@/types/model/post";
import React from "react";

export default function PostList({ posts }: { posts: PostWithoutContents[] }) {
  const postSlots = Array.from({ length: 9 }, (_, i) => posts[i]);

  return (
    <ul className={`w-full h-full`}>
      {postSlots.map((item, i) => (
        <li key={i} className={`flex items-center w-full h-[10%] ${i % 2 === 1 ? "" : BG_COLOR.gray400} ${i === postSlots.length - 1 ? "rounded-b-[20px]" : ""}`}>
          {item ? (
            <>
              <div className={`w-[70%] text-center`}>{`${item.title} ${item.commentsCount !== 0 ? `[${item.commentsCount}]` : ``}`}</div>
              <div className={`w-[15%] text-center`}>{item.nickname}</div>
              <div className={`w-[15%] text-center`}>{item.createdAt}</div>
            </>
          ) : (
            <></>
          )}
        </li>
      ))}
    </ul>
  );
}
