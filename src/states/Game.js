
import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'
export default class extends Phaser.State {
  constructor() {
    super()

    this.ballOnPaddle = true
  }
  init () {}
  preload () {}

  create () {
    this.game.physics.arcade.checkCollision.down = false
    this.setUpText()
    this.setUpBricks()
    this.setUpPaddle()
    this.setUpBall()

    this.game.input.onDown.add(this.releaseBall, this)
  }

  releaseBall() {
    this.ballOnPaddle = false
    // prevents cheating :p
    //if(!this.ballOnPaddle) {
      //return
    //}
    this.ball.body.velocity.x = -20
    this.ball.body.velocity.y = -300
  }

  setUpBall() {
    this.ball = new Ball(this.game)
    this.game.add.existing(this.ball)
    this.ball.events.onOutOfBounds.add(this.ballLost,this)
    this.putBallOnPaddle()
  }

  ballLost() {
    --this.game.gloabal.lives

    if(this.game.gloabal.lives === 0) {
      //end the game
      this.endGame()
      return
    }
    this.livesText.text = `Lives : ${this.game.gloabal.lives}`
    this.putBallOnPaddle()
  }

  endGame() {
    this.game.state.start('Gameover')
  }

  putBallOnPaddle() {
    this.ballOnPaddle = true
    this.ball.reset(this.paddle.body.x, this.paddle.y - this.paddle.body.height)
  }

  setUpPaddle() {
    this.paddle = new Paddle(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 100

    )
    this.game.add.existing(this.paddle)
  }

  setUpBricks() {

    this.bricks = this.game.add.group()
    this.generateBricks(this.bricks)
  }

  generateBricks(bricksGroup) {
    let rows = 5
    let columns = 15
    let xoffset = 50
    let yoffset = 45
    let brick
    for(let y = 0; y < rows; y++) {
      for(let x = 0; x  < columns; x++) {
        brick = new Brick(
          this.game,
          x * xoffset,
          y * yoffset,

        )

        bricksGroup.add(brick)
      }
    }
  //  console.log(bricksGroup)

    let bricksGroupWidth = ((xoffset * columns) - (xoffset - brick.width)) / 2

    bricksGroup.position.setTo(
      this.game.world.centerX - bricksGroupWidth,
      this.game.world.centerY - 250
    )
  }

 setUpText() {
   this.scoreText = this.createText(20,20, 'left', `Score : ${this.game.global.score}`)
   this.livesText = this.createText(0,20, 'center', `Lives : ${this.game.global.lives}`)
   this.levelText = this.createText(-20,20, 'right', `Level : ${this.game.global.level}`)

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

 update() {
   if(this.ballOnPaddle) {
     this.ball.body.x = this.paddle.x - (this.ball.width / 2)
   }

   this.game.physics.arcade.collide(
     this.ball,
     this.paddle,
     this.ballHitPaddle,
     null,
     this
   )

   this.game.physics.arcade.collide(
     this.ball,
     this.bricks,
     this.ballHitBrick,
     null,
     this
   )
   //this.setUpText()
 }

 ballHitBrick(ball , brick) {
   brick.kill()

   this.game.global.score += 10
   this.scoreText.text = `Score : ${this.game.global.score}`

   if(this.bricks.countLiving() > 0) {
     return
   }
   else {
     this.game.global.level += 1
     this.levelText.text = `Level : ${this.game.gloabal.level}`

     this.putBallOnPaddle()
     this.generateBricks(this.bricks)
   }
 }

ballHitPaddle(ball,paddle) {

  let diff = 0

  if(ball.x < paddle.x) {
    diff = paddle.x - ball.x
    ball.body.velocity.x = (-10 * diff)
    return
  }

  if(ball.x > paddle.x) {
    diff =   ball.x - paddle.x
    ball.body.velocity.x = (10 * diff)
    return
  }

}

  render () {

  }
}
