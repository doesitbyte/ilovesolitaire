"use client";

import * as Phaser from "phaser";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  key: "PreInitState",
  visible: false,
};

export default class PreInitState extends Phaser.Scene {
  public constructor() {
    super(sceneConfig);
  }

  public preload(): void {}

  public create(): void {
    this.scene.start("InitState");
  }
}
