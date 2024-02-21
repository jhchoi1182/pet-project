import CommentForm from "../elements/CommentForm";
import { Comment } from "@/types/model/comment";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import CommentCard from "../elements/CommentCard";
import useComments from "@/controller/commentController/useComments";

export default function Comments({ todoId }: { todoId: number }) {
  const { data, isLoading } = useComments(todoId);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[40vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <section className="w-full flex flex-col">
          <CommentForm todoId={todoId} />
          {data?.length === 0 ? (
            <div className="w-full text-center">댓글 없음</div>
          ) : (
            <ul className="flex flex-col items-center gap-5 w-full mb-5">
              {data?.map((comment: Comment) => (
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
