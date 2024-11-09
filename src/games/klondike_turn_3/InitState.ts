"use client";

import * as Phaser from "phaser";

// Card images
import {
  images,
  spritesheets,
  svgs,
  klondike_turn_3_difficulties as difficulties,
} from "../assets";
import { CARD_DIMENSIONS } from "./constants/table";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "InitState",
  visible: false,
};

export default class InitState extends Phaser.Scene {
  public constructor() {
    super(sceneConfig);
  }

  // eslint-disable-next-line max-lines-per-function
  public preload(): void {
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0xaaaaaa, 0.8);
    progressBox.fillRect(215, 270, 110, 10);

    const progressBar = this.add.graphics();

    const { height, width } = this.cameras.main;

    const assetText = this.make.text({
      style: {
        color: "#000000",
        font: "12px monospace",
      },
      text: "",
      x: width / 2,
      y: height / 2 + 100,
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0x000000, 1);
      progressBar.fillRect(217, 272, 106 * value, 6);
    });

    this.load.on("fileprogress", (file: { key: string }) =>
      assetText.setText(`Loading asset: ${file.key}`)
    );

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      assetText.destroy();
    });

    // Images
    images.forEach(({ key, file }) => this.load.image(key, file));

    // Spritesheets
    spritesheets.forEach(({ file, frameHeight, frameWidth, key }) => {
      this.load.spritesheet(key, file, { frameHeight, frameWidth });
    });

    // SVGs
    svgs.forEach(({ file, frameHeight, frameWidth, columns, rows, key }) => {
      const standardCardWidth = 120;
      const standardCardHeight = 180;

      const scale = CARD_DIMENSIONS.height / frameHeight;

      const svgWidth = columns * frameWidth * scale;
      const svgHeight = rows * frameHeight * scale;

      this.load.svg(key, file, {
        width: svgWidth,
        height: svgHeight,
      });

      this.load.once("complete", () => {
        const texture = this.textures.get(key);
        const columns = 13; // Adjust based on the layout of your SVG
        const rows = 5; // Adjust based on the number of rows in your SVG

        // Loop through rows and columns to add each frame dynamically
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
            const frameName = `card_${row * columns + col}`;

            const x = col * frameWidth * scale;
            const y = row * frameHeight * scale;

            texture.add(
              frameName,
              0, // x-offset within the texture atlas
              x,
              y, // coordinates in the texture
              frameWidth * scale,
              frameHeight * scale
            );
          }
        }
      });
    });

    // JSON
    difficulties.forEach(({ file, key }) => this.load.json(key, file));
  }

  public create(): void {
    this.scene.start("GameState");
  }
}
