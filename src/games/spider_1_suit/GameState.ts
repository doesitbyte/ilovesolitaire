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
} from "./constants/table";
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
  flip = 1,
}

interface IMove {
  card: Card;
  type: MoveType;
  face: boolean;
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

  private foundationPilesFilled: number = 0;

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
    let lastClickTime = 0;

    Object.values(PileId).forEach((pileId) => {
      const pile = new Pile(this, pileId);
      this.add.existing(pile);

      // Draw zone
      if (pile.pileId === PileId.Stock) {
        pile.on(
          "pointerup",
          () => {
            const currentTime = Date.now();
            if (currentTime - lastClickTime > 200) {
              // 200 ms throttle
              this.drawCard();
              lastClickTime = currentTime;
            }
          },
          this
        );
        pile.setDepth(10000);
      }
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
          if (currentMove.type === MoveType.flip) {
            if (currentMove.face === true) currentMove.card.flipBack(this);
            else currentMove.card.flip(this);
          } else {
            currentMove.card.reposition(
              currentMove.startPile,
              currentMove.startPosition
            );
          }
        }

        TABLEAU_PILES.forEach((pileId) => {
          this.updateDraggableCards(pileId);
        });
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
    // this.createZones();
    this.createInputListeners();
    this.createButtons();
    this.createText();
    this.difficultyMenu.destroy();
    this.winText.setVisible(false);
    this.score = 0;
    this.foundationPilesFilled = 0;
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

  public drawCard(): void {
    let newMove = true;
    TABLEAU_PILES.forEach((pileId) => {
      const stock = this.deck.topCard(PileId.Stock);
      if (stock) {
        this.logCardFlip(stock, true, newMove);
        stock.flip(this);
        newMove = false;
        const topCard = this.deck.topCard(pileId);
        this.logCardMovement(
          stock,
          pileId,
          topCard ? topCard.position + 1 : 0,
          newMove
        );
        stock.reposition(pileId, topCard ? topCard.position + 1 : 0);
      }
      this.updateDraggableCards(pileId);
    });
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
      face: true,
      startPile: card.pile,
      startPosition: card.position,
      endPile: pileId,
      endPosition: position,
    };

    newMove
      ? this.moves.push([move])
      : this.moves[this.moves.length - 1].push(move);
  }

  public logCardFlip(card: Card, face: boolean, newMove: boolean) {
    // console.log(
    //   "Flipped " +
    //     (face ? "Front " : "Back ") +
    //     card.value +
    //     card.suit +
    //     " at " +
    //     card.pile +
    //     " " +
    //     card.position
    // );

    const move: IMove = {
      card: card,
      type: MoveType.flip,
      face: face,
      startPile: card.pile,
      startPosition: card.position,
      endPile: card.pile,
      endPosition: card.position,
    };

    newMove
      ? this.moves.push([move])
      : this.moves[this.moves.length - 1].push(move);
  }

  private dropCard(card: Card, dropZone: Phaser.GameObjects.GameObject): void {
    const pileId = dropZone.name as PileId;
    const startPile = card.pile;

    // Freecell rules
    if (this.isValidMoveSpider(card, pileId)) {
      const topCard = this.deck.topCard(pileId);

      const endPosition = topCard ? topCard.position + 1 : 0;
      this.logCardMovement(card, pileId, endPosition, true);
      card.reposition(pileId, endPosition);

      for (let i = 1; i < this.dragChildren.length; i += 1) {
        this.logCardMovement(
          this.dragChildren[i],
          card.pile,
          card.position + i,
          false
        );
        this.dragChildren[i].reposition(card.pile, card.position + i);
      }

      const oldPileTopCard = this.deck.topCard(startPile);
      if (oldPileTopCard) {
        this.logCardFlip(oldPileTopCard, true, false);
        oldPileTopCard.flip(this);
      }

      // Update score
      this.updateScore(1);
    }

    this.updateDraggableCards(startPile);
    this.updateDraggableCards(pileId);

    // Check for completed sequences
    setTimeout(() => {
      if (this.checkForCompletedSequences(pileId))
        if (this.checkWinSpider()) {
          this.winText.setVisible(true);
        }
    }, 500);
  }

  private updateDraggableCards(pile: PileId): void {
    if (pile === PileId.Stock) return;
    const pileCards = this.deck.cardsInPile(pile);

    let isDraggable = true;
    let invalidated = false;

    for (let i = pileCards.length - 1; i >= 0; i--) {
      const card = pileCards[i];

      if (invalidated) {
        card.undraggable();
        continue;
      }

      if (isDraggable) {
        card.draggable();
      } else {
        card.undraggable();
      }

      if (i > 0) {
        const nextCard = pileCards[i - 1];

        const isValidSequence =
          card.suit === nextCard.suit && card.value === nextCard.value - 1;

        isDraggable = isValidSequence;

        if (!isDraggable) {
          invalidated = true;
        }
      }
    }
  }

  private isValidMoveSpider(card: Card, pileId: PileId): boolean {
    if (FOUNDATION_PILES.includes(pileId)) return false;
    const topCard = this.deck.topCard(pileId);
    if (!topCard) {
      return true;
    }
    return topCard.suit === card.suit && topCard.value === card.value + 1;
  }

  private checkForCompletedSequences(pileId: PileId): boolean {
    const cardsInPile = this.deck.cardsInPile(pileId);

    if (cardsInPile.length >= 13) {
      let isCompleteSequence = true;
      for (let i = 0; i < 13; i++) {
        const card = cardsInPile[cardsInPile.length - 1 - i];

        if (card.value !== 1 + i) {
          isCompleteSequence = false;
          break;
        }
      }
      if (isCompleteSequence) {
        let firstMove = true;
        for (let i = 0; i < 13; i++) {
          const card = cardsInPile.pop();
          if (card) {
            this.logCardMovement(
              card,
              FOUNDATION_PILES[this.foundationPilesFilled],
              i,
              firstMove
            );
            card.reposition(FOUNDATION_PILES[this.foundationPilesFilled], i);
            firstMove = false;
          }
        }
        this.updateScore(100);
        this.foundationPilesFilled += 1;
        return true;
      }
    }

    return false;
  }

  // Spider Solitaire specific win condition check
  private checkWinSpider(): boolean {
    return FOUNDATION_PILES.every(
      (pileId) => this.deck.cardsInPile(pileId).length === 13
    );
  }
}
