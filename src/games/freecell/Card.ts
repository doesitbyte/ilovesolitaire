"use client";

import * as Phaser from "phaser";
import {
  CARD_BACK_INDEX,
  STACK_OFFSET,
  SPRITE_CARD_WIDTH,
  SUIT_IMAGE_INDEX,
  CARD_DIMENSIONS,
  Suit,
  SuitColor,
} from "./constants/deck";
import {
  FOUNDATION_PILES,
  PileId,
  PILE_POSITIONS,
  TABLEAU_PILES,
  FREECELL_PILES,
} from "./constants/table";

export default class Card extends Phaser.GameObjects.Sprite {
  public suit: Suit;
  public value: number;
  public pile = PileId.None;
  public position: number = -1;
  public color: SuitColor;

  public constructor(scene: Phaser.Scene, suit: Suit, value: number) {
    // Create sprite
    super(scene, 0, 0, "img_cards", CARD_BACK_INDEX);
    scene.add.existing(this);

    // Suit and Value
    this.suit = suit;
    this.value = value;
    this.color =
      suit === Suit.Hearts || suit === Suit.Diamonds
        ? SuitColor.Red
        : SuitColor.Black;

    // Width and Height
    this.setDisplaySize(CARD_DIMENSIONS.width, CARD_DIMENSIONS.height);

    // Click event
    this.setInteractive();
    this.setTexture("img_cards", this.getSpriteIndex(this.suit, this.value));
    scene.input.setDraggable(this);
  }

  public reposition(pile: PileId, position: number): void {
    this.pile = pile;
    this.position = position;

    // Set depth based on position
    this.setDepth(this.position + 10);

    if (FREECELL_PILES.includes(this.pile)) {
      this.moveTo(
        PILE_POSITIONS[this.pile].x,
        PILE_POSITIONS[this.pile].y,
        this.position + 10,
        200
      );
    } else if (TABLEAU_PILES.includes(this.pile)) {
      this.moveTo(
        PILE_POSITIONS[this.pile].x,
        PILE_POSITIONS[this.pile].y + position * STACK_OFFSET,
        this.position + 10,
        200
      );
    } else if (FOUNDATION_PILES.includes(this.pile)) {
      this.moveTo(
        PILE_POSITIONS[this.pile].x,
        PILE_POSITIONS[this.pile].y,
        this.position + 10,
        200
      );
    }
  }

  public draggable(): void {
    this.scene.input.setDraggable(this);
  }

  public undraggable(): void {
    this.scene.input.setDraggable(this, false);
  }

  public getSpriteIndex(suit: Suit, value: number): number {
    return SUIT_IMAGE_INDEX[suit] * SPRITE_CARD_WIDTH + value - 1;
  }

  public moveTo(
    x: number,
    y: number,
    depth: number,
    duration: number = 1000
  ): void {
    this.scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      duration: duration,
      ease: "Power1",
      onComplete: () => this.setDepth(depth),
    });
  }
}
