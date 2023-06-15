import { MongoClient, ServerApiVersion } from "mongodb";
import { NextRequest } from "next/server";
const uri = process.env.MOGO_DB_URI ?? "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: false,
  },
});

export async function connectToMongo() {
  try {
    const mongo = await client.connect();
    return mongo.db("todos").collection("todo");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export async function GET() {
  try {
    const collection = await connectToMongo();
    const todos = await collection.find({}).toArray();
    return new Response(JSON.stringify({ todos }));
  } catch (error) {
    console.log("투두 GET :", error);
    return new Response(JSON.stringify({ message: "서버에서 투두를 불러오는 중에 오류가 발생했습니다." }), {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const todo = await request.json();
    const collection = await connectToMongo();
    await collection.insertOne({ ...todo });
    const todos = await collection.find({}).toArray();
    return new Response(JSON.stringify({ todos }));
  } catch (error) {
    console.log("투두 POST :", error);
    return new Response(JSON.stringify({ message: "투두 생성 중에 오류가 발생했습니다." }), { status: 500 });
  }
}
