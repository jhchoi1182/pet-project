import PostDetailButton from "@/components/postDetail/atom/PostDetailButton";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostEditor from "../atom/PostEditor";
import { SetStateBoolean } from "@/types/type/utilityTypes";
import { extractBase64Images, replaceImgTagWithTempTag } from "@/util/ckeditorImageTransformer";
import useCreatePostMutation from "@/service/post/useCreatePostMutation";
import useUpdatePostMutation from "@/service/post/useUpdatePostMutation";
import useAlertBeforeUnload from "@/service/hooks/useBeforeUnload";
import Select from "@/components/atoms/base/Select";
import { UnionOfCategoryAtCreate } from "@/types/type/post";

interface PostFormProps {
  isCreate: boolean;
  setIsLoading: SetStateBoolean;
}

const categoryType = ["잡담", "모집", "정보", "질문"] as const;

export default function PostForm({ isCreate, setIsLoading }: PostFormProps) {
  const savedPostId = Number(sessionStorage.getItem("savedPostId")) ?? 0;
  const savedCategory = (sessionStorage.getItem("savedCategory") as UnionOfCategoryAtCreate) ?? "";
  const savedTitle = sessionStorage.getItem("savedTitle") ?? "";
  const savedContents = sessionStorage.getItem("savedContents") ?? "";

  const [title, setTitle] = useState(() => (isCreate ? "" : savedTitle));
  const [category, setCategory] = useState<UnionOfCategoryAtCreate>(() => (isCreate ? categoryType[0] : savedCategory));
  const [ckEditorData, setCkEditorData] = useState(() => (isCreate ? "" : savedContents));
  const router = useRouter();

  const { mutate: createPost } = useCreatePostMutation();
  const { mutate: updatePost } = useUpdatePostMutation(savedPostId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contents = replaceImgTagWithTempTag(ckEditorData);
    const images = extractBase64Images(ckEditorData);
    if (!window.confirm("글을 게시하시겠습니까?")) return;
    if (title === "" || ckEditorData === "") return alert("내용을 다시 확인해주세요.");
    const reqData = { category, title, contents, images };
    isCreate ? createPost(reqData) : updatePost(reqData);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);
  useAlertBeforeUnload();

  return (
    <form className={`w-full h-full`} onSubmit={handleSubmit}>
      <div className={`mb-5`}>
        <Select name="category" selectedValue={category} onChange={(e) => setCategory(e.target.value as UnionOfCategoryAtCreate)}>
          {categoryType.map((category) => (
            <Select.Option key={category} value={category} />
          ))}
        </Select>
      </div>
      <div className={`flex justify-between mb-10`}>
        <div className="w-[70%]">
          <input
            className={`w-full px-1 pb-3 border-b-2 text-xl focus:outline-none`}
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
