import { ButtonHTMLAttributes } from "react";
import { BG_COLOR, TEXT_COLOR } from "@/styles/colors";
import { FONT_VARIANTS } from "@/styles/fonts";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "timer";
  color?: "primary" | "red";
  size: "small" | "medium" | "timer";
}

export default function Button({
  variant = "primary",
  color = "primary",
  size,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${TYPE_VARIANTS[variant]} ${COLOR_VARIANTS[color]} ${SIZE_VARIANTS[size]} rounded-full shadow-sm ${className}`}
      {...props}
    />
  );
}

const TYPE_VARIANTS = {
  primary: `${BG_COLOR.yellow}`,
  timer: `border border-1 ${BG_COLOR.inverse}`,
};

const COLOR_VARIANTS = {
  primary: `${TEXT_COLOR.primary}`,
  red: `${TEXT_COLOR.red500}`,
};

const SIZE_VARIANTS = {
  small: `w-[109px] h-[48px] ${FONT_VARIANTS.btn02}`,
  medium: `w-[144px] h-[48px] ${FONT_VARIANTS.btn01}`,
  timer: `w-[108px] h-[52px] ${FONT_VARIANTS.btn03}`,
};
