import { LedMatrix } from "@app/components/led-matrix";
import { fontMap2 as fontMap } from "@app/font";
import { NUM_VERTICAL_DOTS } from "@app/components/led-matrix";

const appendCharacterToMatrix = (matrix, ch) => {
  const data = fontMap.get(ch);

  if (!data) {
    console.warn(`Character "${ch}" not found in fontMap.`);
    return;
  }

  matrix.forEach((line, index) => {
    const characterLine = (data.lines[index] ?? "").slice(data.start, data.end + 1);
    const newLine = line + characterLine;
    matrix[index] = newLine;
  });
};

const makeMessageMatrix = (message) => {
  const matrix = Array(NUM_VERTICAL_DOTS).fill("");
  const chs = Array.from(message);
  for (const ch of chs) {
    appendCharacterToMatrix(matrix, ch);
  }
  return matrix;
};

const message = "hello world";
const messageMatrix = makeMessageMatrix(message);

export const App = () => {
  return (
    <div style={{ height: "15vh" }} >
      <LedMatrix messageMatrix={messageMatrix} />
    </div>
  )
};
