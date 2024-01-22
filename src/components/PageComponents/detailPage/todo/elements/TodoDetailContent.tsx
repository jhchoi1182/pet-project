import useTodoFormDate from "@/hooks/useTodoFormDate";
import React from "react";

interface TodoDetailContentProps {
  editableContents: string;
  editableDueDate: string;
  setEditableTodo: React.Dispatch<
    React.SetStateAction<{
      contents: string;
      dueDate: string;
    }>
  >;
  toggleEditMode: boolean;
}

function TodoDetailContent({
  editableContents,
  editableDueDate,
  setEditableTodo,
  toggleEditMode,
}: TodoDetailContentProps) {
  const { onChangeHandler } = useTodoFormDate(setEditableTodo);

  const timeElement = (
    <time className="font-bold">
      <span>목표 날짜:</span>
      <div>
        {toggleEditMode ? (
          <input type="date" name="dueDate" value={editableDueDate} onChange={onChangeHandler} />
        ) : (
          editableDueDate
        )}
      </div>
    </time>
  );

  const articleElement = (
    <article className={"mt-14 mb-10"}>
      {toggleEditMode ? (
        <textarea
          className="border w-full h-32"
          name="contents"
          value={editableContents}
          onChange={onChangeHandler}
          required
        />
      ) : (
        <p className="whitespace-pre-wrap">{editableContents}</p>
      )}
    </article>
  );

  return { timeElement, articleElement };
}

export default TodoDetailContent;
