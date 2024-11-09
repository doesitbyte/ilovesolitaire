"use client";

/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import * as Phaser from "phaser";

import Deck from "./Deck";
import Card from "./Card";
import {
  STACK_DRAG_OFFSET,
  FOUNDATION_PILES,
  PileId,
  TABLEAU_PILES,
  FREECELL_PILES,
} from "./constants/table";
import { SUIT_COLOR } from "./constants/deck";
import { Pile } from "./Pile";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../screen";
import { createButton } from "../components/button";
import { createDifficultyMenu } from "../components/menu";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "GameState",
  visible: false,
};

enum MoveType {
  reposition = 0,
}

interface IMove {
  card: Card;
  type: MoveType;
  startPile: PileId;
  endPile: PileId;
  startPosition: number;
  endPosition: number;
}

export default class GameState extends Phaser.Scene {
  private score: number = 0;

  private dragChildren: Card[] = [];

  private moves: IMove[][] = [];

  private deck!: Deck;

  private scoreText!: Phaser.GameObjects.Text;

  private winText!: Phaser.GameObjects.Text;

  private difficultyMenu!: Phaser.GameObjects.Container;

  public constructor() {
    super(sceneConfig);
  }

  public create(): void {
    try {
      this.game.input.touch.capture = false;
    } catch (e) {}

    // Game state variables
    this.score = 0;
    this.dragChildren = [];
    this.moves = [];

    // Add background

    // Create a graphics object for the green overlay
    const greenOverlay = this.add.graphics();
    greenOverlay.fillStyle(0x245324); // Green color with 20% opacity
    greenOverlay.fillRect(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height
    );
    const background = this.add.tileSprite(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      "img_fabricbg"
    );

    // Set the origin to the top-left corner
    background.setOrigin(0);

    // Add deck
    this.deck = new Deck(this, "easy");

    this.createZones();
    this.createInputListeners();
    this.createButtons();
    this.createText();
  }

  public clearGame(): void {
    this.deck.clear();
    this.score = 0;
    this.moves = [];
    this.dragChildren = [];
  }

  public createZones(): void {
    Object.values(PileId).forEach((pileId) => {
      const pile = new Pile(this, pileId);
      this.add.existing(pile);
    });
  }

  public createInputListeners(): void {
    // Start drag card
    this.input.on(
      "dragstart",
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject
      ) => {
        _pointer.event.preventDefault();
        if (gameObject instanceof Card) {
          this.dragCardStart(gameObject);
        }
      },
      this
    );

    // End drag card
    this.input.on(
      "dragend",
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject
      ) => {
        _pointer.event.preventDefault();
        if (gameObject instanceof Card) {
          this.dragCardEnd();
        }
      },
      this
    );

    // Drop on pile
    this.input.on(
      "drop",
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject,
        dropZone: Phaser.GameObjects.GameObject
      ) => {
        _pointer.event.preventDefault();
        if (gameObject instanceof Card) {
          this.dropCard(gameObject, dropZone);
        }
      },
      this
    );

    // Drag card
    this.input.on(
      "drag",
      (
        _pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.GameObject,
        dragX: number,
        dragY: number
      ) => {
        _pointer.event.preventDefault();
        if (gameObject instanceof Card) {
          this.dragCard(gameObject, dragX, dragY);
        }
      },
      this
    );
  }

  public createButtons(): void {
    const redealButton = createButton({
      scene: this,
      text: "Redeal",
      position: { x: 10, y: 10 },
      size: { width: 110, height: 25 },
      onClick: () => {
        this.clearGame();
        this.deck.redeal(this);
        this.winText.setVisible(false);
        this.score = 0;
      },
    });

    const newDealButton = createButton({
      scene: this,
      text: "New Deal",
      position: { x: 130, y: 10 },
      size: { width: 110, height: 25 },
      onClick: () => {
        this.showDifficultyMenu();
      },
    });

    const undoButton = createButton({
      scene: this,
      text: "Undo",
      position: { x: 250, y: 10 },
      size: { width: 110, height: 25 },
      onClick: () => {
        const lastMoves = this.moves.pop();
        if (!lastMoves) return;
        for (let i = 0; i < lastMoves.length || 0; i++) {
          const currentMove = lastMoves[i];
          currentMove.card.reposition(
            currentMove.startPile,
            currentMove.startPosition
          );
        }
      },
    });
  }

  public showDifficultyMenu(): void {
    if (this.difficultyMenu) {
      this.difficultyMenu.destroy();
    }

    this.difficultyMenu = createDifficultyMenu({
      scene: this,
      position: { x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 },
      onSelect: (difficulty) => this.newGame(difficulty),
    });
  }

  public newGame(difficulty: string): void {
    this.difficultyMenu.destroy();
    this.clearGame();
    this.deck = new Deck(this, difficulty);
    this.createZones();
    this.createInputListeners();
    this.createButtons();
    this.createText();
    this.difficultyMenu.destroy();
    this.winText.setVisible(false);
    this.score = 0;
    this.moves = [];
  }

  public createText(): void {
    this.scoreText = this.add.text(700, 12, `Score: ${this.score}`, {
      color: "#ffffff",
    });

    this.winText = this.add
      .text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "You Win!", {
        color: "#ffffff",
        fontSize: "64px",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(false);
  }

  public updateScore(delta: number): void {
    this.score += delta;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  public dragCardStart(card: Card): void {
    // Populate drag children
    this.dragChildren = [];
    if (TABLEAU_PILES.includes(card.pile)) {
      this.dragChildren = this.deck.cardChildren(card);
    } else {
      this.dragChildren.push(card);
    }

    // Set depths
    for (let i = 0; i < this.dragChildren.length; i += 1) {
      this.dragChildren[i].setDepth(100 + i);
    }
  }

  public dragCard(_card: Card, dragX: number, dragY: number): void {
    // Set positions
    for (let i = 0; i < this.dragChildren.length; i += 1) {
      this.dragChildren[i].x = dragX;
      this.dragChildren[i].y = dragY + i * STACK_DRAG_OFFSET;
    }
  }

  public dragCardEnd(): void {
    // Drop all other cards on top
    this.dragChildren.forEach((child: Card) => {
      child.reposition(child.pile, child.position);
    });
  }

  public logCardMovement(
    card: Card,
    pileId: PileId,
    position: number,
    newMove: boolean
  ): void {
    // console.log(
    //   card.value +
    //     card.suit +
    //     " moved from " +
    //     card.pile +
    //     card.position +
    //     " to " +
    //     pileId +
    //     " " +
    //     position
    // );

    const move: IMove = {
      card: card,
      type: MoveType.reposition,
      startPile: card.pile,
      startPosition: card.position,
      endPile: pileId,
      endPosition: position,
    };

    newMove
      ? this.moves.push([move])
      : this.moves[this.moves.length - 1].push(move);
  }

  private dropCard(card: Card, dropZone: Phaser.GameObjects.GameObject): void {
    const pileId = dropZone.name as PileId;
    const startPile = card.pile;

    // Freecell rules
    if (this.isValidMove(card, pileId)) {
      const cardChildren = this.deck.cardChildren(card);

      let firstMove = true;
      cardChildren.forEach((curr: Card) => {
        const topCard = this.deck.topCard(pileId);
        const endPosition = topCard ? topCard.position + 1 : 0;
        this.logCardMovement(curr, pileId, endPosition, firstMove);
        curr.reposition(pileId, endPosition);
        firstMove = false;
      });

      // Update score
      this.updateScore(1);

      // Check for win condition
      if (this.checkWin()) {
        this.winText.setVisible(true);
      }

      this.updateDraggableCards(startPile);
    }
  }

  private updateDraggableCards(pile: PileId): void {
    const pileCards = this.deck.cardsInPile(pile);

    let isDraggable = true;

    for (let i = pileCards.length - 1; i >= 0; i--) {
      const card = pileCards[i];

      if (isDraggable) {
        card.draggable();
      } else {
        card.undraggable();
      }

      if (i > 0) {
        const nextCard = pileCards[i - 1];

        const isValidSequence =
          card.color !== nextCard.color && card.value === nextCard.value - 1;

        isDraggable = isValidSequence;
      }
    }
  }

  private isValidMove(card: Card, pile: PileId): boolean {
    const topCard = this.deck.topCard(pile);

    // Move to foundation pile
    if (FOUNDATION_PILES.includes(pile)) {
      return (
        (topCard === null && card.value === 1) ||
        (topCard !== null &&
          card.value === topCard.value + 1 &&
          card.suit === topCard.suit)
      );
    }

    // Move to tableau pile
    if (TABLEAU_PILES.includes(pile)) {
      return (
        (topCard === null && card.value === 13) ||
        (topCard !== null &&
          card.value === topCard.value - 1 &&
          SUIT_COLOR[card.suit] !== SUIT_COLOR[topCard.suit])
      );
    }

    // Move to free cell
    if (FREECELL_PILES.includes(pile)) {
      return topCard === null;
    }

    return false;
  }

  private checkWin(): boolean {
    for (let i = 0; i < FOUNDATION_PILES.length; i += 1) {
      if (this.deck.countCards(FOUNDATION_PILES[i]) !== 13) {
        return false;
      }
    }
    return true;
  }
}
