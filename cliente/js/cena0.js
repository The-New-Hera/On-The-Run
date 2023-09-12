export default class cena0 extends Phaser.Scene {
  constructor () {
    super('cena0')
  }

  preload () {
    this.load.tilemapTiledJSON('mapa', '../assets/mapa/mapa.json')

    this.load.image('ifsc-sj-2014', '../assets/ifsc-sj-2014.png')
    this.load.image('[64x64] Dungeon Bricks Shadow', '../assets/[64x64]Dungeon Bricks Shadow.png')
    this.load.image('bloco roxo', '../assets/bloco roxo.png')
    this.load.image('fogo', '../assets/fogo.png')

    this.load.spritesheet('moeda', '../assets/moeda.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('alien rosa', '../assets/alien rosa.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('alien verde', '../assets/alien verde.png', {
      frameWidth: 64,
      frameHeight: 64
    })

    this.load.spritesheet('Derek', '../assets/Derek.png', {
      frameWidth: 64,
      frameHeight: 64
    })

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
    this.tilemapMapa = this.make.tilemap({ key: 'mapa' })

    this.tilesetFogo = this.tilemapMapa.addTilesetImage('fogo')
    this.tilesetBlocoRoxo = this.tilemapMapa.addTilesetImage('bloco roxo')
    this.tilesetBlocoEscuro = this.tilemapMapa.addTilesetImage('[64x64] Dungeon Bricks Shadow')

    this.layerPiso = this.tilemapMapa.createLayer('piso', [this.tilesetBlocoRoxo])
    this.layerFundo = this.tilemapMapa.createLayer('fundo', [this.tilesetBlocoEscuro])
    this.layerChamas = this.tilemapMapa.createLayer('chamas', [this.tilesetFogo])

    /* Imagem de fundo */
    this.add.image(400, 225, 'ifsc-sj-2014')

    /* Personagem */
    this.personagem = this.physics.add.sprite(400, 225, 'Derek')
    this.cameras.main.startFollow(this.personagem)

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

    this.moeda = this.physics.add.sprite(200, -30, 'moeda')

    this.anims.create({
      key: 'moeda-brilhando',
      frames: this.anims.generateFrameNumbers('moeda', {
        start: 0,
        end: 3
      }),
      frameRate: 12,
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
