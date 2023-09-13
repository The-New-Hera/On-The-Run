export default class finaltriste extends Phaser.Scene {
  constructor () {
    super('finaltriste')
  }

  preload () {
    this.load.image('finaltriste', '../assets/finaltriste.png')
  }

  create () {
    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'finaltriste')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('finaltriste')
        this.game.scene.start('abertura')
      })
  }

  update () { }
}