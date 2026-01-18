import * as Phaser from "phaser";

import { LedMatrixScene } from "./led-matrix-scene";

const gameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#000000",
};

// We need to account for the border width and padding of the parent element
// (i.e. the StyledLedMatrixContainer div) in order to calculate the size of
// the remaining space available for the Phaser canvas:
// * 2 x 10px for the left/right or top/bottom border widths
// * 2 x 10px for the left/right or top/bottom padding
const FUDGE_FACTOR = 40;

export const initGame = (parent, initialValues) => {
  const parentRect = parent.getBoundingClientRect();
  console.log("[initGame]", { parentRect });

  gameConfig.parent = parent;
  gameConfig.width = parentRect.width - FUDGE_FACTOR;
  gameConfig.height = parentRect.height - FUDGE_FACTOR;

  const game = new Phaser.Game(gameConfig);

  game.scene.add("LedMatrixScene", LedMatrixScene, true, initialValues);

  const gameActions = makeGameActions(game);

  return gameActions;
};

const makeGameActions = (game) => {
  const resizeGameToMatchParent = () => {
    const parent = game.config.parent;
    const parentRect = parent.getBoundingClientRect();
    console.log("[recalculateDimensions]", { parentRect });
    const newWidth = parentRect.width - FUDGE_FACTOR;
    const newHeight = parentRect.height - FUDGE_FACTOR;
    game.scale.resize(newWidth, newHeight);
  };

  const onResize = () => {
    console.log("[onResize]");
    resizeGameToMatchParent();
  };

  const onScreenOrientationChange = (e) => {
    console.log("[onScreenOrientationChange]", e.target.type);
    resizeGameToMatchParent();
  };

  window.addEventListener("resize", onResize);
  screen.orientation?.addEventListener("change", onScreenOrientationChange);

  const destroy = () => {
    console.log("[gameActions#destroy]");
    window.removeEventListener("resize", onResize);
    screen.orientation?.removeEventListener(
      "change",
      onScreenOrientationChange
    );
    game.destroy(true);
  };

  return {
    setMessage: (message) => game.events.emit("setMessage", message),
    setFont: (font) => game.events.emit("setFont", font),
    setSpeed: (dotsPerSecond) => game.events.emit("setSpeed", dotsPerSecond),
    pause: () => game.events.emit("pause"),
    resume: () => game.events.emit("resume"),
    destroy,
  };
};
