export type MutateVoid = UseMutateFunction<AxiosResponse<any, any>, Error, void, unknown>;
export type SetStateString = React.Dispatch<React.SetStateAction<string>>;
export type SetStateBoolean = React.Dispatch<React.SetStateAction<boolean>>;
export type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
