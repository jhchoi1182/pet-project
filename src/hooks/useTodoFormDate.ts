import React from "react";

const useTodoFormDate = (
  setTodoInput: React.Dispatch<
    React.SetStateAction<{
      contents: string;
      dueDate: string;
    }>
  >,
) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === "dueDate" && isPastDate(value)) {
      alert("과거의 날짜는 선택할 수 없습니다.");
    } else {
      setTodoInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isPastDate = (value: string) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate;
  };
  return { onChangeHandler };
};

export default useTodoFormDate;
