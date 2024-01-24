import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type SetStateString = React.Dispatch<React.SetStateAction<string>>;
type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;
interface HandlePostParametor {
  event: React.FormEvent<HTMLFormElement>;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>;
  comment: string;
  setComment: SetStateString;
}
interface HandleUpdateParametor {
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, void, unknown>;
  commentContents: string;
  setToggleEditMode: SetStateBoolean;
}

function commentService() {
  const handlePost = ({ event, mutate, comment, setComment }: HandlePostParametor) => {
    event.preventDefault();
    if (comment === "") return;
    mutate(comment);
    setComment("");
  };

  const handleInputChange = (event: InputEvent, setComment: SetStateString) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleUpdate = ({ commentContents, mutate, setToggleEditMode }: HandleUpdateParametor) => {
    if (commentContents === "") return;
    mutate();
    setToggleEditMode(false);
  };

  return { handleInputChange, handlePost, handleUpdate };
}

export default commentService;
