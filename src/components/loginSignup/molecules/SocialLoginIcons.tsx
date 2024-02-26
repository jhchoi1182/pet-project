import ImageIcon from "@/components/atoms/icons/ImageIcon";
import { googleClientId, googleRedirectURI } from "@/config/envConfig";
import Link from "next/link";
import React from "react";

const googleURL =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `redirect_uri=${googleRedirectURI}&` +
  `client_id=${googleClientId}&` +
  `response_type=code&` +
  `scope=${["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"].join(" ")}`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?` + `client_id=${""}&` + `redirect_uri=${""}&` + `response_type=code&`;
const githubURL = `https://github.com/login/oauth/authorize?` + `client_id=${""}&`;

export default function SocialLoginIcons() {
  return (
    <div className={`flex justify-center gap-14 mt-10`}>
      <Link href={kakaoURL}>
        <ImageIcon name="kakao" />
      </Link>
      <Link href={googleURL}>
        <ImageIcon name="google" />
      </Link>
      <Link href={githubURL}>
        <ImageIcon name="github" />
      </Link>
    </div>
  );
}
