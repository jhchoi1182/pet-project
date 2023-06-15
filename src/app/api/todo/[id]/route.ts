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

export async function PATCH(request: NextRequest, { params: { id } }: paramsId) {
  const isDone = await request.json();
  const collection = await connectToMongo();
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { isDone: !isDone } });
  const todos = await collection.find({}).toArray();
  return new Response(JSON.stringify({ todos }));
}
