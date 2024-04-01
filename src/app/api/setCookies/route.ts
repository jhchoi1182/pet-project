import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  try {
    cookies().set({
      name: "Access_Token",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return new Response(JSON.stringify({ message: "Success" }));
  } catch (error) {
    console.log("쿠키 생성 ERROR :", error);
    return new Response(JSON.stringify({ message: "쿠키 생성 중 오류가 발생했습니다." }), { status: 500 });
  }
}
