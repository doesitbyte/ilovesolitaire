import React from "react";
import dynamic from "next/dynamic";
const GameLoader = dynamic(() => import("@components/Game"), { ssr: false });
import { ContentLoader, KlondikeContent } from "@components/Content";
import { Metadata } from "next";
import { IGameType } from "@/interfaces/game-types";

export default function KlondikePage() {
  return (
    <>
      <GameLoader name={IGameType.KlondikeTurn1} />
      <ContentLoader>
        <KlondikeContent />
      </ContentLoader>
    </>
  );
}

export const metadata: Metadata = {
  title: "Play Klondike Solitaire Online - I Love Solitaire",
  description:
    "Play Klondike Solitaire with Turn 3 and Turn 1 options for free on your PC and mobile in full screen. No download or registration required.",
};
