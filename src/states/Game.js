
import Phaser from 'phaser'


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.setUpText()

  }

 setUpText() {

 }

 createText() {
   this.game.add.text(0,
     20,
     'hello',
      {
        font : '18px Arial' ,
         fill : '#000',
          boundsAlignH: 'center'
        }).setTextBounds(0,0, this.game.world.width, 0);

 }
  render () {

  }
}
