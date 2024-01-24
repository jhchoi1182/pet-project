import {
  HandlePostParameter,
  HandleUpdateParameter,
} from "@/types/parameter/commentServiceParameter";
import { InputEvent, SetStateString } from "@/types/type/utilityTypes";

function commentService() {
  const handlePost = ({ event, mutate, comment, setComment }: HandlePostParameter) => {
    event.preventDefault();
    if (comment === "") return;
    mutate(comment);
    setComment("");
  };

  const handleInputChange = (event: InputEvent, setComment: SetStateString) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleUpdate = ({ commentContents, mutate, setToggleEditMode }: HandleUpdateParameter) => {
    if (commentContents === "") return;
    mutate();
    setToggleEditMode(false);
  };

  return { handleInputChange, handlePost, handleUpdate };
}

export default commentService;
