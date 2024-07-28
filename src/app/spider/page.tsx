import React from "react";
import config_spider_1 from "@games/spider_1_suit/main";
import config_spider_2 from "@games/spider_2_suit/main";
import config_spider_4 from "@games/spider_4_suit/main";
import GameLoader from "@components/Game";
import { ContentLoader, SpiderContent } from "@components/Content";
import { Metadata } from "next";

export default function SpiderPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let config;
  switch (searchParams.variant) {
    case "suit_1":
      config = config_spider_1;
      break;
    case "suit_2":
      config = config_spider_2;
      break;
    case "suit_4":
      config = config_spider_4;
      break;
    default:
      config = config_spider_1;
      break;
  }
  return (
    <>
      <GameLoader config={config} />
      <ContentLoader>
        <SpiderContent />
      </ContentLoader>
    </>
  );
}

export const metadata: Metadata = {
  title: "Play Spider Solitaire Online - iLoveSolitaire",
  description:
    "Play Spider Solitaire with Four, Two, and One Suit options for free on your PC and mobile in full screen. No download or registration required.",
};
