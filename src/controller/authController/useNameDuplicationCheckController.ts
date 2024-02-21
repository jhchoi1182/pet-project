import { authApi } from "@/api/authApi";
import { NameInputType } from "@/components/loginSignup/molecules/NameInput";
import { nameDuplicationAtom } from "@/stateStore/authAtom";
import { ErrorResponse } from "@/types/response/ErrorResponse";
import axios from "axios";
import { useSetRecoilState } from "recoil";

interface NameDuplicationCheckControllerParameter {
  type: NameInputType;
  username: string;
  nickname: string;
}

function useNameDuplicationCheckController() {
  const setNameDuplication = useSetRecoilState(nameDuplicationAtom);
  const checkDuplication = async ({
    type,
    username,
    nickname,
  }: NameDuplicationCheckControllerParameter) => {
    if (type === "username") {
      try {
        await authApi.checkUsername(username);
        setNameDuplication((prevState) => ({
          ...prevState,
          isUsernameAvailable: true,
        }));
      } catch (error) {
        if (!axios.isAxiosError(error)) return console.error(error);
        const { status } = (error as ErrorResponse).response;
        // setValidationTextColor(TextColor.RED);
        setNameDuplication((prevState) => ({
          ...prevState,
          isUsernameAvailable: false,
        }));
        // if (status === 400) return setCheckResultText("잘못된 입력값입니다.");
        // if (status === 409)
        //   return setCheckResultText("이미 사용 중인 아이디입니다.");
      }
    } else {
      try {
        await authApi.checkNickname(nickname);
        setNameDuplication((prevState) => ({
          ...prevState,
          isNicknameAvailable: true,
        }));
      } catch (error) {
        if (!axios.isAxiosError(error)) return console.error(error);
        const { status } = (error as ErrorResponse).response;
        // setValidationTextColor(TextColor.RED);
        setNameDuplication((prevState) => ({
          ...prevState,
          isNicknameAvailable: false,
        }));
        // if (status === 400) return setCheckResultText("잘못된 입력값입니다.");
        // if (status === 409)
        //   return setCheckResultText("이미 사용 중인 아이디입니다.");
      }
    }
  };
  return { checkDuplication };
}

export default useNameDuplicationCheckController;
