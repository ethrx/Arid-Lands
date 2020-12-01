class GenerateSprites {

    playerSprite() {
        let playerImg = loadImage("assets/images/player.png");
        let player = createSprite()
        player.addImage(playerImg);
        player.position.x = -50
        player.position.y = height - 150
        player.scale = 0.8
        return player
    }
    otherSprite() {
        let sprite = createSprite()
        sprite.evil = Math.random() <= 0.5
        sprite.position.x = width + 75
        sprite.position.y = height - 100

        if (sprite.evil) {
            let spriteImg = random(this.evilImages)
            sprite.addImage(spriteImg);

        } else {
            let spriteImg = random(this.desertEmojis)
            sprite.addImage(spriteImg);

        }

        let kkey = Math.floor(Math.random() * this.availableKeys.length);
        sprite.key = this.availableKeys[kkey]
        this.availableKeys.splice(kkey, 1)
        sprite.keyi = this.keys[sprite.key]
        sprite.keyi.resize(50,50)
            //console.log(crab.key)
            //console.log(this.keys[crab.key])
        sprite.move = function(speed, self) {
            sprite.position.x -= speed
            image(sprite.keyi, sprite.position.x - 25, sprite.position.y - 100)
                //key code
        }

        sprite.renderSprite = true
        return sprite
    }
}