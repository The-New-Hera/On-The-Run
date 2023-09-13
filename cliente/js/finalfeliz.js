export default class finalfeliz extends Phaser.Scene {
  constructor () {
    super('finalfeliz')
  }

  preload () {
    this.load.image('finalfeliz', '../assets/finalfeliz.png')
  }

  create () {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'finalfeliz')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('finalfeliz')
        this.game.scene.start('abertura')
      })
  }

  update () { }
}