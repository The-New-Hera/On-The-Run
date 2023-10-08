export default class sala extends Phaser.Scene {
  constructor () {
    super('sala')
  }

  preload () { }

  create () {
    this.salas = [
      {
        numero: 1,
        x: 50,
        y: 100
      },
      {
        numero: 2,
        x: 213,
        y: 100
      },
      {
        numero: 3,
        x: 376,
        y: 100
      },
      {
        numero: 4,
        x: 539,
        y: 100
      },
      {
        numero: 5,
        x: 702,
        y: 100
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
      sala.botao = this.add.text(sala.x, sala.y, 'Sala ' + sala.numero)
        .setInteractive()
        .on('pointerdown', () => {
          this.game.socket.on('jogadores', (jogadores) => {
            this.game.jogadores = jogadores
            console.log(jogadores)
            this.game.scene.stop('sala')
            this.game.scene.start('principal')
          })
          this.game.socket.emit('entrar-na-sala', sala.numero)
          this.aguarde = this.add
            .text(this.game.config.width / 2, this.game.config.height / 2, 'Conectando...')
        })
    })
  }

  update () { }
}
