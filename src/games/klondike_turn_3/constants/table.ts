import { isMobile } from "react-device-detect";

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
 * Card dimensions
 */
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const landscape = window.screen.orientation.type.includes("landscape");

const isDesktop = !isMobile;
const isMobilePortrait = isMobile && !landscape;
const isMobileLandscape = isMobile && landscape;

const maxNumberOfColumns = isMobileLandscape ? 7 : 7;
const maxNumberOfRows = 2;
const desktopMaxWidth = 120;
const desktopMaxHeight = 180;

let cardWidth: number;
let cardHeight: number;

if (isMobilePortrait) {
  cardWidth = (windowWidth * 0.95) / maxNumberOfColumns; // Use 95% of screen width to avoid overflow
  cardHeight = cardWidth * 1.5;
} else if (isMobileLandscape) {
  cardWidth = (windowWidth * 0.5) / maxNumberOfColumns; // Use 95% of screen width to avoid overflow
  cardHeight = cardWidth * 1.5;
} else if (isDesktop) {
  cardWidth = desktopMaxWidth;
  cardHeight = desktopMaxHeight;
} else {
  cardWidth = desktopMaxWidth;
  cardHeight = desktopMaxHeight;
}

export const CARD_DIMENSIONS = {
  width: cardWidth,
  height: cardHeight,
};

/**
 * Offsets for card positions
 */

const PILE_OFFSET = cardWidth * 1.05; // Reduced slightly to prevent overflow

const LEFT_OFFSET = (windowWidth - PILE_OFFSET * (maxNumberOfColumns - 1)) / 2;

/**
 * Positions of piles on screen
 */

let freecell_start_x: number;
let freecell_start_y: number;
let tableau_start_x: number;
let tableau_start_y: number;

if (isMobilePortrait) {
  freecell_start_x = cardWidth * 0.52;
  freecell_start_y = cardHeight * 1.3;
  tableau_start_x = cardWidth * 0.52;
  tableau_start_y = cardHeight * 2.4;
} else if (isMobileLandscape) {
  freecell_start_x = cardWidth * 0.52;
  freecell_start_y = cardHeight * 0.85;
  tableau_start_x = cardWidth * 0.52;
  tableau_start_y = cardHeight * 1.9;
} else {
  freecell_start_x = LEFT_OFFSET;
  freecell_start_y = cardHeight * 0.6;
  tableau_start_x = LEFT_OFFSET;
  tableau_start_y = cardHeight * 1.7;
}

export const PILE_POSITIONS: Record<PileId, Phaser.Math.Vector2> = {
  [PileId.Stock]: new Phaser.Math.Vector2(freecell_start_x, freecell_start_y),
  [PileId.Discard1]: new Phaser.Math.Vector2(
    freecell_start_x + 1.1 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Discard2]: new Phaser.Math.Vector2(
    freecell_start_x + 1.5 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Discard3]: new Phaser.Math.Vector2(
    freecell_start_x + 1.9 * PILE_OFFSET,
    freecell_start_y
  ),

  [PileId.Foundation1]: new Phaser.Math.Vector2(
    freecell_start_x + 3 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation2]: new Phaser.Math.Vector2(
    freecell_start_x + 4 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation3]: new Phaser.Math.Vector2(
    freecell_start_x + 5 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation4]: new Phaser.Math.Vector2(
    freecell_start_x + 6 * PILE_OFFSET,
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
export const STACK_OFFSET = CARD_DIMENSIONS.height * 0.15;
export const STACK_DRAG_OFFSET = CARD_DIMENSIONS.height * 0.25;
