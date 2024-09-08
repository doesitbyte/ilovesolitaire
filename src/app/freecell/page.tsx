import React from "react";
import dynamic from "next/dynamic";
const GameLoader = dynamic(() => import("@components/Game"), { ssr: false });
import { ContentLoader, FreecellContent } from "@components/Content";
import { Metadata } from "next";
import { IGameType } from "@/interfaces/game-types";

export default function FreecellPage() {
  return (
    <>
      <GameLoader name={IGameType.FreeCell} />
      <ContentLoader>
        <FreecellContent />
      </ContentLoader>
    </>
  );
}

export const metadata: Metadata = {
  title: "Play FreeCell Solitaire Online - iLoveSolitaire",
  description:
    "Play FreeCell Solitaire for free on your PC and mobile. No download or registration required.",
};
