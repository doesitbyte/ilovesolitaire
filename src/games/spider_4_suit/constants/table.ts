import { isMobile } from "react-device-detect";

/**
 * Define the constants for the table.
 */
export enum PileId {
  Tableau1 = "TABLEAU_1",
  Tableau2 = "TABLEAU_2",
  Tableau3 = "TABLEAU_3",
  Tableau4 = "TABLEAU_4",
  Tableau5 = "TABLEAU_5",
  Tableau6 = "TABLEAU_6",
  Tableau7 = "TABLEAU_7",
  Tableau8 = "TABLEAU_8",
  Tableau9 = "TABLEAU_9",
  Tableau10 = "TABLEAU_10",
  Foundation1 = "FOUNDATION_1",
  Foundation2 = "FOUNDATION_2",
  Foundation3 = "FOUNDATION_3",
  Foundation4 = "FOUNDATION_4",
  Foundation5 = "FOUNDATION_5",
  Foundation6 = "FOUNDATION_6",
  Foundation7 = "FOUNDATION_7",
  Foundation8 = "FOUNDATION_8",
  Stock = "STOCK",
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
  PileId.Tableau9,
  PileId.Tableau10,
];

/**
 * Define foundation piles
 */
export const FOUNDATION_PILES = [
  PileId.Foundation1,
  PileId.Foundation2,
  PileId.Foundation3,
  PileId.Foundation4,
  PileId.Foundation5,
  PileId.Foundation6,
  PileId.Foundation7,
  PileId.Foundation8,
];

/**
 * Card dimensions
 */
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const landscape = window.screen.orientation.type.includes("landscape");

const maxNumberOfColumns = 8;
const maxColumnWidth =
  landscape && isMobile
    ? (windowWidth / maxNumberOfColumns) * 0.5
    : windowWidth / maxNumberOfColumns;

const standardCardWidth = 120;
const standardCardHeight = 180;

export const CARD_DIMENSIONS = {
  width:
    maxColumnWidth > standardCardWidth ? standardCardWidth : maxColumnWidth,
  height:
    maxColumnWidth * 1.5 > standardCardHeight
      ? standardCardHeight
      : maxColumnWidth * 1.5,
};

/**
 * Offsets for card positions
 */

const PILE_OFFSET =
  CARD_DIMENSIONS.width < standardCardWidth
    ? landscape
      ? CARD_DIMENSIONS.width * 1.5
      : CARD_DIMENSIONS.width * 1
    : maxColumnWidth > CARD_DIMENSIONS.width
    ? CARD_DIMENSIONS.width * 1.1
    : CARD_DIMENSIONS.width;

const LEFT_OFFSET =
  CARD_DIMENSIONS.width < standardCardWidth
    ? landscape
      ? maxColumnWidth
      : maxColumnWidth / 2
    : (windowWidth - PILE_OFFSET * maxNumberOfColumns) / 2 -
      CARD_DIMENSIONS.width / 2;

/**
 * Positions of piles on screen
 */
const tableau_start_x = LEFT_OFFSET;
const tableau_start_y =
  windowHeight > windowWidth
    ? CARD_DIMENSIONS.height * 3.5
    : CARD_DIMENSIONS.height * 2.5;
const freecell_start_x = LEFT_OFFSET;
const freecell_start_y =
  windowHeight > windowWidth
    ? CARD_DIMENSIONS.height * 2
    : CARD_DIMENSIONS.height * 1;
export const PILE_POSITIONS: Record<PileId, Phaser.Math.Vector2> = {
  [PileId.Stock]: new Phaser.Math.Vector2(freecell_start_x, freecell_start_y),

  [PileId.Foundation1]: new Phaser.Math.Vector2(
    freecell_start_x + 2 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation2]: new Phaser.Math.Vector2(
    freecell_start_x + 3 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation3]: new Phaser.Math.Vector2(
    freecell_start_x + 4 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation4]: new Phaser.Math.Vector2(
    freecell_start_x + 5 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation5]: new Phaser.Math.Vector2(
    freecell_start_x + 6 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation6]: new Phaser.Math.Vector2(
    freecell_start_x + 7 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation7]: new Phaser.Math.Vector2(
    freecell_start_x + 8 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation8]: new Phaser.Math.Vector2(
    freecell_start_x + 9 * PILE_OFFSET,
    freecell_start_y
  ),

  [PileId.Tableau1]: new Phaser.Math.Vector2(tableau_start_x, tableau_start_y),
  [PileId.Tableau2]: new Phaser.Math.Vector2(
    tableau_start_x + PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau3]: new Phaser.Math.Vector2(
    tableau_start_x + 2 * PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau4]: new Phaser.Math.Vector2(
    tableau_start_x + 3 * PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau5]: new Phaser.Math.Vector2(
    tableau_start_x + 4 * PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau6]: new Phaser.Math.Vector2(
    tableau_start_x + 5 * PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau7]: new Phaser.Math.Vector2(
    tableau_start_x + 6 * PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau8]: new Phaser.Math.Vector2(
    tableau_start_x + 7 * PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau9]: new Phaser.Math.Vector2(
    tableau_start_x + 8 * PILE_OFFSET,
    tableau_start_y
  ),
  [PileId.Tableau10]: new Phaser.Math.Vector2(
    tableau_start_x + 9 * PILE_OFFSET,
    tableau_start_y
  ),

  [PileId.None]: new Phaser.Math.Vector2(0, 0),
};

/**
 * Deck dimensions
 */

export const NUM_CARDS = 52;
export const NUM_SUITS = 4;
export const NUM_VALUES = 13;

export const SPRITE_CARD_WIDTH = 79;
export const CARD_BACK_INDEX = 54;
export const STACK_OFFSET = CARD_DIMENSIONS.height * 0.25;
export const STACK_DRAG_OFFSET = 30;
