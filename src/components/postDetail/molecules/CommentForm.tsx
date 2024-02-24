import Button from "@/components/atoms/base/Button";
import useCreatComment from "@/controller/commentController/useCreatComment";
import React, { FormEvent, useState } from "react";

export default function CommentForm({ postId }: { postId: number }) {
  const [comment, setComment] = useState("");
  const { mutate } = useCreatComment(postId);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (value.length <= 200) {
      setComment(value);
    } else {
      setComment(value.slice(0, 200));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (comment.length > 200) return;
    mutate(comment);
  };

  return (
    <form className={`mt-6`} onSubmit={handleSubmit}>
      <textarea className={`w-full h-[120px] p-3 rounded-[10px] border border-black`} name="comment" value={comment} onChange={handleTextareaChange} placeholder="댓글을 입력해주세요." />
      <div className={`flex justify-between mt-2`}>
        <span>{`글자 수 (${comment.length}/200)`}</span>
        <Button size="tiny">작성하기</Button>
      </div>
    </form>
  );
}
