"use client";

import Button from "@/components/atoms/base/Button";
import Input from "@/components/atoms/base/Input";
import useCreatePostController from "@/controller/postController/useCreatePostController";
import React, { useState } from "react";

export default function PostForm() {
  const [enteredValue, setEnteredValue] = useState({
    title: "",
    contents: "",
  });
  const { mutate } = useCreatePostController(setEnteredValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEnteredValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!window.confirm("작성된 글을 게시하시겠습니까?")) return;
    mutate(enteredValue);
  };

  return (
    <form className={`flex flex-col w-[70%] h-full`} onSubmit={handleSubmit}>
      <div className="w-full">
        <Input variant="post" label="제목" name="title" isPost>
          <Input.TextField variant="post" value={enteredValue.title} onChange={handleInputChange} required />
        </Input>
      </div>
      <div className={`flex flex-col w-full h-full`}>
        <div className={`mt-10 w-full h-full`}>
          <Input variant="post" label="내용" name="contents" isPost>
            <Input.TextArea variant="post" value={enteredValue.contents} onChange={handleInputChange} required />
          </Input>
        </div>
        <div className={`pt-14 self-end mt-auto mb-[14px]`}>
          <Button>작성하기</Button>
        </div>
      </div>
    </form>
  );
}
