import React from "react";
import { ICONS } from "../../../../public/assets/icons";
import Image from "next/image";

interface ImageIconProps {
  name: keyof typeof ICONS;
  size?: "medium";
}

export default function ImageIcon({ name, size = "medium" }: ImageIconProps) {
  const icon = ICONS[name];

  return <Image className={`cursor-pointer`} src={icon} alt={name} width={SIZE_VARIANT[size].width} height={SIZE_VARIANT[size].height} />;
}

const SIZE_VARIANT = {
  medium: { width: 50, height: 50 },
};
