

export interface HandlePostParameter {
  event: React.FormEvent<HTMLFormElement>;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>;
  comment: string;
  setComment: SetStateString;
}
export interface HandleUpdateParameter {
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, void, unknown>;
  commentContents: string;
  setToggleEditMode: SetStateBoolean;
}