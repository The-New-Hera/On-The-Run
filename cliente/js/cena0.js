export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')
    this.load.spritesheet('Derek', '../assets/Derek.png',
      {
        frameWidth: 64,
        frameHeight: 64
      }
    )

    this.load.spritesheet('direita', '../assets/direita.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('esquerda', '../assets/esquerda.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('cima', '../assets/cima.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  create () {
    /* Imagem de fundo */
    this.add.image(400, 225, 'ifsc-sj-2014')

    /* Personagem */
    this.personagem = this.physics.add.sprite(400, 225, 'Derek')

    /* Animações */
    this.anims.create({
      key: 'Derek-parado',
      frames: this.anims.generateFrameNumbers('Derek', {
        start: 0,
        end: 0
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'Derek-direita',
      frames: this.anims.generateFrameNumbers('Derek', {
        start: 8,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'Derek-esquerda',
      frames: this.anims.generateFrameNumbers('Derek', {
        start: 4,
        end: 7
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'Derek-cima',
      frames: this.anims.generateFrameNumbers('Derek', {
        start: 0,
        end: 2
      }),
      frameRate: 6,
      repeat: -1
    })

    /* Botões */
    this.direita = this.add.sprite(150, 400, 'direita', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('Derek-direita', true)
        this.personagem.setVelocityX(100)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('Derek-parado')
        this.personagem.setVelocityX(0)
      })

    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('Derek-esquerda', true)
        this.personagem.setVelocityX(-100)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('Derek-parado')
        this.personagem.setVelocityX(0)
      })

    this.cima = this.add.sprite(700, 400, 'cima', 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        this.personagem.anims.play('Derek-cima', true)
        this.personagem.setVelocityY(-300)
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('Derek-parado')
        this.personagem.setVelocityY(0)
      })
  }

  update () { }
}
