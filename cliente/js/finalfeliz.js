export default class finalfeliz extends Phaser.Scene {
  constructor () {
    super('finalfeliz')
  }

  preload () {
    this.load.image('finalfeliz', '../assets/finalfeliz.png')
    this.load.audio('somfeliz', '../assets/somfeliz.mp3')
  }

  create () {
    this.somfeliz = this.sound.add('somfeliz')
    this.somfeliz.loop = true
    this.somfeliz.play()

    this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'finalfeliz')
      .setInteractive()
      .on('pointerdown', () => {
        this.somfeliz.stop()
        this.game.scene.stop('finalfeliz')
        this.game.scene.start('abertura')
      })
  }

  update () { }
}
