import Phaser from "phaser";

type DifficultyMenuConfig = {
  scene: Phaser.Scene;
  position: { x: number; y: number };
  onSelect: (difficulty: "easy" | "medium" | "hard") => void;
};

export function createDifficultyMenu({
  scene,
  position,
  onSelect,
}: DifficultyMenuConfig): Phaser.GameObjects.Container {
  const { x, y } = position;
  const menuWidth = 250;
  const menuHeight = 200;
  const buttonWidth = 180;
  const buttonHeight = 50;
  const cornerRadius = 10;
  const buttonSpacing = 60;

  // Create the background rectangle for the menu

  const blurBg = scene.add.graphics();
  blurBg.fillStyle(0x000000, 0.5);
  blurBg.fillRect(
    -scene.game.canvas.width / 2,
    -scene.game.canvas.height / 2,
    scene.game.canvas.width,
    scene.game.canvas.height
  );
  blurBg.setDepth(1000);

  const menuBackground = scene.add.graphics();
  menuBackground.fillStyle(0xffffff, 0.95);
  menuBackground.fillRoundedRect(
    -menuWidth / 2,
    -menuHeight / 2,
    menuWidth,
    menuHeight,
    15
  );

  // Helper function to create styled buttons with hover and click effects
  function createButton(
    label: string,
    offsetY: number,
    difficulty: "easy" | "medium" | "hard"
  ): Phaser.GameObjects.Container {
    // Button container
    const buttonContainer = scene.add.container(0, offsetY);

    // Shadow effect
    const shadow = scene.add.graphics();
    shadow.fillStyle(0x000000, 0.2);
    shadow.fillRoundedRect(
      -buttonWidth / 2 + 3,
      -buttonHeight / 2 + 3,
      buttonWidth,
      buttonHeight,
      cornerRadius
    );

    // Button background
    const buttonBackground = scene.add.graphics();
    buttonBackground.fillStyle(0x000000, 0.7); // Blue button color
    buttonBackground.fillRoundedRect(
      -buttonWidth / 2,
      -buttonHeight / 2,
      buttonWidth,
      buttonHeight,
      cornerRadius
    );

    // Button text
    const buttonText = scene.add
      .text(0, 0, label, {
        fontSize: "22px",
        fontFamily: "Arial",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // Add elements to button container and enable interaction
    buttonContainer
      .add([shadow, buttonBackground, buttonText])
      .setSize(buttonWidth, buttonHeight)
      .setInteractive();

    // Hover effect
    buttonContainer.on("pointerover", () => {
      buttonBackground.clear();
      buttonBackground.fillStyle(0x000000, 1); // Darker blue on hover
      buttonBackground.fillRoundedRect(
        -buttonWidth / 2,
        -buttonHeight / 2,
        buttonWidth,
        buttonHeight,
        cornerRadius
      );
    });

    buttonContainer.on("pointerout", () => {
      buttonBackground.clear();
      buttonBackground.fillStyle(0x000000, 0.7); // Reset to original color
      buttonBackground.fillRoundedRect(
        -buttonWidth / 2,
        -buttonHeight / 2,
        buttonWidth,
        buttonHeight,
        cornerRadius
      );
    });

    // Click effect
    buttonContainer.on("pointerdown", () => {
      buttonText.setScale(0.9); // Slightly scale down text on click
      shadow.clear(); // Hide shadow on click to create a pressed effect
      onSelect(difficulty);
    });

    buttonContainer.on("pointerup", () => {
      buttonText.setScale(1); // Reset text scale
      shadow.clear();
      shadow.fillStyle(0x000000, 0.2);
      shadow.fillRoundedRect(
        -buttonWidth / 2 + 3,
        -buttonHeight / 2 + 3,
        buttonWidth,
        buttonHeight,
        cornerRadius
      );
    });

    return buttonContainer;
  }

  // Create buttons with specified text and callback function
  const easyButton = createButton("Easy", -buttonSpacing, "easy");
  const mediumButton = createButton("Medium", 0, "medium");
  const hardButton = createButton("Hard", buttonSpacing, "hard");

  // Create the menu container, position it, and add all elements
  const difficultyMenu = scene.add.container(x, y, [
    menuBackground,
    blurBg,
    easyButton,
    mediumButton,
    hardButton,
  ]);
  difficultyMenu.setDepth(2000);

  return difficultyMenu;
}
