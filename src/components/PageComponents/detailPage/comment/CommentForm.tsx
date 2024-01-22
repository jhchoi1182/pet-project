import React from "react";
import Button from "../../../base/Button";

export default function CommentForm() {
  return (
    <form className="flex justify-center gap-10 w-full my-14">
      <input className="w-[60%] py-2 px-3 border border-teal-500 rounded-lg " />
      <Button>댓글쓰기</Button>
    </form>
  );
}
