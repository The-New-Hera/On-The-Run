import config from './config.js'
import abertura from './abertura.js'
import principal from './principal.js'
import finalfeliz from './finalfeliz.js'
import finaltriste from './finaltriste.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.socket = io()
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor!')
      this.socket.emit('entrar-na-sala', 1)

      this.socket.on('jogadores', (jogadores) => {
        console.log(jogadores)
      })
    })

    this.scene.add('abertura', abertura)
    this.scene.add('principal', principal)
    this.scene.add('finalfeliz', finalfeliz)
    this.scene.add('finaltriste', finaltriste)
    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
