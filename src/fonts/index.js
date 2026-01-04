import { fontMap1 } from "./font1";
import { fontMap2 } from "./font2";

export const fonts = [
  {
    name: "Font 1",
    fontMap: fontMap1,
    numVerticalDots: fontMap1.values().next().value.lines.length,
  },
  {
    name: "Font 2",
    fontMap: fontMap2,
    numVerticalDots: fontMap2.values().next().value.lines.length,
  },
];
