"use client";

import * as Phaser from "phaser";
import { SUIT_IMAGE_INDEX, type Suit } from "./constants/deck";
import {
  CARD_BACK_INDEX,
  STACK_OFFSET,
  SPRITE_CARD_WIDTH,
  CARD_DIMENSIONS,
  FOUNDATION_PILES,
  PileId,
  PILE_POSITIONS,
  TABLEAU_PILES,
} from "./constants/table";

export default class Card extends Phaser.GameObjects.Sprite {
  public suit: Suit;

  public value: number;

  public pile = PileId.None;

  public position: number = -1;

  public flipped: boolean = false;

  public constructor(scene: Phaser.Scene, suit: Suit, value: number) {
    // Create sprite
    super(scene, 0, 0, "img_cards", CARD_BACK_INDEX);
    scene.add.existing(this);

    // Suit and Value
    this.suit = suit;
    this.value = value;

    // Width and Height
    this.setDisplaySize(CARD_DIMENSIONS.width, CARD_DIMENSIONS.height);

    // Click event
    this.setInteractive();
  }

  public reposition(pile: PileId, position: number): void {
    this.pile = pile;
    this.position = position;

    // this.setDepth(this.position + 10);

    if (this.pile === PileId.Stock || this.pile === PileId.Discard) {
      this.moveTo(
        PILE_POSITIONS[this.pile].x + position,
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

  public flip(scene: Phaser.Scene): void {
    this.setTexture("img_cards", this.getSpriteIndex(this.suit, this.value));
    scene.input.setDraggable(this);
    this.flipped = true;
  }

  public flipBack(scene: Phaser.Scene): void {
    this.setTexture("img_cards", CARD_BACK_INDEX);
    scene.input.setDraggable(this, false);
    this.flipped = false;
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
