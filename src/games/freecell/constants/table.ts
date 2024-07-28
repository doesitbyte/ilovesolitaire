import { CARD_DIMENSIONS } from "./deck";

/**
 * Define the constants for the table.
 */
export enum PileId {
  FreeCell1 = "FREECELL_1",
  FreeCell2 = "FREECELL_2",
  FreeCell3 = "FREECELL_3",
  FreeCell4 = "FREECELL_4",
  Foundation1 = "FOUNDATION_1",
  Foundation2 = "FOUNDATION_2",
  Foundation3 = "FOUNDATION_3",
  Foundation4 = "FOUNDATION_4",
  Tableau1 = "TABLEAU_1",
  Tableau2 = "TABLEAU_2",
  Tableau3 = "TABLEAU_3",
  Tableau4 = "TABLEAU_4",
  Tableau5 = "TABLEAU_5",
  Tableau6 = "TABLEAU_6",
  Tableau7 = "TABLEAU_7",
  Tableau8 = "TABLEAU_8",
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
  PileId.Tableau8,
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
 * Define freecell piles
 */
export const FREECELL_PILES = [
  PileId.FreeCell1,
  PileId.FreeCell2,
  PileId.FreeCell3,
  PileId.FreeCell4,
];

/**
 * Offsets for card positions
 */
const PILE_OFFSET = CARD_DIMENSIONS.width + 20;

/**
 * Positions of piles on screen
 */
export const PILE_POSITIONS: Record<PileId, Phaser.Math.Vector2> = {
  [PileId.FreeCell1]: new Phaser.Math.Vector2(120, 120),
  [PileId.FreeCell2]: new Phaser.Math.Vector2(120 + PILE_OFFSET, 120),
  [PileId.FreeCell3]: new Phaser.Math.Vector2(120 + 2 * PILE_OFFSET, 120),
  [PileId.FreeCell4]: new Phaser.Math.Vector2(120 + 3 * PILE_OFFSET, 120),

  [PileId.Foundation1]: new Phaser.Math.Vector2(120 + 4 * PILE_OFFSET, 120),
  [PileId.Foundation2]: new Phaser.Math.Vector2(120 + 5 * PILE_OFFSET, 120),
  [PileId.Foundation3]: new Phaser.Math.Vector2(120 + 6 * PILE_OFFSET, 120),
  [PileId.Foundation4]: new Phaser.Math.Vector2(120 + 7 * PILE_OFFSET, 120),

  [PileId.Tableau1]: new Phaser.Math.Vector2(120, 280),
  [PileId.Tableau2]: new Phaser.Math.Vector2(120 + PILE_OFFSET, 280),
  [PileId.Tableau3]: new Phaser.Math.Vector2(120 + 2 * PILE_OFFSET, 280),
  [PileId.Tableau4]: new Phaser.Math.Vector2(120 + 3 * PILE_OFFSET, 280),
  [PileId.Tableau5]: new Phaser.Math.Vector2(120 + 4 * PILE_OFFSET, 280),
  [PileId.Tableau6]: new Phaser.Math.Vector2(120 + 5 * PILE_OFFSET, 280),
  [PileId.Tableau7]: new Phaser.Math.Vector2(120 + 6 * PILE_OFFSET, 280),
  [PileId.Tableau8]: new Phaser.Math.Vector2(120 + 7 * PILE_OFFSET, 280),

  [PileId.None]: new Phaser.Math.Vector2(0, 0),
};
