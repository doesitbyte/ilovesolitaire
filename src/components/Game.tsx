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

    config.scale = {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [config]);

  return <div className="max-w-screen max-h-fit" id="game-container"></div>;
};

export default GameLoader;
