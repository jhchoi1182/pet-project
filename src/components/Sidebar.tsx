import React from "react";
import Button from "./base/Button";
import { FONT_VARIANTS } from "@/styles/fonts";
import { TEXT_COLOR } from "@/styles/colors";
import Link from "next/link";
import Input from "./base/Input";

export default function Sidebar() {
  return (
    <section className={`flex flex-col items-center w-[28%] h-full`}>
      <Link href={"/home"} className="mt-16">
        <h1 className={`${FONT_VARIANTS.logo} ${TEXT_COLOR.yellow}`}>
          StudySync
        </h1>
      </Link>
      <div className={`mt-[60px]`}>
        <Button size="medium">로그인</Button>
      </div>
      <form className="flex flex-col h-full">
        <div className={`mt-20`}>
          <Input variant="post" label="제목" name="title" isPost>
            <Input.TextField variant="post" />
          </Input>
        </div>
        <div className="flex flex-col h-full">
          <div className="mt-10 h-full">
            <Input variant="post" label="내용" name="contents" isPost>
              <Input.TextArea variant="post" />
            </Input>
          </div>
          <div className="pt-14 self-end mt-auto mb-[14px]">
            <Button size="medium">작성하기</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
