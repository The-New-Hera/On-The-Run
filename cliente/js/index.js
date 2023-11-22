import config from './config.js'
import abertura from './abertura.js'
import sala from './sala.js'
import principal from './principal.js'
import finalfeliz from './finalfeliz.js'
import finaltriste from './finaltriste.js'
import cenafinal from './cenafinal.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.id = 8
    this.valor = 100

    let iceServers
    if (window.location.host === 'feira-de-jogos.sj.ifsc.edu.br') {
      iceServers = [
        {
          urls: 'stun:feira-de-jogos.sj.ifsc.edu.br'
        },
        {
          urls: 'turns:feira-de-jogos.sj.ifsc.edu.br',
          username: 'adcipt',
          credential: 'adcipt20232'
        }
      ]
    } else {
      iceServers = [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    }
    this.iceServers = { iceServers }
    this.audio = document.querySelector('audio')

    this.socket = io()
    this.socket.on('connect', () => {
      console.log('Conectado ao servidor!')
    })

    this.scene.add('abertura', abertura)
    this.scene.add('sala', sala)
    this.scene.add('principal', principal)
    this.scene.add('finalfeliz', finalfeliz)
    this.scene.add('finaltriste', finaltriste)
    this.scene.add('cenafinal', cenafinal)

    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
