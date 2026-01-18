import { useEffect, useRef } from "react";

import { initGame } from "@app/phaser";

import { StyledLedMatrixContainer } from "./led-matrix-container.styles";

export const LedMatrixContainer = ({
  message,
  font,
  scrollSpeed,
  scrollingEnabled,
}) => {
  const parentRef = useRef();
  const initialValuesRef = useRef({
    message,
    font,
    scrollSpeed,
    scrollingEnabled,
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
    gameActionsRef.current.setFont(font);
  }, [font]);

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

  return <StyledLedMatrixContainer ref={parentRef} />;
};
