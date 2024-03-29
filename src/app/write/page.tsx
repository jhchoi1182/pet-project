"use client";

import Board from "@/components/atoms/ui/Board";
import BoardTab from "@/components/atoms/ui/BoardTab";
import "../../styles/ckeditor.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/atoms/ui/LoadingSpinner";
import { useSearchParams } from "next/navigation";
const PostForm = dynamic(() => import("@/components/write/template/PostForm"), { ssr: false });

export default function WritePage() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (type === "create") return;
  }, []);

  return (
    <main className={`relative w-[72%] min-w-[1098px] h-full`}>
      <BoardTab />
      <Board className={`relative p-14`}>
        {isLoading && (
          <div className={`absolute top-1/2 left-1/2`}>
            <LoadingSpinner />
          </div>
        )}
        <PostForm setIsLoading={setIsLoading} />
      </Board>
    </main>
  );
}
