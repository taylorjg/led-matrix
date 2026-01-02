import { useEffect, useRef } from "react";

import { StyledLedMatrix } from "./led-matrix.styles";

import { initGame } from "./led-matrix-scene";

export const LedMatrixPhaser = ({
  message,
  scrollSpeed,
  scrollingEnabled,
  staggeredScrolling,
}) => {
  const parentRef = useRef();
  const gameActionsRef = useRef();

  useEffect(() => {
    if (parentRef.current) {
      gameActionsRef.current = initGame(parentRef.current);
    }
  }, []);

  useEffect(() => {
    gameActionsRef.current?.setMessage(message);
  }, [message]);

  useEffect(() => {
    gameActionsRef.current?.setSpeed(scrollSpeed);
  }, [scrollSpeed]);

  useEffect(() => {
    if (scrollingEnabled) {
      gameActionsRef.current?.resume();
    } else {
      gameActionsRef.current?.pause();
    }
  }, [scrollingEnabled]);

  useEffect(() => {
    gameActionsRef.current?.setStaggeredScrolling(staggeredScrolling);
  }, [staggeredScrolling]);

  return <StyledLedMatrix ref={parentRef} />;
};
