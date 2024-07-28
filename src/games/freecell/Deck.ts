import Card from "./Card";
import { Suit } from "./constants/deck";
import { PileId, TABLEAU_PILES } from "./constants/table";

export default class Deck {
  public cards: Card[] = [];
  public difficulty: string = "";
  public index: number = 0;

  public constructor(scene: Phaser.Scene, difficulty: string) {
    this.cards = [];

    // Load the appropriate shuffle based on difficulty
    const shuffle = this.loadShuffle(scene, difficulty, 0);

    this.deal(scene, shuffle.deck);
  }

  public deal(_: Phaser.Scene, deck: any): void {
    let x = 0;
    for (let i = 0; i < deck["tableau piles"].length; i += 1) {
      let isTopCardDraggable = true;
      for (let t = 0; t < deck["tableau piles"][i].length; t += 1) {
        const card = this.cards[x];
        card.reposition(TABLEAU_PILES[i], t);
        if (t === deck["tableau piles"][i].length - 1) {
          // This is the top card of the tableau pile
          card.draggable();
        } else {
          // Check if this card can form a valid sequence with the cards above it
          const nextCard = this.cards[x + 1];
          const isValidSequence =
            card.suit !== nextCard.suit && card.value === nextCard.value + 1;

          if (isTopCardDraggable && isValidSequence) {
            // If the current sequence is valid, make this card draggable
            card.draggable();
          } else {
            // If the sequence is invalid, make this card undraggable and mark the flag as false
            card.undraggable();
            isTopCardDraggable = false;
          }
        }
        x += 1;
      }
    }
  }

  public redeal(scene: Phaser.Scene): void {
    const shuffle = this.loadShuffle(scene, this.difficulty, this.index);
    this.deal(scene, shuffle.deck);
  }

  public loadShuffle(scene: Phaser.Scene, _: string, index?: number): any {
    const shuffles = scene.cache.json.get("freecell");

    let randomIndex;
    if (index) {
      randomIndex = index;
    } else {
      randomIndex = Math.floor(Math.random() * shuffles.length);
    }

    const shuffle = shuffles[randomIndex];
    this.cards = [];

    shuffle.deck["tableau piles"].forEach((pile: string[]) => {
      pile.forEach((card: string) => {
        const value = this.getCardValue(card.slice(0, -1)); // Extract value
        const suit = this.getCardSuit(card.slice(-1)); // Extract suit
        this.cards.push(new Card(scene, suit, value));
      });
    });

    this.difficulty = shuffle.difficulty;
    this.index = randomIndex;

    return shuffle;
  }

  private getCardValue(value: string): number {
    const valueMap: { [key: string]: number } = {
      A: 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      J: 11,
      Q: 12,
      K: 13,
    };
    return valueMap[value];
  }

  private getCardSuit(suit: string): Suit {
    const suitMap: { [key: string]: Suit } = {
      C: Suit.Clubs,
      D: Suit.Diamonds,
      H: Suit.Hearts,
      S: Suit.Spades,
    };
    return suitMap[suit];
  }

  public cardChildren(card: Card): Card[] {
    return this.cards
      .filter(
        (curr: Card) =>
          curr.pile === card.pile && curr.position >= card.position
      )
      .sort((a: Card, b: Card) => a.position - b.position);
  }

  public topCard(pile: PileId): Card | null {
    return (
      this.cards
        .filter((curr: Card) => curr.pile === pile)
        .sort((a: Card, b: Card) => a.position - b.position)
        .pop() ?? null
    );
  }

  public cardsInPile(pile: PileId): Card[] {
    return this.cards.filter((curr: Card) => curr.pile === pile);
  }

  public countCards(pile: PileId): number {
    return this.cards.reduce(
      (acc: number, card: Card) => (card.pile === pile ? acc + 1 : acc),
      0
    );
  }

  public clear(): void {
    this.cards.forEach((card: Card) => card.destroy());
    this.cards = [];
  }
}
