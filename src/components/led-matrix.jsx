import { useEffect, useRef, useState } from "react";

import { useRequestAnimationFrame } from "@app/hooks";
import { range } from "@app/utils";

export const NUM_VERTICAL_DOTS = 11;

export const LedMatrix = ({ messageMatrix, scrollSpeed, scrollingEnabled }) => {
  const [dimensions, setDimensions] = useState();
  const [leds, setLeds] = useState([]);
  const [elapsed, setElapsed] = useState(0);

  const svgRef = useRef();
  const translateXRef = useRef(0);

  const recalculateDimensions = () => {
    console.log(`[LedMatrix] recalculateDimensions`);
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
  };

  useEffect(() => {
    if (!dimensions) {
      recalculateDimensions();
    }
  }, [dimensions]);

  useEffect(() => {
    const onResize = () => {
      console.log(`[LedMatrix] onResize`);
      recalculateDimensions();
    };

    const onScreenOrientationChange = () => {
      console.log(`[LedMatrix] onScreenOrientationChange`);
      recalculateDimensions();
    };

    window.addEventListener("resize", onResize);
    screen.orientation?.addEventListener("change", onScreenOrientationChange);

    return () => {
      window.removeEventListener("resize", onResize);
      screen.orientation?.removeEventListener(
        "change",
        onScreenOrientationChange
      );
    };
  }, []);

  useEffect(() => {
    if (!messageMatrix || !dimensions) return;

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

    const drawOffLeds = (colOffset) => {
      const numRows = dimensions.numRows;
      const numCols = dimensions.numCols;

      return range(numRows).flatMap((row) => {
        return range(numCols).map((col) => {
          return drawLedOff(row, col + colOffset);
        });
      });
    };

    const drawMessageLeds = (colOffset, numMessageCols) => {
      const numRows = dimensions.numRows;
      const numCols = numMessageCols;

      return range(numRows).flatMap((row) => {
        const line = messageMatrix[row] ?? "";

        return range(numCols).map((col) => {
          const ch = line.at(col);
          const state = ch === "x";

          return drawLedWithState(row, col + colOffset, state);
        });
      });
    };

    console.log("[LedMatrix] re-creating the LEDs");
    const numMessageCols = messageMatrix[0].length;
    const offLeds1 = drawOffLeds(0);
    const messageLeds = drawMessageLeds(dimensions.numCols, numMessageCols);
    const offLeds2 = drawOffLeds(dimensions.numCols + numMessageCols);
    const allLeds = [...offLeds1, ...messageLeds, ...offLeds2];
    setLeds(allLeds);
  }, [messageMatrix, dimensions]);

  useRequestAnimationFrame(setElapsed, scrollSpeed, scrollingEnabled);

  if (messageMatrix && dimensions) {
    const colWidth = dimensions.diameter + dimensions.gap;
    const numCols = dimensions.numCols + messageMatrix[0].length;
    const totalMessageWidth = numCols * colWidth - dimensions.gap;

    translateXRef.current -= (elapsed / scrollSpeed) * colWidth;

    if (translateXRef.current < -totalMessageWidth) {
      translateXRef.current = 0;
    }
  }

  return (
    <svg ref={svgRef} width="100%" height="100%">
      <g transform={`translate(${translateXRef.current})`}>{leds}</g>
    </svg>
  );
};
