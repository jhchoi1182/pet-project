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
  const mongo = await client.connect();
  return mongo.db("todos").collection("todo");
}

export async function GET() {
  const collection = await connectToMongo();
  const todos = await collection.find({}).toArray();
  return new Response(JSON.stringify({ todos }));
}

export async function POST(request: NextRequest) {
  const todo = await request.json();
  const collection = await connectToMongo();
  await collection.insertOne({ ...todo });
  const todos = await collection.find({}).toArray();
  return new Response(JSON.stringify({ todos }));
}
