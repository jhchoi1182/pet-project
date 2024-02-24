import Button from "@/components/atoms/base/Button";
import useTodoContentsUpdate from "@/controller/postController/useTodoContentsUpdate";
import todoService from "@/service/todoService";

interface TodoUpdateButtonProps {
  todoId: number;
  editableTodo: {
    contents: string;
    dueDate: string;
  };
  toggleEditMode: boolean;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoUpdateButton({ todoId, editableTodo, toggleEditMode, setToggleEditMode }: TodoUpdateButtonProps) {
  const { contents, dueDate } = editableTodo;
  const { mutate } = useTodoContentsUpdate(todoId, contents, dueDate);
  const { handleUpdate } = todoService();
  return (
    <>
      {toggleEditMode ? (
        <Button variant="update" size="small" onClick={() => handleUpdate({ editableTodo, mutate, setToggleEditMode })}>
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
