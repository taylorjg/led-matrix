import { useEffect, useRef } from "react";

export const useRequestAnimationFrame = (callback, ms, enabled) => {
  const rafIdRef = useRef(null);

  useEffect(() => {
    console.log("[useRequestAnimationFrame]", "useEffect for callback");
    let lastTimestamp;

    const step = (timestamp) => {
      const delta = timestamp - lastTimestamp;

      if (delta > ms) {
        lastTimestamp = timestamp;
        callback(delta);
      }

      if (enabled) {
        rafIdRef.current = requestAnimationFrame(step);
      } else {
        rafIdRef.current = null;
      }
    };

    if (enabled) {
      rafIdRef.current = requestAnimationFrame(step);
      lastTimestamp = performance.now();
    }

    return () => {
      console.log(
        "[useRequestAnimationFrame]",
        "cleanup function",
        rafIdRef.current
      );
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, [callback, ms, enabled]);
};
