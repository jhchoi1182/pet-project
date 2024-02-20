import { useState } from "react";
import Button from "../../../../atoms/base/Button";
import useCommentPost from "@/hooks/commentController/useCommentPost";
import commentService from "@/service/commentService";

export default function CommentForm({ todoId }: { todoId: number }) {
  const [comment, setComment] = useState("");
  const { mutate } = useCommentPost(todoId);

  const { handleInputChange, handlePost } = commentService();

  return (
    <form
      className="flex justify-center gap-10 w-full my-14"
      onSubmit={(event) => handlePost({ event, mutate, comment, setComment })}
    >
      <input
        className="w-[60%] py-2 px-3 border border-teal-500 rounded-lg"
        name="comment"
        value={comment}
        onChange={(event) => handleInputChange(event, setComment)}
      />
      <Button>댓글쓰기</Button>
    </form>
  );
}
