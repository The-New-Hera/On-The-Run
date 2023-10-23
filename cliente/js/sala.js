export default class sala extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () { }

  create () {
    this.mensagem = this.add.text(190, 50, 'Escolha uma sala para entrar:', {
      fontFamily: 'monospace',
      font: '24px Courier',
      fill: '#cccccc'
    })

    this.salas = [
      {
        numero: 1,
        x: 50,
        y: 125
      },
      {
        numero: 2,
        x: 213,
        y: 125
      },
      {
        numero: 3,
        x: 376,
        y: 125
      },
      {
        numero: 4,
        x: 539,
        y: 125
      },
      {
        numero: 5,
        x: 702,
        y: 125
      },
      {
        numero: 6,
        x: 50,
        y: 325
      },
      {
        numero: 7,
        x: 213,
        y: 325
      },
      {
        numero: 8,
        x: 376,
        y: 325
      },
      {
        numero: 9,
        x: 539,
        y: 325
      },
      {
        numero: 10,
        x: 702,
        y: 325
      }
    ]

    this.salas.forEach((sala) => {
      sala.botao = this.add.text(sala.x, sala.y, 'Sala ' + sala.numero, {
        fontFamily: 'monospace',
        font: '16px Courier',
        fill: '#cccccc'
      })
        .setInteractive()
        .on('pointerdown', () => {
          this.salas.forEach((item) => {
            item.botao.destroy()
          })
          this.game.sala = sala.numero
          this.game.socket.emit('entrar-na-sala', this.game.sala)
        })
    })

    this.game.socket.on('jogadores', (jogadores) => {
      console.log(jogadores)
      if (jogadores.segundo) {
        this.mensagem.setText('Conectando...')
        this.game.jogadores = jogadores
        this.game.scene.stop('sala')
        this.game.scene.start('principal')
      } else if (jogadores.primeiro) {
        this.mensagem.setText('Aguardando segundo jogador...')
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            this.game.midias = stream
          })
          .catch((error) => console.error(error))
      }
    })
  }

  update () { }
}
