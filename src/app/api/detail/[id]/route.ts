import { paramsId } from "../../todo/[id]/route";
import { ObjectId } from "mongodb";
import { connectToMongo } from "../../todo/route";
import { NextRequest } from "next/server";

// 매개 변수로 받는 거 있으면 반드시 request: NextRequest 넣어줘야 함.

export async function GET(request: NextRequest, { params: { id } }: paramsId) {
  const collection = await connectToMongo();
  const todos = await collection.findOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ todos }));
}