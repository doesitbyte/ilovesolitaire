import * as Phaser from "phaser";

type ButtonConfig = {
  scene: Phaser.Scene;
  text: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClick: () => void;
};

type ButtonElements = {
  button: Phaser.GameObjects.Graphics;
  buttonText: Phaser.GameObjects.Text;
  shadow: Phaser.GameObjects.Graphics;
};

export function createButton({
  scene,
  text,
  position,
  size,
  onClick,
}: ButtonConfig): ButtonElements {
  const { x, y } = position;
  const { width: buttonWidth, height: buttonHeight } = size;
  const cornerRadius = 10;

  // Create shadow effect below the button
  const shadow = scene.add.graphics();
  shadow.fillStyle(0x000000, 0.2);
  shadow.fillRoundedRect(x + 3, y + 3, buttonWidth, buttonHeight, cornerRadius);

  // Create the button background with rounded corners and border
  const button = scene.add.graphics();
  button.fillStyle(0xffffff, 1);
  button.fillRoundedRect(x, y, buttonWidth, buttonHeight, cornerRadius);
  button.lineStyle(2, 0x888888, 1);
  button.strokeRoundedRect(x, y, buttonWidth, buttonHeight, cornerRadius);
  button.setDepth(1); // Elevate above shadow

  // Add the text to the button
  const buttonText = scene.add
    .text(x + 25, y + 5, text, {
      fontSize: "16px",
      fontFamily: "Arial",
      color: "#000",
      fontStyle: "bold",
      align: "center",
    })
    .setDepth(2); // Elevate above button and shadow

  // Make text interactive and set up pointer events
  buttonText.setInteractive().on("pointerdown", () => {
    buttonText.setScale(0.95); // Add click effect
    shadow.clear(); // Hide shadow for pressed effect

    // Call the onClick function when pressed
    onClick();
  });

  buttonText.on("pointerup", () => {
    buttonText.setScale(1); // Reset text scale after release

    // Redraw shadow for lifted effect
    shadow.fillStyle(0x000000, 0.2);
    shadow.fillRoundedRect(
      x + 3,
      y + 3,
      buttonWidth,
      buttonHeight,
      cornerRadius
    );
  });

  // Return grouped elements for further manipulation if needed
  return { button, buttonText, shadow };
}
