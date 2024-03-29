import PostDetailButton from "@/components/postDetail/atom/PostDetailButton";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostEditor from "../atom/PostEditor";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import { extractImages, replaceImgTagWithTempTag } from "@/util/ckeditorImageTransformer";
import useCreatePostController from "@/controller/postController/useCreatePostController";
import useUpdatePostController from "@/controller/postController/useUpdatePostController";

interface PostFormProps {
  postId: number;
  savedTitle: string;
  savedContents: string;
  setIsLoading: SetStateBoolean;
}

export default function PostForm({ postId, savedTitle, savedContents, setIsLoading }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [ckEditorData, setCkEditorData] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const isCreate = type === "create";

  const { mutate: createPost } = useCreatePostController();
  const { mutate: updatePost } = useUpdatePostController(postId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contents = replaceImgTagWithTempTag(ckEditorData);
    const images = extractImages(ckEditorData);
    if (!window.confirm("글을 게시하시겠습니까?")) return;
    if (title === "" || ckEditorData === "") return alert("내용을 다시 확인해주세요.");
    const reqData = { title, contents, images };
    isCreate ? createPost(reqData) : updatePost(reqData);
  };

  useEffect(() => {
    if (isCreate) return;
    setTitle(savedTitle);
    setCkEditorData(savedContents);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <form className={`w-full h-full`} onSubmit={handleSubmit}>
      <div className={`flex justify-between mb-10`}>
        <div className="w-[70%]">
          <input
            className={`w-full px-1 pb-3 border-b-2 text-xl focus:outline-none`}
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-8">
          <PostDetailButton type="button" onClick={() => router.back()}>
            뒤로가기
          </PostDetailButton>
          <PostDetailButton>완료</PostDetailButton>
        </div>
      </div>
      <PostEditor ckEditorData={ckEditorData} setCkEditorData={setCkEditorData} />
    </form>
  );
}
