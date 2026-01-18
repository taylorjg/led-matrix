import { first, last, range } from "@app/utils";

const findStarts = (lines) => {
  const breaks = [0];

  const lastLine = last(lines);
  const lineLength = lastLine.length;

  for (const index of range(lineLength)) {
    if (lastLine[index] === "|") {
      breaks.push(index + 1);
    }
  }

  return breaks;
};

export const makeCharacterKvps = (characters, line) => {
  const lines = line.split("\n").filter(Boolean);
  const firstLine = first(lines);
  const lineLength = firstLine.length;

  console.assert(lines.every((line) => line.length === lineLength));

  const chs = Array.from(characters);
  const starts = findStarts(lines);

  console.assert(starts.length === chs.length);

  return chs.map((ch, index) => {
    const start = starts[index];
    const end = starts[index + 1] ?? lineLength + 1;
    const length = end - start - 1;
    return [ch, { lines, start, length }];
  });
};
