import { useState } from "react";
import Button from "../../../../base/Button";
import { commentApi } from "@/api/commentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentForm({ todoId }: { todoId: number }) {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (comment: string) => commentApi.post(todoId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", todoId] });
    },
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment === "") return;
    mutate(comment);
    setComment("");
  };

  return (
    <form className="flex justify-center gap-10 w-full my-14" onSubmit={onSubmitHandler}>
      <input
        className="w-[60%] py-2 px-3 border border-teal-500 rounded-lg"
        name="comment"
        value={comment}
        onChange={onChangeHandler}
      />
      <Button>댓글쓰기</Button>
    </form>
  );
}
