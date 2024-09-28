import {
  STACK_OFFSET,
  PileId,
  PILE_POSITIONS,
  TABLEAU_PILES,
  CARD_DIMENSIONS,
} from "./constants/table";

export class Pile extends Phaser.GameObjects.Zone {
  public pileId: PileId;

  public constructor(scene: Phaser.Scene, pileId: PileId) {
    super(scene, 0, 0, 0, 0);

    this.pileId = pileId;

    // Additional height for tableau
    const addHeight = TABLEAU_PILES.includes(this.pileId)
      ? STACK_OFFSET * 10
      : 0;
    const addWidth = 0;

    // Get position
    const position = PILE_POSITIONS[this.pileId];

    // Make zone
    this.setPosition(position.x, position.y);
    this.setSize(CARD_DIMENSIONS.width, CARD_DIMENSIONS.height);

    const zone = this.setRectangleDropZone(this.width, this.height);
    zone.setName(this.pileId);

    // Drop zone visual
    if (this.pileId !== PileId.None) {
      this.scene.add
        .graphics()
        .lineStyle(1, 0xffffff)
        .strokeRect(
          this.x,
          this.y,
          CARD_DIMENSIONS.width,
          CARD_DIMENSIONS.height
        );
    }
  }
}
