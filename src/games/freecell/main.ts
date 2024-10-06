"use client";

import * as Phaser from "phaser";

import InitState from "./InitState";
import GameState from "./GameState";
import PreInitState from "../states/PreInitState";

const config: Phaser.Types.Core.GameConfig = {
  backgroundColor: "#000",
  parent: "game-container",
  scene: [PreInitState, InitState, GameState],
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
  },
  type: Phaser.WEBGL,
  roundPixels: true,
};

export default config;

// export const game = new Phaser.Game(config);
