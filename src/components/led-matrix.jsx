import { useEffect, useRef, useState } from "react";

export const LedMatrix = () => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState();

  useEffect(() => {
    if (!dimensions)  {
      const R = 18;
      const D = 2 * R
      const GAP = R / 5;

      const rect = svgRef.current.getBoundingClientRect();
      const numRows = Math.floor(rect.height / (D + GAP));
      const numCols = Math.floor(rect.width / (D + GAP));
      const marginX = (rect.width - (numCols * (D + GAP) - GAP)) / 2;
      const marginY = (rect.height - (numRows * (D + GAP) - GAP)) / 2;

      setDimensions({
        radius: R,
        diameter: D,
        gap: GAP,
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
