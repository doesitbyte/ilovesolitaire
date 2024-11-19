import React from "react";
import dynamic from "next/dynamic";
const GameLoader = dynamic(() => import("@components/Game"), { ssr: false });
import { ContentLoader, HomeContent } from "@/components/Content";
import type { Metadata } from "next";
import { IGameType } from "@/interfaces/game-types";

export default function Home() {
  return (
    <>
      <GameLoader name={IGameType.KlondikeTurn1} />
      <ContentLoader>
        <HomeContent />
      </ContentLoader>
    </>
  );
}

export const metadata: Metadata = {
  title: "Play Solitaire Online - I Love Solitaire",
  description:
    "Play classic Solitaire games such as Klondike, Spider, and FreeCell for free on your PC and mobile in full screen. No download or registration required.",
};
