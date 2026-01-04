const appendCharacterToMatrix = (font, matrix, ch) => {
  const value = font.fontMap.get(ch);

  if (!value) {
    console.warn(
      `Character "${ch}" not found in fontMap for font "${font.name}".`
    );
    return;
  }

  matrix.forEach((line, index) => {
    const characterLine = (value.lines[index] ?? "").slice(
      value.start,
      value.end + 1
    );
    const newLine = line + characterLine;
    matrix[index] = newLine;
  });
};

export const makeMessageMatrix = (font, message) => {
  const matrix = Array(font.numVerticalDots).fill("");
  const chs = Array.from(message);
  for (const ch of chs) {
    appendCharacterToMatrix(font, matrix, ch);
  }
  return matrix;
};
