import React from "react";
import config_klondike_1 from "@games/klondike_turn_1/main";
import config_klondike_3 from "@games/klondike_turn_3/main";
import GameLoader from "@components/Game";
import { ContentLoader, KlondikeContent } from "@components/Content";
import { Metadata } from "next";

export default function KlondikePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let config;
  switch (searchParams.variant) {
    case "turn_1":
      config = config_klondike_1;
      break;
    case "turn_3":
      config = config_klondike_3;
      break;
    default:
      config = config_klondike_1;
      break;
  }
  return (
    <>
      <GameLoader config={config} />
      <ContentLoader>
        <KlondikeContent />
      </ContentLoader>
    </>
  );
}

export const metadata: Metadata = {
  title: "Play Klondike Solitaire Online - iLoveSolitaire",
  description:
    "Play Klondike Solitaire with Turn 3 and Turn 1 options for free on your PC and mobile in full screen. No download or registration required.",
};
