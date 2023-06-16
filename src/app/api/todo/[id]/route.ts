import { NextRequest } from "next/server";
import { connectToMongo } from "../route";
import { ObjectId } from "mongodb";

export type paramsId = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, { params: { id } }: paramsId) {
  try {
    const collection = await connectToMongo();
    await collection.deleteOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify({ message: "삭제 성공!" }));
  } catch (error) {
    console.error("투두 DELETE :", error);
    return new Response(JSON.stringify({ message: "투두 삭제 중에 오류가 발생했습니다." }), { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params: { id } }: paramsId) {
  try {
    const isDone = await request.json();
    const collection = await connectToMongo();
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { isDone: !isDone } });
    return new Response(JSON.stringify({ message: "업데이트 성공!." }));
  } catch (error) {
    console.error("투두 PATCH :", error);
    return new Response(JSON.stringify({ message: "투두 업데이트 중에 오류가 발생했습니다." }), { status: 500 });
  }
}
