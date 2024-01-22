import React, { useContext } from "react";
import CommentForm from "../elements/CommentForm";
import useGetFetch from "@/hooks/useGetFetch";
import { QueryContext } from "@/context/QueryContextProvider";
import { Comment } from "@/types/model/comment";
import { commentApi } from "@/api/commentApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import CommentCard from "../elements/CommentCard";
import exceptionService from "@/service/exceptionService";

export default function Comments({ todoId }: { todoId: number }) {
  const { totalData } = useContext(QueryContext);
  const comments = totalData[`comment_${todoId}`];

  const { isLoading } = useGetFetch<Comment>({
    queryKey: `comment_${todoId}`,
    queryFn: commentApi.get(+todoId),
    onError: (error) => {
      exceptionService(error);
    },
  });

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
            <ul className="flex flex-col items-center gap-5 w-full mb-5">
              {comments.map((comment: Comment) => (
                <li
                  key={comment.commentId}
                  className="w-[80%] border border-teal-500 rounded-lg py-5 px-10"
                >
                  <CommentCard todoId={todoId} comment={comment} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
