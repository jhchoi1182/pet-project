import { NextRequest } from "next/server";
import { pool } from "../route";

export type paramsId = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, { params: { id } }: paramsId) {
  try {
    const query = "DELETE FROM todo WHERE id = ?";
    await pool.execute(query, [id]);
    return new Response(JSON.stringify({ message: "삭제 성공!" }), { status: 200 });
  } catch (error) {
    console.error("투두 DELETE :", error);
    return new Response(JSON.stringify({ message: "투두 삭제 중에 오류가 발생했습니다." }), { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: paramsId) {
  try {
    const { isDone } = await request.json();
    const query = "UPDATE todo SET isDone = ? WHERE id = ?";
    await pool.execute(query, [!isDone, id]);
    return new Response(JSON.stringify({ message: "업데이트 성공!." }), { status: 200 });
  } catch (error) {
    console.error("투두 PATCH :", error);
    return new Response(JSON.stringify({ message: "투두 업데이트 중에 오류가 발생했습니다." }), { status: 500 });
  }
}
