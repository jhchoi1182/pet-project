import { todoApi } from "@/api/todoApi";
import Button from "@/components/base/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TodoUpdateButtonProps {
  todoId: number;
  editableTodo: {
    contents: string;
    dueDate: string;
  };
  toggleEditMode: boolean;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoUpdateButton({
  todoId,
  editableTodo: { contents, dueDate },
  toggleEditMode,
  setToggleEditMode,
}: TodoUpdateButtonProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => todoApi.modify(todoId, contents, dueDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });

  const handleUpdate = () => {
    if (contents === "" || dueDate === "") return;
    mutate();
    setToggleEditMode(false);
  };

  return (
    <>
      {toggleEditMode ? (
        <Button variant="update" size="small" onClick={handleUpdate}>
          완료
        </Button>
      ) : (
        <Button variant="update" size="small" onClick={() => setToggleEditMode(true)}>
          수정
        </Button>
      )}
    </>
  );
}
