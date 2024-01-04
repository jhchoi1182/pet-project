import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "delete" | "update";
  size?: "small" | "medium" | "big";
}

export default function Button({
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${TYPE_VARIANTS[variant]} ${SIZE_VARIANTS[size]} rounded-lg shadow-sm ${className}`}
      {...props}
    />
  );
}

const TYPE_VARIANTS = {
  primary: "bg-teal-400 font-bold",
  delete: "border-2 border-red-500",
  update: "border-2 border-green-600",
};

const SIZE_VARIANTS = {
  small: "w-32 h-10",
  medium: "w-36 h-10",
  big: "w-40 h-12 text-[24px]",
};
