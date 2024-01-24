import todoService from "@/service/todoService";
import React from "react";

interface TodoDetailContentProps {
  editableTodo: {
    contents: string;
    dueDate: string;
  };
  setEditableTodo: React.Dispatch<
    React.SetStateAction<{
      contents: string;
      dueDate: string;
    }>
  >;
  toggleEditMode: boolean;
}

function TodoDetailContent({
  editableTodo: { contents, dueDate },
  setEditableTodo,
  toggleEditMode,
}: TodoDetailContentProps) {
  const { handleInputChange } = todoService();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleInputChange(event, setEditableTodo);
  };

  const timeElement = (
    <time className="font-bold">
      <span>목표 날짜:</span>
      <div>
        {toggleEditMode ? (
          <input type="date" name="dueDate" value={dueDate} onChange={onChangeHandler} />
        ) : (
          dueDate
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
          value={contents}
          onChange={onChangeHandler}
          required
        />
      ) : (
        <p className="whitespace-pre-wrap">{contents}</p>
      )}
    </article>
  );

  return { timeElement, articleElement };
}

export default TodoDetailContent;
