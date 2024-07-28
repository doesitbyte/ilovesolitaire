import { CARD_DIMENSIONS } from "./deck";

/**
 * Define the constants for the table.
 */
export enum PileId {
  Discard1 = "DISCARD_1",
  Discard2 = "DISCARD_2",
  Discard3 = "DISCARD_3",
  Stock = "STOCK",
  Tableau1 = "TABLEAU_1",
  Tableau2 = "TABLEAU_2",
  Tableau3 = "TABLEAU_3",
  Tableau4 = "TABLEAU_4",
  Tableau5 = "TABLEAU_5",
  Tableau6 = "TABLEAU_6",
  Tableau7 = "TABLEAU_7",
  Foundation1 = "FOUNDATION_1",
  Foundation2 = "FOUNDATION_2",
  Foundation3 = "FOUNDATION_3",
  Foundation4 = "FOUNDATION_4",
  None = "NONE",
}

/**
 * Define tableau piles
 */
export const TABLEAU_PILES = [
  PileId.Tableau1,
  PileId.Tableau2,
  PileId.Tableau3,
  PileId.Tableau4,
  PileId.Tableau5,
  PileId.Tableau6,
  PileId.Tableau7,
];

/**
 * Define foundation piles
 */
export const FOUNDATION_PILES = [
  PileId.Foundation1,
  PileId.Foundation2,
  PileId.Foundation3,
  PileId.Foundation4,
];

/**
 * Define discard piles
 */
export const DISCARD_PILES = [
  PileId.Discard1,
  PileId.Discard2,
  PileId.Discard3,
];

/**
 * Offsets for card positions
 */
const PILE_OFFSET = CARD_DIMENSIONS.width + 10;

/**
 * Positions of piles on screen
 */
export const PILE_POSITIONS: Record<PileId, Phaser.Math.Vector2> = {
  [PileId.Stock]: new Phaser.Math.Vector2(80, 120),
  [PileId.Discard1]: new Phaser.Math.Vector2(80 + 2 * PILE_OFFSET, 120),
  [PileId.Discard2]: new Phaser.Math.Vector2(80 + 2 * PILE_OFFSET + 30, 120),
  [PileId.Discard3]: new Phaser.Math.Vector2(80 + 2 * PILE_OFFSET + 60, 120),

  [PileId.Foundation1]: new Phaser.Math.Vector2(80 + 6 * PILE_OFFSET, 120),
  [PileId.Foundation2]: new Phaser.Math.Vector2(80 + 7 * PILE_OFFSET, 120),
  [PileId.Foundation3]: new Phaser.Math.Vector2(80 + 8 * PILE_OFFSET, 120),
  [PileId.Foundation4]: new Phaser.Math.Vector2(80 + 9 * PILE_OFFSET, 120),

  [PileId.Tableau1]: new Phaser.Math.Vector2(120, 280),
  [PileId.Tableau2]: new Phaser.Math.Vector2(120 + PILE_OFFSET + 30, 280),
  [PileId.Tableau3]: new Phaser.Math.Vector2(
    120 + 2 * PILE_OFFSET + 2 * 30,
    280
  ),
  [PileId.Tableau4]: new Phaser.Math.Vector2(
    120 + 3 * PILE_OFFSET + 3 * 30,
    280
  ),
  [PileId.Tableau5]: new Phaser.Math.Vector2(
    120 + 4 * PILE_OFFSET + 4 * 30,
    280
  ),
  [PileId.Tableau6]: new Phaser.Math.Vector2(
    120 + 5 * PILE_OFFSET + 5 * 30,
    280
  ),
  [PileId.Tableau7]: new Phaser.Math.Vector2(
    120 + 6 * PILE_OFFSET + 6 * 30,
    280
  ),

  [PileId.None]: new Phaser.Math.Vector2(0, 0),
};
