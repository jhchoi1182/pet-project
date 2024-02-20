"use client";

import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <h1 className="">페이지를 찾을 수 없습니다.</h1>
      <Link href={"/home"}>메인 페이지로 이동</Link>
    </div>
  );
};
export default NotFoundPage;
