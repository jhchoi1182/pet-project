import Button from "@/components/atoms/base/Button";
import useUpdateCommentController from "@/controller/commentController/useUpdateCommentController";
import commentService from "@/service/commentService";

interface CommentUpdateButtonProps {
  todoId: number;
  commentId: number;
  commentContents: string;
  toggleEditMode: boolean;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentUpdateButton({ todoId, commentId, commentContents, toggleEditMode, setToggleEditMode }: CommentUpdateButtonProps) {
  const { mutate } = useUpdateCommentController(todoId, commentId, commentContents);

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
