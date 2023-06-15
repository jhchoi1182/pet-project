import { NextRequest } from "next/server";
import { connectToMongo } from "../route";
import { ObjectId } from "mongodb";

export type paramsId = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, { params: { id } }: paramsId) {
  const collection = await connectToMongo();
  await collection.deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ message: "삭제 성공!" }));
}
