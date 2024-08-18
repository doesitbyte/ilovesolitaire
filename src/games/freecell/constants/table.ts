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
 * Card dimensions
 */
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const maxNumberOfColumns = 8;
const maxColumnWidth = windowWidth / maxNumberOfColumns;

export const CARD_DIMENSIONS = {
  width: windowWidth * 0.1 > 100 ? 100 : windowWidth * 0.1,
  height: windowWidth * 0.1 * 1.5 > 150 ? 150 : windowWidth * 0.1 * 1.5,
};

/**
 * Offsets for card positions
 */
console.log(maxColumnWidth, CARD_DIMENSIONS.width);

const PILE_OFFSET =
  CARD_DIMENSIONS.width < 100
    ? CARD_DIMENSIONS.width * 1.1
    : maxColumnWidth > CARD_DIMENSIONS.width
    ? maxColumnWidth - CARD_DIMENSIONS.width / 2
    : CARD_DIMENSIONS.width;

const LEFT_OFFSET =
  CARD_DIMENSIONS.width < 100
    ? 0
    : (windowWidth - PILE_OFFSET * maxNumberOfColumns) / 2 -
      CARD_DIMENSIONS.width / 2;

/**
 * Positions of piles on screen
 */
const tableau_start_x = CARD_DIMENSIONS.width + LEFT_OFFSET;
const tableau_start_y =
  windowHeight > windowWidth
    ? CARD_DIMENSIONS.height * 3.5
    : CARD_DIMENSIONS.height * 2.5;
const freecell_start_x = CARD_DIMENSIONS.width + LEFT_OFFSET;
const freecell_start_y =
  windowHeight > windowWidth
    ? CARD_DIMENSIONS.height * 2
    : CARD_DIMENSIONS.height * 1;
export const PILE_POSITIONS: Record<PileId, Phaser.Math.Vector2> = {
  [PileId.FreeCell1]: new Phaser.Math.Vector2(
    freecell_start_x,
    freecell_start_y
  ),
  [PileId.FreeCell2]: new Phaser.Math.Vector2(
    freecell_start_x + PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.FreeCell3]: new Phaser.Math.Vector2(
    freecell_start_x + 2 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.FreeCell4]: new Phaser.Math.Vector2(
    freecell_start_x + 3 * PILE_OFFSET,
    freecell_start_y
  ),

  [PileId.Foundation1]: new Phaser.Math.Vector2(
    freecell_start_x + 4 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation2]: new Phaser.Math.Vector2(
    freecell_start_x + 5 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation3]: new Phaser.Math.Vector2(
    freecell_start_x + 6 * PILE_OFFSET,
    freecell_start_y
  ),
  [PileId.Foundation4]: new Phaser.Math.Vector2(
    freecell_start_x + 7 * PILE_OFFSET,
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

  [PileId.None]: new Phaser.Math.Vector2(0, 0),
};

/**
 * Deck dimensions
 */

export const NUM_CARDS = 52;
export const NUM_SUITS = 4;
export const NUM_VALUES = 13;

export const SPRITE_CARD_WIDTH = 14;
export const CARD_BACK_INDEX = 27;
export const STACK_OFFSET = CARD_DIMENSIONS.height * 0.25;
export const STACK_DRAG_OFFSET = 30;
