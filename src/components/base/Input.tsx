import React from "react";

interface LabelWithInputProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "login" | "signup" | "todo";
  label: string;
  name: string;
  children: React.ReactElement;
}

export default function Input({ variant, label, name, children }: LabelWithInputProps) {
  return (
    <div className="flex items-center">
      <label htmlFor={label} className={`${LABEL_VARIANTS[variant]} font-bold`}>
        {label}
      </label>
      {React.cloneElement(children, {
        id: label,
        name: name,
        ...children.props,
      })}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "login" | "signup" | "todo";
}

Input.TextField = function InputText({ variant, ...props }: InputProps) {
  return <input className={`${INPUT_VARIANTS[variant]} rounded-lg`} {...props} />;
};

const LABEL_VARIANTS = {
  login: "w-36 text-2xl",
  signup: "w-36 text-xl",
  todo: "mr-5",
};

const INPUT_VARIANTS = {
  login: "px-2 py-[6px]",
  signup: "px-2 py-[6px]",
  todo: "h-8 px-3",
};
