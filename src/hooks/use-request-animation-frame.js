import { useEffect, useRef } from "react";

export const useRequestAnimationFrame = (callback, ms = 0) => {
  const rafIdRef = useRef();

  useEffect(() => {
    console.log("[useRequestAnimationFrame]", "useEffect for callback & ms");
    let lastTimestamp = 0;

    const step = (timestamp) => {
      const delta = timestamp - lastTimestamp;

      if (delta > ms) {
        lastTimestamp = timestamp;
        callback(delta);
      }

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      console.log(
        "[useRequestAnimationFrame]",
        "cleanup function",
        rafIdRef.current
      );
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [callback, ms]);
};
