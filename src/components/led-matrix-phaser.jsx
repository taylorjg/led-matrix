import { useEffect, useRef, useState } from "react";

import { StyledLedMatrix } from "./led-matrix.styles";

import { initGame } from "./led-matrix-scene";
// import { makeMessageMatrix } from "@app/helpers";

// eslint-disable-next-line no-unused-vars
export const LedMatrixPhaser = ({ message, scrollSpeed, scrollingEnabled }) => {
  // const [gameActions, setGameActions] = useState();
  const [, setGameActions] = useState();
  const phaserParentRef = useRef();

  useEffect(() => {
    if (phaserParentRef.current) {
      // console.log("[LedMatrixPhaser useEffect]", gameActions);
      // const messageMatrix = makeMessageMatrix(message);
      // gameActions.setMessageMatrix(messageMatrix);
      setGameActions(initGame(phaserParentRef.current));
    }
  }, [message]);

  // useEffect(() => {
  //   if (gameActions) {
  //     gameActions.setMessageMatrix(makeMessageMatrix(message));
  //   }
  // }, [message, gameActions]);

  return <StyledLedMatrix ref={phaserParentRef} />;
};
