import React from "react";
import config_default from "@/games/klondike_turn_1/main";
import GameLoader from "@/components/Game";
import { ContentLoader, HomeContent } from "@/components/Content";
import type { Metadata } from "next";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let config;
  switch (searchParams.variant) {
    case "default":
      config = config_default;
      break;
    default:
      config = config_default;
      break;
  }

  return (
    <>
      <GameLoader config={config} />
      <ContentLoader>
        <HomeContent />
      </ContentLoader>
    </>
  );
}

export const metadata: Metadata = {
  title: "Play Solitaire Online - iLoveSolitaire",
  description:
    "Play classic Solitaire games such as Klondike, Spider, and FreeCell for free on your PC and mobile in full screen. No download or registration required.",
};
