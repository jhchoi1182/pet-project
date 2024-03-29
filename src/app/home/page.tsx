import BoardTab from "@/components/atoms/ui/BoardTab";
import PostBoard from "@/components/postBoard/template/PostBoard";

export default function Home() {
  return (
    <main className={`w-[72%] min-w-[1098px] h-full`}>
      <BoardTab />
      <PostBoard />
    </main>
  );
}
