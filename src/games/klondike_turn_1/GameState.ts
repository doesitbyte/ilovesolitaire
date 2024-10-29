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
import { SUIT_COLOR } from "./constants/deck";
import { Pile } from "./Pile";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../screen";

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
    this.hideDifficultyMenu();
  }

  public createZones(): void {
    Object.values(PileId).forEach((pileId) => {
      const pile = new Pile(this, pileId);
      this.add.existing(pile);

      // Draw zone
      if (pile.pileId === PileId.Stock) {
        pile.on(
          "pointerdown",
          () => {
            this.drawCard();
          },
          this
        );
        pile.setDepth(99);
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
    // Redeal button
    this.add.graphics().fillStyle(0xffffff, 1).fillRect(10, 10, 80, 18);

    this.add
      .text(12, 12, "Redeal", { color: "#000" })
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.clearGame();
          this.deck.redeal(this);
          this.winText.setVisible(false);
          this.score = 0;
        },
        this
      );

    // New deal button
    this.add.graphics().fillStyle(0xffffff, 1).fillRect(100, 10, 80, 18);

    this.add
      .text(102, 12, "New Deal", { color: "#000" })
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.showDifficultyMenu();
          // this.deck.shuffle(this.deck.cards);
          // this.deck.deal(this);
          // this.winText.setVisible(false);
          // this.score = 0;
        },
        this
      );

    // Undo button
    this.add.graphics().fillStyle(0xffffff, 1).fillRect(190, 10, 80, 18);

    this.add
      .text(192, 12, "Undo", { color: "#000" })
      .setInteractive()
      .on(
        "pointerdown",
        () => {
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
        },
        this
      );
  }

  public showDifficultyMenu(): void {
    if (this.difficultyMenu) {
      this.difficultyMenu.destroy();
    }
    const rect = this.add.graphics();
    rect.fillStyle(0xffffff, 1);
    rect.fillRect(SCREEN_WIDTH / 2 - 100, SCREEN_HEIGHT / 2 - 100, 200, 200);
    const easy = this.add
      .text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 50, "Easy", {
        fontSize: "32px",
        color: "#000",
      })
      .setOrigin(0.5, 0.5);
    easy.setInteractive().on("pointerdown", () => {
      this.dealNewDeck("easy");
      this.hideDifficultyMenu();
    });
    const medium = this.add
      .text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "Medium", {
        fontSize: "32px",
        color: "#000",
      })
      .setOrigin(0.5, 0.5);
    medium.setInteractive().on("pointerdown", () => {
      this.dealNewDeck("medium");
      this.hideDifficultyMenu();
    });
    const hard = this.add
      .text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 50, "Hard", {
        fontSize: "32px",
        color: "#000",
      })
      .setOrigin(0.5, 0.5);
    hard.setInteractive().on("pointerdown", () => {
      this.dealNewDeck("hard");
      this.hideDifficultyMenu();
    });
    this.difficultyMenu = this.add.container(0, 0, [rect, easy, medium, hard]);
    this.difficultyMenu.setDepth(2000);
  }

  public hideDifficultyMenu(): void {
    this.difficultyMenu.destroy();
  }

  public dealNewDeck(difficulty: string): void {
    this.clearGame();
    const shuffle = this.deck.loadShuffle(this, difficulty);
    this.deck.deal(this, shuffle.deck);
  }

  public createText(): void {
    this.scoreText = this.add.text(700, 12, "", {
      color: "#FFF",
      fontSize: "16px",
    });

    this.winText = this.add
      .text(20, this.cameras.main.height - 40, "You Win!", {
        color: "#FFF",
        fontSize: "24px",
      })
      .setVisible(false);
  }

  public drawCard(): void {
    // Get top card on current stack
    const topCard = this.deck.topCard(PileId.Stock);

    // Empty stack
    if (topCard) {
      const topCardDisc = this.deck.topCard(PileId.Discard);
      if (topCardDisc) {
        this.logCardFlip(topCardDisc, false, true);
        topCardDisc.flipBack(this);
        this.logCardMovement(
          topCard,
          PileId.Discard,
          topCardDisc.position + 1,
          false
        );
        topCard.reposition(PileId.Discard, topCardDisc.position + 1);
      } else {
        this.logCardMovement(topCard, PileId.Discard, 0, true);
        topCard.reposition(PileId.Discard, 0);
      }
      this.logCardFlip(topCard, true, false);
      topCard.flip(this);
    } else {
      let currentTop = this.deck.topCard(PileId.Discard);
      let position = 0;

      while (currentTop) {
        this.logCardMovement(
          currentTop,
          PileId.Stock,
          position,
          position === 0 ? true : false
        );
        currentTop.reposition(PileId.Stock, position);
        this.logCardFlip(currentTop, false, false);
        currentTop.flipBack(this);
        position += 1;
        currentTop = this.deck.topCard(PileId.Discard);
      }

      if (position > 0) {
        this.score -= 100;
      }
    }
  }

  public flipScore(cardStack: PileId): void {
    if (TABLEAU_PILES.includes(cardStack)) {
      this.score += 5;
    }
  }

  public dropScore(zoneStack: PileId, cardStack: PileId): void {
    // Waste to tableau
    if (cardStack === PileId.Discard && TABLEAU_PILES.includes(zoneStack)) {
      this.score += 5;
    }

    // Waste to foundation
    else if (
      cardStack === PileId.Discard &&
      FOUNDATION_PILES.includes(zoneStack)
    ) {
      this.score += 10;
    }

    // Tableau to foundation
    else if (
      TABLEAU_PILES.includes(cardStack) &&
      FOUNDATION_PILES.includes(zoneStack)
    ) {
      this.score += 10;
    }

    // Foundation to tableau
    else if (
      FOUNDATION_PILES.includes(cardStack) &&
      TABLEAU_PILES.includes(zoneStack)
    ) {
      this.score -= 15;
    }
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

  public dragCardEnd(): void {
    // Drop all other cards on top
    this.dragChildren.forEach((child: Card) => {
      child.reposition(child.pile, child.position);
    });
  }

  public dragCard(_card: Card, dragX: number, dragY: number): void {
    // Set positions
    for (let i = 0; i < this.dragChildren.length; i += 1) {
      this.dragChildren[i].x = dragX;
      this.dragChildren[i].y = dragY + i * STACK_DRAG_OFFSET;
    }
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

  // eslint-disable-next-line
  public dropCard(card: Card, dropZone: Phaser.GameObjects.GameObject): void {
    // Potentially unsafe!
    const pileId = dropZone.name as PileId;

    // Get top card on current stack
    const topCard = this.deck.topCard(pileId);
    const oldCardPile = card.pile;

    // Empty stack
    if (!topCard) {
      if (
        (card.value === 13 && TABLEAU_PILES.includes(pileId)) ||
        (card.value === 1 && FOUNDATION_PILES.includes(pileId))
      ) {
        this.dropScore(pileId, card.pile);
        this.logCardMovement(card, pileId, 0, true);
        card.reposition(pileId, 0);
      }
    }

    // Tableau
    else if (TABLEAU_PILES.includes(pileId)) {
      if (
        SUIT_COLOR[card.suit] !== SUIT_COLOR[topCard.suit] &&
        card.value === topCard.value - 1
      ) {
        this.dropScore(pileId, card.pile);
        this.logCardMovement(card, pileId, topCard.position + 1, true);
        card.reposition(pileId, topCard.position + 1);
      }
    }

    // Foundation
    else if (FOUNDATION_PILES.includes(pileId)) {
      if (card.suit === topCard.suit && card.value === topCard.value + 1) {
        this.dropScore(pileId, card.pile);
        this.logCardMovement(card, pileId, topCard.position + 1, true);
        card.reposition(pileId, topCard.position + 1);
      }
    }

    // Drop all other cards on top

    for (let i = 1; i < this.dragChildren.length; i += 1) {
      this.logCardMovement(
        this.dragChildren[i],
        card.pile,
        card.position + i,
        false
      );
      this.dragChildren[i].reposition(card.pile, card.position + i);
    }

    // Flip top card on past stack
    const topCardNew = this.deck.topCard(oldCardPile);
    if (topCardNew && topCardNew !== card && !topCardNew.flipped) {
      this.logCardFlip(topCardNew, true, false);
      topCardNew.flip(this);
      this.flipScore(topCardNew.pile);
    }
  }

  public update(): void {
    // Ensure score is within range
    if (this.score < 0) {
      this.score = 0;
    }

    // Win
    const cardsOnFoundation = FOUNDATION_PILES.reduce(
      (acc, pile) => acc + this.deck.countCards(pile),
      0
    );
    if (cardsOnFoundation === 52) {
      this.winText.setVisible(true);
    }

    // Display lives
    this.scoreText.setText(`SCORE: ${this.score}`);
  }
}
