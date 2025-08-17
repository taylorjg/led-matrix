import { range } from "@app/utils";

// https://github.com/petykowski/London-Underground-Dot-Matrix-Typeface/blob/master/resources/examples/London-Underground-Medium.png
export const uppercaseLetters = `
                                               
     xxx     xxxxxxxx      xxxxxx   xxxxxxxx   
     xxx     xxxxxxxxx    xxxxxxxx  xxxxxxxxx  
    xx xx    xx     xx   xxx    xxx xx     xxx 
    xx xx    xx     xx   xx      xx xx      xx 
   xx   xx   xx     xx  xx          xx       xx
   xx   xx   xxxxxxxx   xx          xx       xx
   xx   xx   xxxxxxxxx  xx          xx       xx
  xx     xx  xx     xxx xx          xx       xx
  xxxxxxxxx  xx      xx xx          xx       xx
  xxxxxxxxx  xx      xx  xx      xx xx      xx 
 xx       xx xx     xxx  xxx    xxx xx     xxx 
 xx       xx xxxxxxxxx    xxxxxxxx  xxxxxxxxx  
 xx       xx xxxxxxxx      xxxxxx   xxxxxxxx   
                                               `;

const findBreaks = (lines) => {
  const lineLength = lines[0].length;
  const breaks = [];
  for (const index of range(lineLength)) {
    if (lines.every((line) => line[index] === " ")) {
      breaks.push(index);
    }
  }
  breaks.push(lineLength);
  return breaks;
};

const makeCharacterKvps = (characters, line) => {
  const lines = line.split("\n").filter(Boolean);
  const chs = Array.from(characters);
  const breaks = findBreaks(lines);

  console.assert(breaks.length == chs.length + 1);

  return chs.map((ch, index) => {
    const start = breaks[index];
    const end = breaks[index + 1] - 1;
    return [ch, { lines, start, end }];
  });
};

export const fontMap = new Map([
  ...makeCharacterKvps("ABCD", uppercaseLetters),
]);
