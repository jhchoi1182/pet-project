import { todoApi } from "@/api/todoApi";
import Button from "@/components/base/Button";
import { QueryContext } from "@/context/QueryContextProvider";
import useUpdateFetch from "@/hooks/useUpdateFetch";
import exceptionService from "@/service/exceptionService";
import React, { useContext } from "react";

interface TodoUpdateButtonProps {
  todoId: number;
  editableContents: string;
  editableDueDate: string;
  toggleEditMode: boolean;
  setToggleEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoUpdateButton({
  todoId,
  editableContents,
  editableDueDate,
  toggleEditMode,
  setToggleEditMode,
}: TodoUpdateButtonProps) {
  const { setTotalData } = useContext(QueryContext);

  const { mutate: updateMutate } = useUpdateFetch({
    queryKey: `todo_${todoId}`,
    queryFn: () => todoApi.modify(todoId, editableContents, editableDueDate),
    onSuccess: (data) => {
      setTotalData((prev) => ({
        ...prev,
        [`todo_${todoId}`]: data,
      }));
    },
    onError: (error) => {
      exceptionService(error);
    },
  });

  const handleUpdate = () => {
    if (editableContents === "" || editableDueDate === "") return;
    updateMutate();
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
