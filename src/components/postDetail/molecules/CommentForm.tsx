import Button from "@/components/atoms/base/Button";
import { openCommentEditorAtom } from "@/stateStore/commentAtom";
import React, { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";

interface CommentFormProps {
  type: "create" | "update";
  onSubmit: (comment: string) => void;
  initialComment?: string;
}

export default function CommentForm({ type, onSubmit, initialComment }: CommentFormProps) {
  const [comment, setComment] = useState(initialComment ?? "");
  const setOpenCommentEditor = useSetRecoilState(openCommentEditorAtom);

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
    if (comment.length === 0) return alert("내용을 입력해주세요.");
    if (comment.length > 200) return;
    onSubmit(comment);
    setComment("");
  };

  return (
    <form className={`mt-6`} onSubmit={handleSubmit}>
      <textarea
        className={`w-full h-[120px] p-3 rounded-[10px] border border-black`}
        name="comment"
        value={comment}
        onChange={handleTextareaChange}
        placeholder="댓글을 입력해주세요."
      />
      <div className={`flex justify-between mt-2`}>
        <span>{`글자 수 (${comment.length}/200)`}</span>
        {type === "create" ? (
          <Button size="tiny">작성하기</Button>
        ) : (
          <div className={`flex gap-3`}>
            <Button size="tiny">수정하기</Button>
            <Button size="tiny" onClick={() => setOpenCommentEditor(null)}>
              취소
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
