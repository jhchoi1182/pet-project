import React, { useContext, useState } from "react";
import Button from "../../../../base/Button";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import { QueryContext } from "@/context/QueryContextProvider";
import { commentApi } from "@/api/commentApi";

export default function CommentForm({ todoId }: { todoId: number }) {
  const { setTotalData } = useContext(QueryContext);
  const [comment, setComment] = useState("");

  const { mutate } = useUpdateFetch({
    queryKey: `comment_${todoId}`,
    queryFn: (comment) => commentApi.post(todoId, comment),
    onSuccess: async () => {
      const { result } = (await commentApi.get(+todoId))?.data;
      setTotalData((prev) => ({
        ...prev,
        [`comment_${todoId}`]: result,
      }));
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
