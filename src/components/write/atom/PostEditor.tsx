"use client";

import React, { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { SetStateString } from "@/types/type/utilityTypes";
import Editor from "ckeditor5-custom-build/build/ckeditor";

interface PostEditorProps {
  ckEditorData: string;
  setCkEditorData: SetStateString;
}
export default function PostEditor({ ckEditorData, setCkEditorData }: PostEditorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const adjustEditorHeight = () => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      document.documentElement.style.setProperty("--ckeditorHeight", `${containerHeight - 120}px`);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", adjustEditorHeight);
    return () => {
      window.removeEventListener("resize", adjustEditorHeight);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full grow">
      <CKEditor
        editor={Editor}
        data={ckEditorData}
        config={{
          placeholder: "내용을 입력해주세요.",
        }}
        onReady={() => {
          adjustEditorHeight();
        }}
        onFocus={() => {
          adjustEditorHeight();
        }}
        onBlur={() => {
          adjustEditorHeight();
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          setCkEditorData(data);
        }}
      />
    </div>
  );
}
