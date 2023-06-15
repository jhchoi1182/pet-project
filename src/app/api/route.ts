const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MOGO_DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function POST(request: Request) {
  const todo = await request.json();
  console.log(todo);

  const mongoClient = await client.connect();
  const db = mongoClient.db("todos");
  const collection = db.collection("todo");
  const result = await collection.insertOne({ todo });

  return new Response(JSON.stringify({ message: "성공" }));
}
