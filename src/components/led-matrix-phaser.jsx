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
  const initialValuesRef = useRef({
    message,
    scrollSpeed,
    scrollingEnabled,
    staggeredScrolling,
  });
  const gameActionsRef = useRef();

  useEffect(() => {
    gameActionsRef.current = initGame(
      parentRef.current,
      initialValuesRef.current
    );

    return gameActionsRef.current.destroy;
  }, []);

  useEffect(() => {
    gameActionsRef.current.setMessage(message);
  }, [message]);

  useEffect(() => {
    gameActionsRef.current.setSpeed(scrollSpeed);
  }, [scrollSpeed]);

  useEffect(() => {
    if (scrollingEnabled) {
      gameActionsRef.current.resume();
    } else {
      gameActionsRef.current.pause();
    }
  }, [scrollingEnabled]);

  useEffect(() => {
    gameActionsRef.current.setStaggeredScrolling(staggeredScrolling);
  }, [staggeredScrolling]);

  return <StyledLedMatrix ref={parentRef} />;
};
