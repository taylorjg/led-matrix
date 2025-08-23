import { useEffect, useRef } from "react";

export const useRequestAnimationFrame = (callback, enabled) => {
  const rafIdRef = useRef(null);

  useEffect(() => {
    console.log("[useRequestAnimationFrame] useEffect");
    let lastTimestamp;

    const step = (timestamp) => {
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      callback(elapsed);

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
        "[useRequestAnimationFrame] useEffect cleanup function",
        rafIdRef.current
      );
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, [callback, enabled]);
};
