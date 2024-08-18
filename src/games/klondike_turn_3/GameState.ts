"use client";

/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import * as Phaser from "phaser";

import Deck from "./Deck";
import Card from "./Card";
import {
  STACK_DRAG_OFFSET,
  DISCARD_PILES,
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
    this.add
      .image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "img_background")
      .setDisplaySize(window.innerWidth, window.innerHeight);

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

  public getDiscardPileIdFromNumber = (number: number): PileId => {
    switch (number) {
      case 1:
        return PileId.Discard1;
      case 2:
        return PileId.Discard2;
      case 3:
        return PileId.Discard3;
      default:
        return PileId.Discard1;
    }
  };

  public drawCard(): void {
    const cardsToDraw = 3;
    let drawnCards = [];
    let newMoveStarted = false;

    // Move the top three cards from Discard1, Discard2, and Discard3 to Discard1
    for (let i = 0; i < cardsToDraw; i++) {
      const discardPileId = this.getDiscardPileIdFromNumber(i + 1);
      const topCard = this.deck.topCard(discardPileId);

      if (topCard) {
        const topCardDisc = this.deck.topCard(PileId.Discard1);
        if (topCardDisc) {
          this.logCardMovement(
            topCard,
            PileId.Discard1,
            topCardDisc.position + 1,
            i === 0
          );
          newMoveStarted = !(i === 0);
          topCard.reposition(PileId.Discard1, topCardDisc.position + 1);
          topCard.disableInteractive();
        } else {
          this.logCardMovement(topCard, PileId.Discard1, 0, false);
          topCard.reposition(PileId.Discard1, 0);
        }
      }
    }

    // Draw new cards to Discard1, Discard2, and Discard3
    for (let i = 0; i < cardsToDraw; i++) {
      const topCard = this.deck.topCard(PileId.Stock);

      if (!topCard) break;

      drawnCards.push(topCard);
      this.logCardFlip(topCard, true, i === 0 ? !newMoveStarted : false);
      topCard.flip(this);

      const discardPileId = this.getDiscardPileIdFromNumber(i + 1);
      const leftDiscardPileId = this.getDiscardPileIdFromNumber(
        i === 0 ? i + 1 : i
      );

      const topCardDisc = this.deck.topCard(discardPileId);

      const leftTopCardDisc = this.deck.topCard(leftDiscardPileId);

      if (topCardDisc && leftTopCardDisc) {
        this.logCardMovement(
          topCard,
          discardPileId,
          leftTopCardDisc.position + 1,
          false
        );
        topCard.reposition(discardPileId, leftTopCardDisc.position + 1);
      } else if (leftTopCardDisc) {
        this.logCardMovement(
          topCard,
          discardPileId,
          leftTopCardDisc.position + 1,
          false
        );
        topCard.reposition(discardPileId, leftTopCardDisc.position + 1);
      } else {
        this.logCardMovement(topCard, discardPileId, 0, false);
        topCard.reposition(discardPileId, 0);
      }
    }

    // Make only the top card of each discard pile accessible
    for (let i = 0; i < cardsToDraw; i++) {
      const discardPileId = this.getDiscardPileIdFromNumber(i + 1);
      const topCard = this.deck.topCard(discardPileId);
      if (topCard) {
        if (discardPileId !== PileId.Discard3) {
          topCard.disableInteractive();
        } else {
          topCard.setInteractive();
        }
      }
    }

    // Reset the stock pile if it's empty
    if (drawnCards.length === 0) {
      let currentTop =
        (this.deck.topCard(PileId.Discard3) ??
          this.deck.topCard(PileId.Discard2)) ||
        this.deck.topCard(PileId.Discard1);
      let position = 0;

      while (currentTop) {
        this.logCardMovement(
          currentTop,
          PileId.Stock,
          position,
          position === 0
        );
        currentTop.reposition(PileId.Stock, position);
        this.logCardFlip(currentTop, false, false);
        currentTop.flipBack(this);
        position += 1;
        currentTop =
          (this.deck.topCard(PileId.Discard3) ??
            this.deck.topCard(PileId.Discard2)) ||
          this.deck.topCard(PileId.Discard1);
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
    if (
      DISCARD_PILES.includes(cardStack) &&
      TABLEAU_PILES.includes(zoneStack)
    ) {
      this.score += 5;
    }

    // Waste to foundation
    else if (
      DISCARD_PILES.includes(cardStack) &&
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

    let cardMoved = false;

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
        cardMoved = true;
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
        cardMoved = true;
      }
    }

    // Foundation
    else if (FOUNDATION_PILES.includes(pileId)) {
      if (card.suit === topCard.suit && card.value === topCard.value + 1) {
        this.dropScore(pileId, card.pile);
        this.logCardMovement(card, pileId, topCard.position + 1, true);
        card.reposition(pileId, topCard.position + 1);
        cardMoved = true;
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

    // Move discard cards if past stack is discard
    if (DISCARD_PILES.includes(oldCardPile) && cardMoved) {
      const discard2Card = this.deck.topCard(PileId.Discard2);
      if (discard2Card) {
        this.logCardMovement(
          discard2Card,
          PileId.Discard3,
          discard2Card.position + 1,
          false
        );
        discard2Card.reposition(PileId.Discard3, discard2Card.position + 1);
        discard2Card.setInteractive();
      }
      const discard1Card = this.deck.topCard(PileId.Discard1);
      if (discard1Card) {
        this.logCardMovement(
          discard1Card,
          PileId.Discard2,
          discard1Card.position + 1,
          false
        );
        discard1Card.reposition(PileId.Discard2, discard1Card.position + 1);
      }
      const unflippedDiscard1Card = this.deck.topCard(PileId.Discard1);
      if (unflippedDiscard1Card) {
        this.logCardFlip(unflippedDiscard1Card, true, false);
        unflippedDiscard1Card.flip(this);
      } else {
        const topCard = this.deck.topCard(PileId.Stock);
        if (topCard) {
          this.logCardFlip(topCard, true, false);
          topCard.flip(this);
          this.logCardMovement(topCard, PileId.Discard1, 0, false);
          topCard.reposition(PileId.Discard1, 0);
        }
      }
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
