import { useEffect, useRef } from "react";

import { initGame } from "@app/phaser";

import { StyledLedMatrixContainer } from "./led-matrix-container.styles";

export const LedMatrixContainer = ({
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

  return <StyledLedMatrixContainer ref={parentRef} />;
};
