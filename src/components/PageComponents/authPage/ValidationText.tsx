import { TextColor } from "@/styles/textColor";
import React from "react";

interface ValidationTextProps {
  validationTextColor: TextColor;
  primaryText: string;
  exceptionalText?: string;
}

export default function ValidationText({
  validationTextColor,
  primaryText,
  exceptionalText,
}: ValidationTextProps) {
  return (
    <div
      className={`absolute top-10 left-36 select-none ${validationTextColor}`}
    >
      {exceptionalText ? exceptionalText : primaryText}
    </div>
  );
}
