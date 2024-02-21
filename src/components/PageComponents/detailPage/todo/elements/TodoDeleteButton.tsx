import Button from "@/components/atoms/base/Button";
import useTodoDelete from "@/controller/todoController/useTodoDelete";
import todoService from "@/service/todoService";

export default function TodoDeleteButton({ todoId }: { todoId: number }) {
  const { mutate } = useTodoDelete(todoId, "push");
  const { handleDelete } = todoService();
  return (
    <Button variant="delete" size="small" onClick={() => handleDelete(mutate)}>
      삭제
    </Button>
  );
}
