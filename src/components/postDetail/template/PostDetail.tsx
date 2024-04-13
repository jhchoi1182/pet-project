import BoardTab from "@/components/atoms/ui/BoardTab";
import React from "react";
import PostDetailSection from "../organisms/PostDetailSection";
import CommentSection from "../organisms/CommentSection";
import Board from "@/components/atoms/ui/Board";
import { Post } from "@/types/model/post";
import { Comment } from "@/types/model/comment";

export default function PostDetail({ id, post, comments }: { id: string; post: Post; comments: Comment[] }) {
  return (
    <>
      <BoardTab />
      <Board className={`px-[56px] py-[67px] overflow-auto`}>
        <PostDetailSection post={post} />
        <CommentSection postId={+id} comments={comments} />
      </Board>
    </>
  );
}
