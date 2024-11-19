"use client";

import React, { useEffect } from "react";
import * as Phaser from "phaser";
import Tabs from "./Tabs";
import { useRouter, usePathname } from "next/navigation";
import { IGameType } from "@/interfaces/game-types";

interface GameProps {
  name: string;
}

const paths = {
  klondike: {
    tabs: ["Turn 1", "Turn 3"],
    paths: ["/klondike/", "/klondike/turn-3/"],
  },
  spider: {
    tabs: ["1 Suit", "2 Suits", "4 Suits"],
    paths: ["/spider/", "/spider/2-suits/", "/spider/4-suits/"],
  },
};

const configs = [
  {
    title: IGameType.KlondikeTurn1,
    config: require("@games/klondike_turn_1/main").default,
  },
  {
    title: IGameType.KlondikeTurn3,
    config: require("@games/klondike_turn_3/main").default,
  },
  {
    title: IGameType.Spider1Suit,
    config: require("@games/spider_1_suit/main").default,
  },
  {
    title: IGameType.Spider2Suits,
    config: require("@games/spider_2_suit/main").default,
  },
  {
    title: IGameType.Spider4Suits,
    config: require("@games/spider_4_suit/main").default,
  },
  {
    title: IGameType.FreeCell,
    config: require("@games/freecell/main").default,
  },
];

const GameLoader: React.FC<GameProps> = ({ name }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [gameLoaded, setGameLoaded] = React.useState(false);

  const config = configs.find((c) => c.title === name)?.config;

  useEffect(() => {
    config.callbacks = {
      postBoot: (game: Phaser.Game) => {
        if (game.input.mouse) game.input.mouse.preventDefaultWheel = false;
      },
    };

    config.scale = {
      mode: Phaser.Scale.ScaleModes.RESIZE,
      // autoCenter: Phaser.Scale.CENTER_BOTH,
      // width: window.innerWidth,
      // height: window.innerHeight,
    };

    config.type = Phaser.AUTO;

    const game = new Phaser.Game(config);
    setGameLoaded(true);

    return () => {
      game.destroy(true);
      setGameLoaded(false);
    };
  }, [config]);

  return (
    <>
      <Tabs
        tabs={
          pathname.includes("klondike")
            ? paths.klondike.tabs
            : pathname.includes("spider")
            ? paths.spider.tabs
            : []
        }
        onTabChange={(index) => {
          router.push(
            pathname.includes("klondike")
              ? paths.klondike.paths[index]
              : pathname.includes("spider")
              ? paths.spider.paths[index]
              : "/"
          );
        }}
        activeTabDefault={
          pathname.includes("klondike")
            ? paths.klondike.paths.indexOf(pathname)
            : pathname.includes("spider")
            ? paths.spider.paths.indexOf(pathname)
            : 0
        }
      />
      <div
        className="h-screen w-full flex justify-center items-center"
        id="game-container"
      ></div>
    </>
  );
};

export default GameLoader;
