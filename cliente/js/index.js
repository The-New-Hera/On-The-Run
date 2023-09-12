import config from './config.js'
import abertura from './abertura.js'
import labirinto from './labirinto.js'
import finalfeliz from './finalfeliz.js'
import finaltriste from './finaltriste.js'

class Game extends Phaser.Game {
  constructor () {
    super(config)

    this.scene.add('abertura', abertura)
    this.scene.add('labirinto', labirinto)
    this.scene.add('finalfeliz', finalfeliz)
    this.scene.add('finaltriste', finaltriste)
    this.scene.start('abertura')
  }
}

window.onload = () => {
  window.game = new Game()
}
