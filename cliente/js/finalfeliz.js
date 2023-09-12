export default class finalfeliz extends Phaser.Scene {
  constructor () {
    super('finalfeliz')
  }

  preload () {
    this.load.spritesheet('', '../assets/.png', { frameWidth: 250, frameHeight: 250 })
  }

  create () {
    this.anims.create({
      key: '',
      frames: this.anims.generateFrameNumbers('', {
        start: ,
        end: 
      }),
      frameRate: 12,
      repeat: -1
    })

    this.add.sprite(this.game.config.width * 0.5, this.game.config.height * 0.5, '')
      .anims.play('')
      .setInteractive()
      .on('pointerdown', () => {
        this.game.scene.stop('finalfeliz')
        this.game.scene.start('abertura')
      })

    this.cameras.main.setZoom(4)
  }

  update () { }
}