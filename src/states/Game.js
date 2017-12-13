
import Phaser from 'phaser'


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.setUpText()
    

  }

 setUpText() {
   this.createText(20,20, 'left', `Score : ${this.game.global.score}`);
   this.createText(0,20, 'center', `Lives : ${this.game.global.lives}`);
   this.createText(-20,20, 'right', `Level : ${this.game.global.level}`);

 }

 createText(x0ffset, y0ffset, align, text) {
   this.game.add.text(
     x0ffset,
     y0ffset,
     text,
      {
        font : '18px Arial' ,
         fill : '#000',
          boundsAlignH: align
        }).setTextBounds(0,0, this.game.world.width, 0);

 }
  render () {

  }
}
