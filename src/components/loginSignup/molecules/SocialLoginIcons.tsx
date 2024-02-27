import ImageIcon from "@/components/atoms/icons/ImageIcon";
import { googleClientId, googleRedirectURI } from "@/config/envConfig";
import Link from "next/link";
import React from "react";

const googleURL =
  `https://accounts.google.com/o/oauth2/v2/auth?` +
  `redirect_uri=${googleRedirectURI}&` +
  `client_id=${googleClientId}&` +
  `response_type=code&` +
  `scope=https://www.googleapis.com/auth/userinfo.email`;

export default function SocialLoginIcons() {
  return (
    <div className={`flex justify-center gap-14 mt-10`}>
      <Link href={googleURL}>
        <ImageIcon name="google" />
      </Link>
    </div>
  );
}
