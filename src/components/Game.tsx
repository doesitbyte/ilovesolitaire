"use client";

import React, { useEffect } from "react";
import Phaser, { Game } from "phaser";

interface GameProps {
  config: Phaser.Types.Core.GameConfig;
}

const GameLoader: React.FC<GameProps> = ({ config }) => {
  useEffect(() => {
    config.callbacks = {
      postBoot: (game: Game) => {
        if (game.input.mouse) game.input.mouse.preventDefaultWheel = false;
      },
    };

    // config.scale = {
    //   mode: Phaser.Scale.FIT,
    //   autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    // };

    config.scale = {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      // width: window.innerWidth,
      height: window.innerHeight,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [config]);

  return (
    <div
      className="h-full w-full flex justify-center items-center bg-red-100"
      id="game-container"
    ></div>
  );
};

export default GameLoader;
