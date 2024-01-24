export interface HandleLoginParameter {
  username: string;
  password: string;
}
export interface HandleSignupParameter extends HandleLoginParameter {
  isPassDuplication: boolean;
  passwordConfirm: string;
}