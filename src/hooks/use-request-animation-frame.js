import { useEffect } from "react";

export const useRequestAnimationFrame = (callback, ms = 0) => {
  useEffect(() => {
    let lastTimestamp = 0;

    const step = (timestamp) => {
      const delta = timestamp - lastTimestamp;

      if (delta > ms) {
        lastTimestamp = timestamp;
        callback(delta);
      }

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [callback, ms]);
};
