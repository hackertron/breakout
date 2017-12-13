
import Phaser from 'phaser'


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.setUpText()

  }

 setUpText() {
   this.game.add.text(1,1,'hello' {font : '18px Arial' , fill : '#000', boundsAlignH: 'center'}).setTextBounds(0,0, this.game.world.width, 0);
 }
  render () {

  }
}
