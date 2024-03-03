import { TEXT_COLOR } from "@/styles/colors";
import React from "react";

interface LabelWithInputProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "login" | "signup" | "post";
  label: string;
  name: string;
  isPost?: boolean;
  children: React.ReactElement;
}

export default function Input({ variant, label, name, isPost = false, children }: LabelWithInputProps) {
  return (
    <div className={`flex items-center ${isPost ? "flex-col w-full h-full" : ""}`}>
      <label htmlFor={label} className={`${LABEL_VARIANTS[variant]} text-body02 ${TEXT_COLOR.inverse}`}>
        {label}
      </label>
      {React.cloneElement(children, {
        id: label,
        name,
        ...children.props,
      })}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "login" | "signup" | "post";
}

Input.TextField = function InputText({ variant, ...props }: InputProps) {
  return <input className={`${INPUT_VARIANTS[variant]} outline-none rounded-lg`} {...props} />;
};

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  variant: "login" | "signup" | "post";
}

Input.TextArea = function TextAreaText({ variant, ...props }: TextareaProps) {
  return <textarea className={`p-3 w-full h-full outline-none rounded-lg leading-6`} {...props} />;
};

const LABEL_VARIANTS = {
  login: `w-36`,
  signup: `w-[184px]`,
  post: `mr-auto mb-6`,
};

const INPUT_VARIANTS = {
  login: `px-3 w-[324px] h-[47px]`,
  signup: `px-3 w-[283px] h-[47px]`,
  post: `px-3 w-full h-[47px]`,
};
