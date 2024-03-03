import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "jhchoi1182",
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  database: "test-db",
});

export async function POST(request: NextRequest) {
  try {
    const { title, contents } = await request.json();
    await createTodo(title, contents);
    const todos = await getTodos();
    return NextResponse.json({ todos });
  } catch (error) {
    console.error("투두 POST :", error);
    return new NextResponse(JSON.stringify({ message: "투두 생성 중에 오류가 발생했습니다." }), { status: 500 });
  }
}

export async function GET() {
  try {
    const todos = await getTodos();
    return NextResponse.json({ todos });
  } catch (error) {
    console.error("투두 GET :", error);
    return new NextResponse(JSON.stringify({ message: "서버에서 투두를 불러오는 중에 오류가 발생했습니다." }), {
      status: 500,
    });
  }
}

export async function createTodo(title: string, contents: string) {
  const query = "INSERT INTO todo (title, contents, isDone) VALUES (?, ?, ?)";
  const [result] = await pool.execute(query, [title, contents, false]);
  console.log(`A new todo has been added with the id: ${result}`);
}

export async function getTodos() {
  const query = "SELECT * FROM todo";
  const [rows] = await pool.query(query);
  return rows;
}
