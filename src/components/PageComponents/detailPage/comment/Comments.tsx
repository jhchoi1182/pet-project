import React, { useContext } from "react";
import Button from "../../../base/Button";
import CommentForm from "./CommentForm";
import useGetFetch from "@/hooks/useGetFetch";
import { QueryContext } from "@/context/QueryContextProvider";
import { Comment } from "@/types/model/comment";
import { commentApi } from "@/api/commentApi";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Comments({ todoId }: { todoId: number }) {
  const { totalData } = useContext(QueryContext);
  const comments = totalData[`comment_${todoId}`];

  const { isLoading, isError } = useGetFetch<Comment>({
    queryKey: `comment_${todoId}`,
    queryFn: commentApi.get(+todoId),
  });

  if (isError) return <div>{`${isError}`}</div>;

  return (
    <>
      {isLoading || !comments ? (
        <div className="flex justify-center items-center h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="w-full flex flex-col">
          <CommentForm todoId={todoId} />
          {comments.length === 0 ? (
            <div className="w-full text-center">댓글 없음</div>
          ) : (
            <ul className="flex flex-col items-center gap-5 w-full">
              {comments.map(({ commentId, comment, registeredAt }: Comment) => (
                <li
                  key={commentId}
                  className="w-[80%] border border-teal-500 rounded-lg py-5 px-10"
                >
                  <div className="flex justify-between items-center">
                    <time>{`작성 날짜 : ${registeredAt}`}</time>
                    <div className="flex gap-10">
                      <Button variant="update" size="small">
                        수정
                      </Button>
                      <Button variant="delete" size="small">
                        삭제
                      </Button>
                    </div>
                  </div>
                  <p className="my-5">{comment}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
