import { useEffect, useRef, useState } from "react";

const NUM_VERTICAL_DOTS = 11;

export const LedMatrix = () => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState();

  useEffect(() => {
    if (!dimensions)  {

      const rect = svgRef.current.getBoundingClientRect();

      // g = d / 10
      // numDots . d + (numDots - 1) . g = h
      // numDots . d + (numDots - 1) . (d / 10) = h
      // 10 . numDots . (d / 10) + (numDots - 1) . (d / 10) = h
      // d = 10 . h / (11 . numDots - 1)
      const numerator = 10 * rect.height;
      const denominator = 11 * NUM_VERTICAL_DOTS - 1;
      const diameter = Math.floor(numerator / denominator);

      const radius = diameter / 2;
      const gap = diameter / 10;

      const numRows = NUM_VERTICAL_DOTS
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
    const key=`led-${row}-${col}`;
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

  return (
    <svg ref={svgRef} width="100%" height="100%" style={{ backgroundColor: "#888" }}>
      {dimensions && Array.from({ length: dimensions.numRows }).map((_, row) => (
        Array.from({ length: dimensions.numCols }).map((_, col) => (
          drawLedWithState(row, col, false)
        ))
      ))}
      {dimensions && drawLedWithState(4, 7, true)}
    </svg>
  );
};
