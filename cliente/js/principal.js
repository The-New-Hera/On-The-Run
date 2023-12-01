export default class principal extends Phaser.Scene {
  constructor () {
    super('principal')

    this.velocidade = 350
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

    this.load.spritesheet('nave', '../assets/nave.png', {
      frameWidth: 192,
      frameHeight: 192
    })

    this.load.spritesheet('botao', '../assets/botao.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet('botaodois', '../assets/botaodois.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet('botaotres', '../assets/botaotres.png', {
      frameWidth: 32,
      frameHeight: 32
    })

    this.load.spritesheet('vigagrande', '../assets/vigagrande.png', {
      frameWidth: 384,
      frameHeight: 64
    })

    this.load.spritesheet('vigapequena', '../assets/vigapequena.png', {
      frameWidth: 192,
      frameHeight: 64
    })

    this.load.spritesheet('primeirolaser', '../assets/primeirolaser.png', {
      frameWidth: 32,
      frameHeight: 384
    })

    this.load.spritesheet('segundolaser', '../assets/segundolaser.png', {
      frameWidth: 32,
      frameHeight: 320
    })

    this.load.spritesheet('alienrosa', '../assets/alienrosa.png', {
      frameWidth: 40,
      frameHeight: 54
    })

    this.load.spritesheet('alienverde', '../assets/alienverde.png', {
      frameWidth: 40,
      frameHeight: 54
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

    this.load.audio('trilha', '../assets/trilha.mp3')
    this.load.audio('metal', '../assets/metal.mp3')
    this.load.audio('somdobotao', '../assets/somdobotao.mp3')
    this.load.audio('somdepulo', '../assets/somdepulo.mp3')
    this.load.audio('somdasvigas', '../assets/somdasvigas.mp3')
    this.load.audio('somdolaser', '../assets/somdolaser.mp3')
    this.load.audio('queda-energia', './assets/queda-energia.mp3')
  }

  create () {
    this.trilha = this.sound.add('trilha')
    this.efeitoMetal = this.sound.add('metal')
    this.efeitoSomdobotao = this.sound.add('somdobotao')
    this.somdepulo = this.sound.add('somdepulo')
    this.somdasvigas = this.sound.add('somdasvigas')
    this.somdolaser = this.sound.add('somdolaser')
    this.quedaEnergia = this.sound.add('queda-energia')
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

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = 'alienrosa'
      this.remoto = 'alienverde'
      this.personagem = this.physics.add.sprite(-225, -1370, this.local, 9)
      this.personagemRemoto = this.add.sprite(-225, -980, this.remoto, 9)
    } else if (this.game.jogadores.segundo === this.game.socket.id) {
      this.local = 'alienverde'
      this.remoto = 'alienrosa'
      this.personagemRemoto = this.add.sprite(-225, -1370, this.remoto, 9)
      this.personagem = this.physics.add.sprite(-225, -980, this.local, 9)

      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        .then((stream) => {
          this.game.localConnection = new RTCPeerConnection(this.game.ice_servers)

          this.game.localConnection.onicecandidate = ({ candidate }) =>
            candidate && this.game.socket.emit('candidate', this.game.sala, candidate)

          this.game.localConnection.ontrack = ({ streams: [stream] }) =>
            this.game.audio.srcObject = stream

          stream.getTracks()
            .forEach((track) => this.game.localConnection.addTrack(track, stream))

          this.game.localConnection.createOffer()
            .then((offer) => this.game.localConnection.setLocalDescription(offer))
            .then(() => this.game.socket.emit('offer', this.game.sala, this.game.localConnection.localDescription))

          this.game.midias = stream
        })
        .catch((error) => console.error(error))
    }

    this.game.socket.on('offer', (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers)

      this.game.remoteConnection.onicecandidate = ({ candidate }) =>
        candidate && this.game.socket.emit('candidate', this.game.sala, candidate)

      this.game.remoteConnection.ontrack = ({ streams: [midia] }) =>
        this.game.audio.srcObject = midia

      this.game.midias.getTracks()
        .forEach((track) => this.game.remoteConnection.addTrack(track, this.game.midias))

      this.game.remoteConnection.setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) => this.game.remoteConnection.setLocalDescription(answer))
        .then(() => this.game.socket.emit('answer', this.game.sala, this.game.remoteConnection.localDescription))
    })

    this.game.socket.on('answer', (description) =>
      this.game.localConnection.setRemoteDescription(description)
    )

    this.game.socket.on('candidate', (candidate) => {
      const conn = this.game.localConnection || this.game.remoteConnection
      conn.addIceCandidate(new RTCIceCandidate(candidate))
    })

    this.cameras.main.startFollow(this.personagem)

    /* Animações */
    this.anims.create({
      key: 'personagem-parado',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 9,
        end: 9
      }),
      frameRate: 1
    })

    this.anims.create({
      key: 'personagem-direita',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 10,
        end: 18
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-esquerda',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 8
      }),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'personagem-cima',
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 9,
        end: 9
      }),
      frameRate: 6,
      repeat: -1
    })

    this.moeda = this.physics.add.sprite(1350, -540, 'moeda')
    this.moeda.body.setAllowGravity(false)

    this.botao = this.physics.add.sprite(225, -975, 'botao')
    this.botao.body.setAllowGravity(false)

    this.botaodois = this.physics.add.sprite(282, -590, 'botaodois')
    this.botaodois.body.setAllowGravity(false)

    this.botaotres = this.physics.add.sprite(1760, -336, 'botaotres')
    this.botaotres.body.setAllowGravity(false)

    this.anims.create({
      key: 'botao-pressionado',
      frames: this.anims.generateFrameNumbers('botao', {
        start: 0,
        end: 2
      }),
      frameRate: 2,
      repeat: 0
    })

    this.anims.create({
      key: 'botaodois-pressionado',
      frames: this.anims.generateFrameNumbers('botaodois', {
        start: 0,
        end: 2
      }),
      frameRate: 2,
      repeat: 0
    })

    this.anims.create({
      key: 'botaotres-pressionado',
      frames: this.anims.generateFrameNumbers('botaotres', {
        start: 0,
        end: 2
      }),
      frameRate: 2,
      repeat: 0
    })

    this.nave = this.physics.add.sprite(-100, -25, 'nave')
    this.nave.body.setAllowGravity(false)

    this.vigagrande = this.physics.add.sprite(-63, -542, 'vigagrande')
    this.vigagrande.body.setAllowGravity(false)
    this.vigagrande.setImmovable(true)

    this.vigapequena = this.physics.add.sprite(1567, -543, 'vigapequena')
    this.vigapequena.body.setAllowGravity(false)
    this.vigapequena.setImmovable(true)

    this.primeirolaser = this.physics.add.sprite(68, -1535, 'primeirolaser')
    this.primeirolaser.body.setAllowGravity(false)
    this.primeirolaser.setImmovable(true)

    this.segundolaser = this.physics.add.sprite(68, -1120, 'segundolaser')
    this.segundolaser.body.setAllowGravity(false)
    this.segundolaser.setImmovable(true)

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
        this.personagem.anims.play('personagem-direita', true)
        this.personagem.setVelocityX(this.velocidade)
      })
      .on('pointerup', () => {
        this.direita.setFrame(0)
        this.personagem.anims.play('personagem-parado')
        this.personagem.setVelocityX(0)
      })

    this.esquerda = this.add.sprite(50, 400, 'esquerda', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.esquerda.setFrame(1)
        this.personagem.anims.play('personagem-esquerda', true)
        this.personagem.setVelocityX(-this.velocidade)
      })
      .on('pointerup', () => {
        this.esquerda.setFrame(0)
        this.personagem.anims.play('personagem-parado')
        this.personagem.setVelocityX(0)
      })

    this.cima = this.add.sprite(700, 400, 'cima', 0)
      .setScrollFactor(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.cima.setFrame(1)
        if (this.personagem.body.blocked.down) {
          this.personagem.anims.play('personagem-cima', true)
          this.personagem.setVelocityY(-this.velocidade)
          this.somdepulo.play()
        }
      })
      .on('pointerup', () => {
        this.cima.setFrame(0)
        this.personagem.anims.play('personagem-parado')
      })

    this.layerPiso.setCollisionByProperty({ collides: true })
    this.layerChamas.setCollisionByProperty({ collides: true })

    this.physics.add.collider(this.personagem, this.layerPiso)
    this.physics.add.collider(this.moeda, this.layerPiso)
    this.physics.add.collider(this.botao, this.layerPiso)
    this.physics.add.collider(this.botaodois, this.layerPiso)
    this.physics.add.collider(this.botaotres, this.layerPiso)
    this.physics.add.collider(this.nave, this.layerPiso)
    this.physics.add.collider(this.vigagrande, this.layerPiso)
    this.physics.add.collider(this.vigapequena, this.layerPiso)
    this.physics.add.collider(this.primeirolaser, this.layerPiso)
    this.physics.add.collider(this.segundolaser, this.layerPiso)
    this.physics.add.collider(this.personagem, this.vigagrande)
    this.physics.add.collider(this.personagem, this.vigapequena)
    this.physics.add.collider(this.personagem, this.primeirolaser, this.morreu, null, this)
    this.physics.add.collider(this.personagem, this.segundolaser, this.morreu, null, this)
    this.physics.add.collider(this.personagem, this.layerChamas, this.morreu, null, this)
    this.physics.add.collider(this.personagem, this.nave, this.venceu, null, this)

    this.physics.add.overlap(
      this.personagem,
      this.moeda,
      this.coletar_moeda,
      null,
      this
    )

    this.physics.add.overlap(
      this.personagem,
      this.botao,
      this.apertar_botao,
      null,
      this
    )

    this.physics.add.overlap(
      this.personagem,
      this.botaodois,
      this.apertar_botaodois,
      null,
      this
    )

    this.physics.add.overlap(
      this.personagem,
      this.botaotres,
      this.apertar_botaotres,
      null,
      this
    )

    this.timer = 3
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timer--
        if (this.timer === 0) {
          this.trilha.pause()
          this.cameras.main.fadeOut(2000)
          this.quedaEnergia.play()
          this.primeirolaser.disableBody(true, true)
          this.cameras.main.once('camerafadeoutcomplete', (camera) => {
            camera.fadeIn(2000)
            this.trilha.resume()
          })
          this.timerEvent.destroy()
        }
      },
      callbackScope: this,
      loop: true
    })

    this.game.socket.on('estado-notificar', ({ cena, x, y, frame }) => {
      this.personagemRemoto.x = x
      this.personagemRemoto.y = y
      this.personagemRemoto.setFrame(frame)
    })

    this.game.socket.on('artefatos-notificar', (artefatos) => {
      if (artefatos.segundolaser) {
        this.segundolaser.disableBody(true, true)
      }
      if (artefatos.vigagrande) {
        this.vigagrande.body.setAllowGravity(true)
      }
      if (artefatos.vigapequena) {
        this.vigapequena.setVelocityX(50)
      }
    })

    this.game.socket.on('cena-notificar', (cena) => {
      this.game.scene.stop('principal')
      this.game.scene.start(cena)
    })
  }

  update () {
    try {
      this.game.socket.emit('estado-publicar', this.game.sala, {
        cena: 'principal',
        x: this.personagem.x,
        y: this.personagem.y,
        frame: this.personagem.frame.name
      })

      if (
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.personagem.getBounds(),
          this.nave.getBounds()
        ) &&
        Phaser.Geom.Intersects.RectangleToRectangle(
          this.personagemRemoto.getBounds(),
          this.nave.getBounds()
        )
      ) {
        this.game.socket.emit('cena-publicar', this.game.sala, 'finalfeliz')
        this.game.scene.stop('principal')
        this.game.scene.start('finalfeliz')
      }
    } catch (error) {
      console.error(error)
    }
  }

  coletar_moeda () {
    this.efeitoMetal.play()
    this.moeda.disableBody(true, true)
  }

  apertar_botao () {
    /* Frame menor que 2 = botão ainda não pressionado */
    if (this.botao.frame.name < 2) {
      this.efeitoSomdobotao.play()
      this.botao.anims.play('botao-pressionado')
      this.segundolaser.disableBody(true, true)
      this.game.socket.emit('artefatos-publicar', this.game.sala, {
        segundolaser: true
      })
    }
  }

  apertar_botaodois () {
    /* Frame menor que 2 = botão ainda não pressionado */
    if (this.botaodois.frame.name < 2) {
      this.efeitoSomdobotao.play()
      this.botaodois.anims.play('botaodois-pressionado')
      this.vigagrande.body.setAllowGravity(true)
      this.game.socket.emit('artefatos-publicar', this.game.sala, {
        vigagrande: true
      })
    }
  }

  apertar_botaotres () {
    /* Frame menor que 2 = botão ainda não pressionado */
    if (this.botaotres.frame.name < 2) {
      this.efeitoSomdobotao.play()
      this.botaotres.anims.play('botaotres-pressionado')
      this.vigapequena.setVelocityX(50)
      this.game.socket.emit('artefatos-publicar', this.game.sala, {
        vigapequena: true
      })
    }
  }

  morreu () {
    this.personagem.setVelocityX(0)
    this.personagem.setVelocityY(0)
    this.personagem.anims.play('alienrosa-parado')
    this.personagem.x = this.x
    this.personagem.y = this.y
    this.trilha.stop()
    this.game.socket.emit('cena-publicar', this.game.sala, 'finaltriste')
    this.game.scene.stop('principal')
    this.game.scene.start('finaltriste')
  }

  venceu () {
    this.personagem.setVelocityX(0)
    this.personagem.setVelocityY(0)
    this.personagem.anims.play('alienrosa-parado')
    this.personagem.x = this.x
    this.personagem.y = this.y
    this.trilha.stop()
    this.game.scene.stop('principal')
    this.game.scene.start('finalfeliz')
  }
}
