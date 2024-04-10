import { cookies } from "next/headers";
import ViewRecordInitializerEffect from "@/components/features/ViewRecordInitializerEffect";

async function getPostViewRecordCookie() {
  return cookies().get("postViewRecord");
}

export default async function ViewRecordCookieInitializer() {
  const postViewRecordCookie = await getPostViewRecordCookie();

  return <ViewRecordInitializerEffect postViewRecordCookie={postViewRecordCookie} />;
}
