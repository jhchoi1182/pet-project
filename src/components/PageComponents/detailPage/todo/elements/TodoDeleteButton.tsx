import { todoApi } from "@/api/todoApi";
import Button from "@/components/base/Button";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import { useRouter } from "next/navigation";
import React from "react";

export default function TodoDeleteButton({ todoId }: { todoId: number }) {
  const router = useRouter();

  const { mutate: deleteMutate } = useUpdateFetch({
    queryKey: `todo_${todoId}`,
    queryFn: () => todoApi.delete(todoId),
    onSuccess: () => {
      router.push("/todo");
    },
  });

  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteMutate(todoId);
    }
  };

  return (
    <Button variant="delete" size="small" onClick={handleDelete}>
      삭제
    </Button>
  );
}
