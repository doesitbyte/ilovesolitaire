"use client";

import * as Phaser from "phaser";

import InitState from "./InitState";
import GameState from "./GameState";
import PreInitState from "../states/PreInitState";

const config: Phaser.Types.Core.GameConfig = {
  antialias: true,
  antialiasGL: true,
  backgroundColor: "#000",
  parent: "game-container",
  scene: [PreInitState, InitState, GameState],
  type: Phaser.AUTO,
  roundPixels: true,
  // pixelArt: true,
  mipmapFilter: "LINEAR_MIPMAP_LINEAR",
};

export default config;

// export const game = new Phaser.Game(config);
