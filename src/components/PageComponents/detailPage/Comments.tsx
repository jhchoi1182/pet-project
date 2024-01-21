import React from "react";
import Button from "../../base/Button";
import CommentForm from "./CommentForm";

const comments = [
  { commentId: 1, postId: 1, comment: "안녕", date: "2024-01-05" },
  { commentId: 2, postId: 1, comment: "안녕", date: "2024-01-05" },
  { commentId: 3, postId: 1, comment: "안녕", date: "2024-01-05" },
  { commentId: 4, postId: 1, comment: "안녕", date: "2024-01-05" },
];

export default function Comments() {
  return (
    <section className="w-full flex flex-col">
      <CommentForm />
      <ul className="flex flex-col items-center gap-5 w-full">
        {comments.map((comment) => (
          <li
            key={comment.commentId}
            className="w-[80%] border border-teal-500 rounded-lg py-5 px-10"
          >
            <div className="flex justify-between items-center">
              <time>{`작성날짜 : ${comment.date}`}</time>
              <div className="flex gap-10">
                <Button variant="update" size="small">
                  수정
                </Button>
                <Button variant="delete" size="small">
                  삭제
                </Button>
              </div>
            </div>
            <p className="my-5">{comment.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
