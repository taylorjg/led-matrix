import { range } from "@app/utils";
import { useEffect, useRef, useState } from "react";

export const NUM_VERTICAL_DOTS = 11;

export const LedMatrix = ({ messageMatrix, offset = 0 }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState();

  useEffect(() => {
    if (!dimensions) {
      const rect = svgRef.current.getBoundingClientRect();
      const numerator = 10 * rect.height;
      const denominator = 11 * NUM_VERTICAL_DOTS - 1;
      const diameter = Math.floor(numerator / denominator);
      const radius = diameter / 2;
      const gap = diameter / 10;
      const numRows = NUM_VERTICAL_DOTS;
      const numCols = Math.floor(rect.width / (diameter + gap));
      const marginX = (rect.width - (numCols * (diameter + gap) - gap)) / 2;
      const marginY = (rect.height - (numRows * (diameter + gap) - gap)) / 2;

      setDimensions({
        radius,
        diameter,
        gap,
        numRows,
        numCols,
        marginX,
        marginY,
      });
    }
  }, [dimensions]);

  const calculateCx = (col) => {
    const { radius, diameter, gap, marginX } = dimensions;
    return marginX + col * (diameter + gap) + radius;
  };

  const calculateCy = (row) => {
    const { radius, diameter, gap, marginY } = dimensions;
    return marginY + row * (diameter + gap) + radius;
  };

  const drawLed = (row, col, fill) => {
    const key = `led-${row}-${col}`;
    const cx = calculateCx(col);
    const cy = calculateCy(row);
    const r = dimensions.radius;

    return <circle key={key} cx={cx} cy={cy} r={r} fill={fill} />;
  };

  const drawLedOn = (row, col) => {
    return drawLed(row, col, "#ff0");
  };

  const drawLedOff = (row, col) => {
    return drawLed(row, col, "#000");
  };

  const drawLedWithState = (row, col, state) => {
    return state ? drawLedOn(row, col) : drawLedOff(row, col);
  };

  const drawMessageMatrix = () => {
    if (!messageMatrix || !dimensions) return null;

    return range(dimensions.numRows).map((row) =>
      range(dimensions.numCols).map((col) => {
        const line = messageMatrix[row] ?? "";
        const ch = line.at(col + offset);
        const state = ch === "x";
        return drawLedWithState(row, col, state);
      })
    );
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{ backgroundColor: "#888" }}
    >
      {drawMessageMatrix()}
    </svg>
  );
};
