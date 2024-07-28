import React from "react";
import config_freecell from "@games/freecell/main";
import GameLoader from "@components/Game";
import { ContentLoader, FreecellContent } from "@components/Content";
import { Metadata } from "next";

export default function FreecellPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let config;
  switch (searchParams.variant) {
    case "freecell":
      config = config_freecell;
      break;
    default:
      config = config_freecell;
      break;
  }

  return (
    <>
      <GameLoader config={config} />
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
