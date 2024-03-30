import React from "react";

interface LabelWithInputProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "login" | "signup" | "hideLabel";
  label: string;
  name: string;
  hideLabel?: boolean;
  children: React.ReactElement;
}

export default function Input({ variant, label, name, children }: LabelWithInputProps) {
  return (
    <div className={`flex items-center`}>
      {variant !== "hideLabel" && (
        <label htmlFor={label} className={`${LABEL_VARIANTS[variant]} text-body02 text-inverse`}>
          {label}
        </label>
      )}
      {React.cloneElement(children, {
        id: label,
        name,
        ...children.props,
      })}
    </div>
  );
}

const LABEL_VARIANTS = {
  login: `w-36`,
  signup: `w-[184px]`,
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "primary" | "login";
}

Input.TextField = function InputText({ variant, ...props }: InputProps) {
  return <input className={`${INPUT_VARIANTS[variant]} outline-none rounded-lg`} {...props} />;
};

const INPUT_VARIANTS = {
  primary: `px-3 w-[283px] h-[47px]`,
  login: `px-3 w-[324px] h-[47px]`,
};
