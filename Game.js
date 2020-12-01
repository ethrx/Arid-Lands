class Game {
    constructor() {
        this.playerReady = false;
        this.countDownTicks = 0;
        this.countDownText = "";
        this.countDownOver = false;
        this.gameOver = false;
        this.renderCrab = true;
        this.score = 0
        this.animals = []
        this.needsToPopulate = true
        this.ticks = 0
        this.inARow = 1
        this.interval = 160
        this.tickInterval = 0
        this.multiplier = 1
        this.inGame = true
        this.playColor = color(0, 0, 0)
        this.streaks = []
    }
    countDown() {
        textAlign("center");
        textSize(75)
        textFont(this.font)
        text(this.countDownText, width / 2, height / 2);

        this.countDownTicks += 1

        if (this.countDownTicks == 60) {
            this.countDownText = "3"
        } else if (this.countDownTicks == 120) {
            this.countDownText = "2"
        } else if (this.countDownTicks == 180) {
            this.countDownText = "1"
        } else if (this.countDownTicks == 240) {
            this.countDownText = "GO!"
        } else if (this.countDownTicks > 300) {
            this.countDownText = "";
            this.countDownOver = true;
        }
        if (this.player.position.x < 100) {
            this.player.position.x += 0.8
        } else {
            this.playerReady = true;
        }

    }
    playerEnterance() {


        //crab = image(this.crabModel)

    }
    keyboardCode() {
        if (mouseIsPressed) {
            if (mouseX >= 1270 && mouseX <= 1280) {
                if (mouseY >= 0 && mouseY <= 10) {
                    this.multiplier += 1
                }
            }
        }
        if (keyIsPressed) {
            if (this.animals[keyCode - 48] != undefined) {

                let sprite = this.animals[keyCode - 48]
                if (!sprite.evil) {

                    console.log("Fail!")
                    this.score = 0
                    this.interval = 160 - (this.score * 6 < 1 ? 0 : this.score * 6)
                    this.streaks.push(this.inARow - 1)
                    this.inARow = 1

                    this.multiplier = 1
                    this.sprites.availableKeys.push(sprite.key)
                    sprite.remove()
                    delete this.animals[keyCode - 48]
                } else {
                    console.log("Success")
                    this.inARow += 1
                    if (this.inARow % 5 == 0) {
                        this.multiplier += 0.4
                    }

                    this.score += 1 * this.multiplier
                    this.sprites.availableKeys.push(sprite.key)
                    sprite.remove()

                    delete this.animals[keyCode - 48]
                }
            }

        }
    }
    game() {
        //console.log(`${game.ticks}:${game.interval}`)

        this.keyboardCode()
        if (!this.countDownOver) {
            this.countDown();
        } else if (this.playerReady && this.countDownOver) {
            this.keyboardCode()
            this.animals.forEach((i) => i.render(this))

            if (this.interval > 30) {
                this.interval = 160 - (this.score * 6 < 1 ? 0 : this.score * 6)
            } else {
                this.interval = 20
            }
            if (this.ticks > this.interval) {
                this.ticks = this.interval - this.tickInterval
            }


            textSize(40)
            textFont(this.font)
            text("Score: " + round(this.score * 10), 50, 50)
            text("Multiplier: x" + round(this.multiplier), 50, 100)
            text("Streak: " + (this.inARow - 1), 50, 150)
            this.ticks = round(this.ticks)
            this.interval = round(this.interval)

            this.ticks += this.tickInterval
            this.tickInterval = 1

            this.ticks = round(this.ticks)



            if (this.ticks == this.interval && sprites.availableKeys.length > 0) {
                this.ticks = 0
                let animal = sprites.otherSprite()
                    // render 
                animal.render = function(self) {
                    // play the game!!


                    // collides with player
                    if (animal.collide(self.player)) {
                        // evil
                        if (animal.evil) {
                            self.streaks.push(self.inARow)
                            self.gameOver = true;
                            self.animals.forEach((i) => {
                                i.remove()
                            })
                            self.player.remove()
                        }
                        // not evil 
                        else {
                            self.multiplier += 0.2
                            sprites.availableKeys.push(animal.key)
                            animal.renderSprite = false
                            animal.remove()
                        }
                    }
                    // doesn't collide with player 
                    else {
                        // move the sprites towards player
                        if (animal.renderSprite) {
                            let speed = round(self.score / 6 > 10 ? 10 : self.score / 6, 2)
                            if (speed < 0) {
                                speed = 1
                            }
                            animal.move(random(1 + speed, 2 + speed), sprites)
                        }
                        // don't render the sprite
                        else {
                            animal.remove()

                        }

                    }
                    // update score


                    // if they get multiple in a row

                }
                this.animals[animal.key] = animal

            } else if (this.ticks == this.interval) {
                this.tickInterval = 0
            }



        }
    }

    buttonHandlers() {
        this.playColor = color(0, 0, 0)
        this.tutorialColor = color(0, 0, 0)

        // start button
        if (
            mouseX >= 350 &&
            mouseY >= 650 &&
            mouseX <= 490 &&
            mouseY <= 700
        ) {
            this.playColor = color("#4C4C4C")
            if (mouseIsPressed) {
                this.startGameFromTutorial()
            }
        }


    }
    tutorial() {
        this.buttonHandlers()

        textFont(this.font)
        textSize(45)
        textAlign("center")
        text("How to play Arid Lands", width / 2, 50)
        textSize(35)
        text("Good animals", width / 2 + 515, height / 5)
        text("Bad animals", width / 2 + 300, height / 5)
            // how to play
        let instructions = "Hey there explorer! Your job is to rescue the desert animals, and save them from the invading ones (non-desert animals). You have to press the number on your keyboard that is above the head of the bad animals. You get points for doing so! \n\n\nHowever if you press the number of a good animal, you loose all of your score! Simply make sure the good animals get to you safely. If that happens your multiplier increases. If a bad animal gets to you, its game over! Try to get the highest score, and save all the desert animals!!!\n\nPress play to start."
        textSize(30)
        text(instructions,
                75, // x1
                100, // x2
                (instructions.length * 1.25), // width?
                600 // height?
            )
            // outline box
        noFill();
        strokeWeight(5)
        rect(width / 2 + 200, height / 2 - 250, 420, height - 115, 20);
        line(width / 2 + 405, height / 2 - 250, width / 2 + 405, height - 5)

        this.sprites.evilImages.forEach((img, i) => {

            image(img, width / 2 + 215 + (i % 2 != 0 ? 100 : 0), 160 + (i % 2 == 0 ? (i * 60) : ((i - 1) * 60)), 75, 75)
        })
        this.sprites.desertEmojis.forEach((img, i) => {

            image(img, width / 2 + 425 + (i % 2 != 0 ? 100 : 0), 160 + (i % 2 == 0 ? (i * 60) : ((i - 1) * 60)), 75, 75)
        })

        // style settings
        textSize(30);
        textFont(this.font)
        fill(this.playColor);
        stroke(this.playColor);
        strokeWeight(1);

        // play button

        textAlign("center");
        text("PLAY", 420, height / 2 + 325);
        noFill();
        strokeWeight(3);
        rect(
            350,
            (height / 2 + 325) - 35,
            70 * 2,
            50, 10
        )


    }


    show() {
        if (this.mode == "game") {
            if (!this.gameOver) {
                this.game()
            } else {
                if (keyIsPressed && keyCode == 32) {
                    this.mode = "title"

                } else {
                    textSize(55);
                    textAlign("center")
                    textFont(this.font)
                    text("Game Over!", width / 2, height / 2 - 75);
                    textSize(50);
                    text("Score: " + round(this.score * 10), width / 2, height / 2)
                    text("Highest streak: " + Math.max.apply(Math, this.streaks), width / 2, height / 2 + 50)
                    text("Press SPACE to return to menu", width / 2, height / 2 + 125)
                }
            }
        } else if (this.mode == "tutorial") {
            this.tutorial()
        } else if (this.mode == "title") {
            this.active = false
        }
    }
}

/*

key code evil
if (keyIsPressed) {
    if (keyCode == (sprite.key + 48)) {
    	sprite.inARow(true)
        console.log("Fail!")
        sprite.updateScore(-5)
        self.availableKeys.push(sprite.key)
        sprite.renderSprite = false
    }

}

key code good
if (keyIsPressed) {
    if (keyCode == (sprite.key + 48)) {
        console.log("Success")
        sprite.inARow()
        sprite.updateScore(1)
        self.availableKeys.push(sprite.key)
        sprite.renderSprite = false
    }

}
*/