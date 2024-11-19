import React from "react";
import dynamic from "next/dynamic";
const GameLoader = dynamic(() => import("@components/Game"), { ssr: false });
import { ContentLoader, SpiderContent } from "@components/Content";
import { Metadata } from "next";
import { IGameType } from "@/interfaces/game-types";

export default function SpiderPage() {
  return (
    <>
      <GameLoader name={IGameType.Spider2Suits} />
      <ContentLoader>
        <SpiderContent />
      </ContentLoader>
    </>
  );
}

export const metadata: Metadata = {
  title: "Play Spider Solitaire (2 Suits) Online - I Love Solitaire",
  description:
    "Play Spider Solitaire (2 Suits) for free on your PC and mobile in full screen. No download or registration required",
};
