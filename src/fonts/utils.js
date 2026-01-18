import { last, range } from "@app/utils";

const findBreaks = (lines) => {
  const breaks = [];

  const lastLine = last(lines);
  const lineLength = lastLine.length;

  for (const index of range(lineLength)) {
    if (lastLine[index] === "|") {
      breaks.push(index);
    }
  }

  breaks.push(lineLength);

  return breaks;
};

export const makeCharacterKvps = (characters, line) => {
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
