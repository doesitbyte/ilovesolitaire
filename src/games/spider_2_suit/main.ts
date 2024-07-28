"use client";

import * as Phaser from "phaser";

import InitState from "./InitState";
import GameState from "./GameState";
import PreInitState from "../states/PreInitState";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../screen";

const config: Phaser.Types.Core.GameConfig = {
  antialias: false,
  antialiasGL: false,
  backgroundColor: "#000",
  height: SCREEN_HEIGHT,
  parent: "game-container",
  scene: [PreInitState, InitState, GameState],
  type: Phaser.AUTO,
  width: SCREEN_WIDTH,
  scale: {
    mode: Phaser.Scale.FIT,
  },
};

export default config;

// export const game = new Phaser.Game(config);
