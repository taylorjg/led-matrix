import * as Phaser from "phaser";

import { range } from "@app/utils";
import { makeMessageMatrix } from "@app/helpers";

const NUM_VERTICAL_DOTS = 11;
const ON_COLOUR = "0xffff00";
const OFF_COLOUR = "0x101010";
const ROW_DELAY = 7;

class LedMatrixScene extends Phaser.Scene {
  constructor() {
    console.log("[LedMatrixScene#constructor]");
    super("LedMatrixScene");
    this._dimensions = {
      radius: 0,
      diameter: 0,
      gap: 0,
      numRows: 0,
      numCols: 0,
      marginX: 0,
      marginY: 0,
    };
    this._messageMatrix = makeMessageMatrix("This is a much longer message");
    // this._messageMatrix = makeMessageMatrix("Short message");
    this._circles = [];
    this._iteration = 0;
    this._timer = undefined;
  }

  create() {
    console.log("[LedMatrixScene#create]");

    // this.game.events.on("setMessageMatrix", this._onSetMessageMatrix, this);

    const { width, height } = this.scale.displaySize;

    const numerator = 10 * height;
    const denominator = 11 * NUM_VERTICAL_DOTS - 1;
    const diameter = Math.floor(numerator / denominator);
    const radius = diameter / 2;
    const gap = diameter / 10;
    const numRows = NUM_VERTICAL_DOTS;
    const numCols = Math.floor(width / (diameter + gap));
    const marginX = (width - (numCols * (diameter + gap) - gap)) / 2;
    const marginY = (height - (numRows * (diameter + gap) - gap)) / 2;

    this._dimensions = {
      radius,
      diameter,
      gap,
      numRows,
      numCols,
      marginX,
      marginY,
    };

    for (const row of range(numRows)) {
      this._circles[row] = [];
      for (const col of range(numCols)) {
        const cx = this._calculateCx(col);
        const cy = this._calculateCy(row);
        const line = this._messageMatrix[row] ?? "";
        const ch = line.at(col);
        const on = ch === "x";
        const colour = on ? ON_COLOUR : OFF_COLOUR;
        this._circles[row][col] = this.add.circle(cx, cy, radius, colour);
      }
    }

    this._iteration = 0;
    this._timer = this.time.addEvent({
      delay: 50,
      callback: this._onScroll,
      callbackScope: this,
      loop: true,
    });
  }

  // _onSetMessageMatrix(messageMatrix) {
  //   console.log("[LedMatrixScene#_onSetMessageMatrix]", messageMatrix);
  // }

  _getCircleColour = (row, col, offset = 0) => {
    const line = this._messageMatrix[row] ?? "";
    const { numCols } = this._dimensions;
    const maxChars = Math.max(numCols, line.length);
    const fullWidths = Math.ceil(maxChars / numCols);
    const maxCol = fullWidths * numCols;
    const actualCol = (col + offset) % maxCol;
    const ch = line.at(actualCol);
    const on = ch === "x";
    const colour = on ? ON_COLOUR : OFF_COLOUR;
    return colour;
  };

  _makeCircles = () => {
    const { numRows, numCols, radius } = this._dimensions;

    this._circles = [];

    for (const row of range(numRows)) {
      this._circles[row] = [];
      for (const col of range(numCols)) {
        const cx = this._calculateCx(col);
        const cy = this._calculateCy(row);
        const colour = this._getCircleColour(row, col);
        this._circles[row][col] = this.add.circle(cx, cy, radius, colour);
      }
    }
  };

  _updateCircles = async () => {
    const { numRows, numCols } = this._dimensions;
    const offset = this._iteration;

    for (const row of range(numRows)) {
      const delay = ROW_DELAY * (numRows - row - 1);
      this.time.delayedCall(
        delay,
        (row) => {
          for (const col of range(numCols)) {
            const colour = this._getCircleColour(row, col, offset);
            this._circles[row][col].fillColor = colour;
          }
        },
        [row],
        this
      );
    }
  };

  _onScroll = () => {
    this._iteration++;
    this._updateCircles();
  };

  _calculateCx = (col) => {
    const { radius, diameter, gap, marginX } = this._dimensions;
    return marginX + col * (diameter + gap) + radius;
  };

  _calculateCy = (row) => {
    const { radius, diameter, gap, marginY } = this._dimensions;
    return marginY + row * (diameter + gap) + radius;
  };
}

const gameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#000000",
  scene: LedMatrixScene,
};

let gameActions = undefined;

export const initGame = (parent) => {
  if (gameActions) return gameActions;

  const parentRect = parent.getBoundingClientRect();
  console.log("[initGame]", { parentRect });

  // re StyledLedMatrix: 2 * border width (px) + 2 * padding (px)
  const FUDGE_FACTOR = 40;

  gameConfig.parent = parent;
  gameConfig.width = parentRect.width - FUDGE_FACTOR;
  gameConfig.height = parentRect.height - FUDGE_FACTOR;

  const game = new Phaser.Game(gameConfig);

  gameActions = makeGameActions(game);
  console.log("[initGame]", { gameActions });

  return gameActions;
};

const makeGameActions = (game) => {
  return {
    setMessageMatrix: (messageMatrix) =>
      game.events.emit("setMessageMatrix", messageMatrix),
  };
};
