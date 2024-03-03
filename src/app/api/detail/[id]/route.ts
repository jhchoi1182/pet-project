// 매개 변수로 받는 거 있으면 반드시 request: NextRequest 넣어줘야 함.

// export async function GET(request: NextRequest, { params: { id } }: paramsId) {
//   try {
//     const collection = await connectToMongo();
//     const todo = await collection.findOne({ _id: new ObjectId(id) });

//     if (!todo) {
//       return new Response(JSON.stringify({ message: "투두를 찾을 수 없습니다." }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify({ todo }));
//   } catch (error) {
//     console.error("디테일 투두 GET :", error);
//     return new Response(JSON.stringify({ message: "투두 조회 중에 오류가 발생했습니다." }), { status: 500 });
//   }
// }
