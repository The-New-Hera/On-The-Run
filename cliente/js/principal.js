export default class principal extends Phaser.Scene {
  constructor () {
    super('principal')

    this.velocidade = 500
  }

  preload () {
    this.load.tilemapTiledJSON('principal', '../assets/mapa.json')

    this.load.image('blocoescuro', '../assets/blocoescuro.png')
    this.load.image('blocoroxo', '../assets/blocoroxo.png')
    this.load.image('fogo', '../assets/fogo.png')

    this.load.spritesheet('moeda', '../assets/moeda.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet('alienrosa', '../assets/alienrosa.png', {
      frameWidth: 40,
      frameHeight: 52
    })

    this.load.spritesheet('alienverde', '../assets/alienverde.png', {
      frameWidth: 40,
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

    this.load.audio('metal', '../assets/metal.mp3')
    this.load.audio('trilha', '../assets/techno.mp3')
  }

  create () {
    this.trilha = this.sound.add('trilha')
    this.efeitoMetal = this.sound.add('metal')
    this.trilha.loop = true
    this.trilha.play()

    this.tilemapPrincipal = this.make.tilemap({
      key: 'principal'
    })

    this.tilesetFogo = this.tilemapPrincipal.addTilesetImage('fogo')
    this.tilesetBlocoroxo = this.tilemapPrincipal.addTilesetImage('blocoroxo')
    this.tilesetBlocoescuro = this.tilemapPrincipal.addTilesetImage('blocoescuro')

    this.layerFundo = this.tilemapPrincipal.createLayer('fundo', [this.tilesetBlocoescuro])
    this.layerChamas = this.tilemapPrincipal.createLayer('chamas', [this.tilesetFogo])
    this.layerPiso = this.tilemapPrincipal.createLayer('piso', [this.tilesetBlocoroxo])

    /* Personagem */
    // this.personagem = this.physics.add.sprite(400, -1200, 'alienverde')
    this.personagem = this.physics.add.sprite(400, -1200, 'alienrosa')
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
        end: 18
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
        end: 8
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
        this.personagem.anims.play('alienrosa-direita', true)
        this.personagem.setVelocityX(this.velocidade)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('alienrosa-parado')
        this.personagem.setVelocityX(0)
      })

    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('alienrosa-esquerda', true)
        this.personagem.setVelocityX(-this.velocidade)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('alienrosa-parado')
        this.personagem.setVelocityX(0)
      })

    this.cima = this.add.sprite(700, 400, 'cima', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        this.personagem.anims.play('alienrosa-cima', true)
        this.personagem.setVelocityY(-this.velocidade)
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('alienrosa-parado')
        this.personagem.setVelocityY(0)
      })

    this.layerPiso.setCollisionByProperty({ collides: true })
    this.layerChamas.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.personagem, this.layerPiso)
    this.physics.add.collider(this.personagem, this.layerChamas, this.morreu, null, this)

    this.physics.add.overlap(
      this.personagem,
      this.moeda,
      this.coletar_moeda,
      null,
      this
    )
  }

  update () { }

  coletar_moeda () {
    this.efeitoMetal.play()
    this.moeda.disableBody(true, true)
  }

  morreu () {
    this.game.scene.stop()
    this.game.scene.start('finaltriste')
  }
}
