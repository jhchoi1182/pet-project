import { Electrolize, Ubuntu } from "next/font/google";

const electrolize = Electrolize({ weight: "400", subsets: ["latin"] });
const ubuntu = Ubuntu({ weight: "500", subsets: ["latin"] });

const font = {
  elec: electrolize.className,
  ubuntu: ubuntu.className,
};

const fontWeight = {
  semi: `font-semibold`,
  mid: `font-medium`,
};

export const FONT_VARIANTS = {
  logo: `text-[42px] ${font.ubuntu}`,
  body01: `text-[24px]`,
  body02: `text-[24px] ${fontWeight.semi}`,
  body03: `text-[16px]`,
  btn01: `text-[28px] ${fontWeight.mid}`,
  btn02: `text-[20px] ${fontWeight.semi}`,
  btn03: `text-[26px] ${font.elec}`,
  time01: `text-[24px] ${font.elec}`,
  time02: `text-[42px] ${font.elec}`,
  time03: `text-[60px] ${font.elec}`,
  time04: `text-[16px] ${fontWeight.mid}`,
  selectInput: `text-[20px] ${fontWeight.semi}`,
  info: `text-[16px] ${font.elec}`,
  days: `text-[26px] ${fontWeight.mid}`,
};
