import { NUM_VERTICAL_DOTS } from "@app/constants";
import { fontMap2 as fontMap } from "@app/fonts";

const appendCharacterToMatrix = (matrix, ch) => {
  const data = fontMap.get(ch);

  if (!data) {
    console.warn(`Character "${ch}" not found in fontMap.`);
    return;
  }

  matrix.forEach((line, index) => {
    const characterLine = (data.lines[index] ?? "").slice(
      data.start,
      data.end + 1
    );
    const newLine = line + characterLine;
    matrix[index] = newLine;
  });
};

export const makeMessageMatrix = (message) => {
  const matrix = Array(NUM_VERTICAL_DOTS).fill("");
  const chs = Array.from(message);
  for (const ch of chs) {
    appendCharacterToMatrix(matrix, ch);
  }
  return matrix;
};
