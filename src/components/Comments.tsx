import React from "react";
import Button from "./base/Button";

const comments = [
  { commentId: 1, postId: 1, comment: "안녕", date: "2024-01-05" },
  { commentId: 2, postId: 1, comment: "안녕", date: "2024-01-05" },
  { commentId: 3, postId: 1, comment: "안녕", date: "2024-01-05" },
  { commentId: 4, postId: 1, comment: "안녕", date: "2024-01-05" },
];

export default function Comments() {
  return (
    <section className="w-full flex flex-col">
      <form className="flex justify-center gap-10 w-full my-14">
        <input className="w-[60%] py-2 px-3 border border-teal-500 rounded-lg " />
        <Button>댓글쓰기</Button>
      </form>
      <ul className="flex flex-col items-center gap-5 w-full">
        {comments.map((comment) => (
          <li
            key={comment.commentId}
            className="w-[80%] border border-teal-500 rounded-lg py-5 px-10"
          >
            <div className="flex justify-between items-center">
              <time>{comment.date}</time>
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
