export default class labirinto extends Phaser.Scene {
  constructor () {
    super('labirinto')

    this.velocidade = 200
  }

  preload () {
    this.load.tilemapTiledJSON('labirinto', '../assets/mapa.json')

    this.load.image('blocoescuro', '../assets/blocoescuro.png')
    this.load.image('blocoroxo', '../assets/blocoroxo.png')
    this.load.image('fogo', '../assets/fogo.png')

    this.load.spritesheet('moeda', '../assets/moeda.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet('alienrosa', '../assets/alienrosa.png', {
      frameWidth: 36,
      frameHeight: 54
    })

    this.load.spritesheet('alienverde', '../assets/alienverde.png', {
      frameWidth: 36,
      frameHeight: 52
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
    this.tilemapLabirinto = this.make.tilemap({
      key: 'labirinto'
    })

    this.tilesetFogo = this.tilemapLabirinto.addTilesetImage('fogo')
    this.tilesetBlocoroxo = this.tilemapLabirinto.addTilesetImage('blocoroxo')
    this.tilesetBlocoescuro = this.tilemapLabirinto.addTilesetImage('blocoescuro')

    this.layerPiso = this.tilemapLabirinto.createLayer('piso', [this.tilesetBlocoroxo])
    this.layerFundo = this.tilemapLabirinto.createLayer('fundo', [this.tilesetBlocoescuro])
    this.layerChamas = this.tilemapLabirinto.createLayer('chamas', [this.tilesetFogo])

    /* Personagem */
    this.personagem = this.physics.add.sprite(400, 225, 'alienverde')
    this.personagem = this.physics.add.sprite(400, 225, 'alienrosa')
    this.cameras.main.startFollow(this.personagem)

    /* Animações */
    this.anims.create({
      key: 'alienverde-parado',
      frames: this.anims.generateFrameNumbers('alienverde', {
        start: 11,
        end: 11
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'alienrosa-parado',
      frames: this.anims.generateFrameNumbers('alienrosa', {
        start: 10,
        end: 10
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'alienverde-direita',
      frames: this.anims.generateFrameNumbers('alienverde', {
        start: 12,
        end: 19
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'alienrosa-direita',
      frames: this.anims.generateFrameNumbers('alienrosa', {
        start: 11,
        end: 19
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'alienverde-esquerda',
      frames: this.anims.generateFrameNumbers('alienverde', {
        start: 1,
        end: 10
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'alienrosa-esquerda',
      frames: this.anims.generateFrameNumbers('alienrosa', {
        start: 1,
        end: 9
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'alienverde-cima',
      frames: this.anims.generateFrameNumbers('alienverde', {
        start: 11,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: 'alienrosa-cima',
      frames: this.anims.generateFrameNumbers('alienrosa', {
        start: 10,
        end: 10
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

    this.moeda.anims.play('moeda-brilhando')

    /* Botões */
    this.direita = this.add.sprite(150, 400, 'direita', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.direita.setFrame(1)
        this.personagem.anims.play('derek-direita', true)
        this.personagem.setVelocityX(this.velocidade)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('derek-parado')
        this.personagem.setVelocityX(0)
      })

    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('derek-esquerda', true)
        this.personagem.setVelocityX(-this.velocidade)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('derek-parado')
        this.personagem.setVelocityX(0)
      })

    this.cima = this.add.sprite(700, 400, 'cima', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        this.personagem.anims.play('derek-cima', true)
        this.personagem.setVelocityY(-this.velocidade)
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('derek-parado')
        this.personagem.setVelocityY(0)
      })

    this.layerPiso.setCollisionByProperty({ collides: true })
    this.layerChamas.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.personagem, this.layerPiso)
    this.physics.add.collider(this.personagem, this.layerChamas)

    this.physics.add.collider(this.personagem, this.moeda, this.coletar_moeda, null, this)
  }

  update () { }

  coletar_moeda () {
    this.moeda.disableBody(true, true)
  }
}
