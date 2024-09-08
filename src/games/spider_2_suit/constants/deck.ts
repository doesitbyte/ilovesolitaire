/**
 * Suits
 */
export enum Suit {
  Clubs = "CLUBS",
  Diamonds = "DIAMONDS",
  Hearts = "HEARTS",
  Spades = "SPADES",
}

/**
 * Color map
 */
export enum SuitColor {
  Red = "RED",
  Black = "BLACK",
}

/**
 * Defines sprite offset of each suit in the spritemap.
 */
export const SUIT_IMAGE_INDEX = {
  [Suit.Hearts]: 2,
  [Suit.Diamonds]: 1,
  [Suit.Clubs]: 0,
  [Suit.Spades]: 3,
} as const;

/**
 * Defines suit colors
 */
export const SUIT_COLOR = {
  [Suit.Hearts]: SuitColor.Red,
  [Suit.Diamonds]: SuitColor.Red,
  [Suit.Clubs]: SuitColor.Black,
  [Suit.Spades]: SuitColor.Black,
} as const;
