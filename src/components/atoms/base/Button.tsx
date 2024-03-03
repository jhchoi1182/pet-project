import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "timer";
  color?: "primary" | "red";
  size?: "tiny" | "small" | "medium" | "timer";
}

export default function Button({ variant = "primary", color = "primary", size = "medium", className = "", ...props }: ButtonProps) {
  return <button className={`${TYPE_VARIANTS[variant]} ${COLOR_VARIANTS[color]} ${SIZE_VARIANTS[size]} rounded-full shadow-sm ${className}`} {...props} />;
}

const TYPE_VARIANTS = {
  primary: `bg-yellow`,
  timer: `border border-1 bg-inverse`,
};

const COLOR_VARIANTS = {
  primary: `text-primary`,
  red: `text-red500`,
};

const SIZE_VARIANTS = {
  tiny: `w-[96px] h-8 text-body03`,
  small: `w-[109px] h-[48px] text-btn02`,
  medium: `w-[144px] h-[48px] text-btn01`,
  timer: `w-[108px] h-[52px] text-btn03`,
};
