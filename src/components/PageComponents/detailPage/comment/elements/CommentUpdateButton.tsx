import Button from "@/components/atoms/base/Button";
import useUpdateComment from "@/controller/commentController/useUpdateComment";
import commentService from "@/service/commentService";

interface CommentUpdateButtonProps {
  todoId: number;
  commentId: number;
  commentContents: string;
  toggleEditMode: boolean;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentUpdateButton({ todoId, commentId, commentContents, toggleEditMode, setToggleEditMode }: CommentUpdateButtonProps) {
  const { mutate } = useUpdateComment(todoId, commentId, commentContents);

  const { handleUpdate } = commentService();

  return (
    <>
      {toggleEditMode ? (
        <Button variant="update" size="small" onClick={() => handleUpdate({ commentContents, mutate, setToggleEditMode })}>
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
