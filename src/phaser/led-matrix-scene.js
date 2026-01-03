import * as Phaser from "phaser";

import { NUM_VERTICAL_DOTS } from "@app/constants";
import { makeMessageMatrix } from "@app/helpers";
import { range } from "@app/utils";

const ON_COLOUR = "0xffff00";
const OFF_COLOUR = "0x101010";
const ROW_DELAY = 6;

export class LedMatrixScene extends Phaser.Scene {
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
    this._messageMatrix = makeMessageMatrix("");
    this._dotsPerSecond = 0;
    this._staggeredScrolling = false;
    this._dots = [];
    this._iteration = 0;
    this._timer = undefined;
  }

  create(data) {
    console.log("[LedMatrixScene#create]", data);

    this._messageMatrix = makeMessageMatrix(data.message);
    this._dotsPerSecond = data.scrollSpeed;
    this._staggeredScrolling = data.staggeredScrolling;

    this.game.events.on("setMessage", this._onSetMessage, this);
    this.game.events.on("setSpeed", this._onSetSpeed, this);
    this.game.events.on(
      "setStaggeredScrolling",
      this._onSetStaggeredScrolling,
      this
    );
    this.game.events.on("pause", this._onPause, this);
    this.game.events.on("resume", this._onResume, this);

    this.scale.on("resize", this._onResize, this);

    this._timer = this.time.addEvent({
      delay: Math.round(1000 / this._dotsPerSecond),
      loop: true,
      callback: this._onScrollDots,
      callbackScope: this,
    });
  }

  _onResize() {
    console.log("[LedMatrixScene#_onResize]");

    for (const dot of this._dots.flat()) {
      dot.destroy(true);
    }

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

    this._createDots();
    this._updateDots();

    this._iteration = 0;
  }

  _onSetMessage(message) {
    console.log("[LedMatrixScene#_onSetMessage]", message);
    this._messageMatrix = makeMessageMatrix(message);
  }

  _onSetSpeed(dotsPerSecond) {
    console.log("[LedMatrixScene#_onSetSpeed]", dotsPerSecond);
    this._dotsPerSecond = dotsPerSecond;
    this._timer.delay = Math.round(1000 / this._dotsPerSecond);
  }

  _onSetStaggeredScrolling(enabled) {
    console.log("[LedMatrixScene#_onSetStaggeredScrolling]", enabled);
    this._staggeredScrolling = enabled;
  }

  _onPause() {
    console.log("[LedMatrixScene#_onPause]");
    this._timer.paused = true;
  }

  _onResume() {
    console.log("[LedMatrixScene#_onResume]");
    this._timer.paused = false;
  }

  _getDotColour = (row, col, offset = 0) => {
    // TODO: optimize to avoid recalculating maxCol each time
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

  _createDots = () => {
    const { numRows, numCols, radius } = this._dimensions;

    this._dots = [];

    for (const row of range(numRows)) {
      this._dots[row] = [];
      for (const col of range(numCols)) {
        const cx = this._calculateCx(col);
        const cy = this._calculateCy(row);
        this._dots[row][col] = this.add.circle(cx, cy, radius, OFF_COLOUR);
      }
    }
  };

  _updateDots = async () => {
    const { numRows, numCols } = this._dimensions;
    const offset = this._iteration;

    const scrollRow = (row) => {
      for (const col of range(numCols)) {
        const colour = this._getDotColour(row, col, offset);
        this._dots[row][col].fillColor = colour;
      }
    };

    for (const row of range(numRows)) {
      if (this._staggeredScrolling) {
        const delay = ROW_DELAY * (numRows - row - 1);
        this.time.delayedCall(delay, scrollRow, [row], this);
      } else {
        scrollRow(row);
      }
    }
  };

  _onScrollDots = () => {
    this._iteration++;
    this._updateDots();
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
