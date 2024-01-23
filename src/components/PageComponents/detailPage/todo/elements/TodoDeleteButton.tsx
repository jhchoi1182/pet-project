import { todoApi } from "@/api/todoApi";
import Button from "@/components/base/Button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function TodoDeleteButton({ todoId }: { todoId: number }) {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: () => todoApi.delete(todoId),
    onSuccess: () => {
      router.push("/todo");
    },
  });

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      mutate();
    }
  };

  return (
    <Button variant="delete" size="small" onClick={handleDelete}>
      삭제
    </Button>
  );
}
