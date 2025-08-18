import { useCallback, useState } from "react";
import { LedMatrix } from "@app/components";
import { useRequestAnimationFrame } from "@app/hooks";
import { makeMessageMatrix } from "@app/helpers";

const MESSAGE = "Next: Deansgate-Castlefield";

export const App = () => {
  const [offset, setOffset] = useState(0);
  const [messageMatrix] = useState(() => makeMessageMatrix(MESSAGE));

  const callback = useCallback(() => {
    setOffset((value) => {
      const newValue = value + 1;
      return newValue < messageMatrix[0].length ? newValue : 0;
    });
  }, [messageMatrix]);

  useRequestAnimationFrame(callback, 200);

  return (
    <div style={{ height: "10vh" }} >
      <LedMatrix messageMatrix={messageMatrix} offset={offset} />
    </div>
  )
};
