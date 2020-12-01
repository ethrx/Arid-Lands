function setup() {
    const cw = 1280
    const ch = 720
    createCanvas(cw, ch);

    keys = []
    for (let x = 0; x < 10; x++) {
        keys.push(loadImage("assets/images/keys/" + x + ".png"))
    }
    // fonts
    font_backbones = loadFont("assets/fonts/Backbones.ttf")
    font_coolvetica = loadFont("assets/fonts/coolvetica.ttf")

    // title screen
    titleScreen = new TitleScreen();
    titleScreen.cw = cw;
    titleScreen.ch = ch - 30;
    titleScreen.titleFont = font_backbones;
    titleScreen.buttonFont = font_coolvetica;

    // background
    bg1 = loadImage("assets/images/background-1.png");
    bg2 = loadImage("assets/images/background-2.png");
    bg3 = loadImage("assets/images/background-3.png");
    bg4 = loadImage("assets/images/background-4.png");
    //bg3 = loadImage("assets/images/background-1.png");
    titleBg = new Background();
    titleBg.bg = bg1;
    // initial speed
    titleBg.bgSpeed = 1.75;

    currentModal = {};
    currentModal.show = function() {
        return;
    }

    // game setup
    game = {};
    game.show = function() {
        return;
    }

    sprites = new GenerateSprites()
    sprites.keys = keys
    sprites.availableKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    sprites.evilImages = []
    sprites.evilImages.push(loadImage("assets/images/crab.png"))
    sprites.evilImages.push(loadImage("assets/images/chipmunk.png"))
    sprites.evilImages.push(loadImage("assets/images/bird.png"))

    sprites.evilImages.push(loadImage("assets/images/duck.png"))

    sprites.evilImages.push(loadImage("assets/images/chick.png"))

    sprites.evilImages.push(loadImage("assets/images/penguin.png"))

    sprites.evilImages.push(loadImage("assets/images/hedgehog.png"))

    sprites.evilImages.push(loadImage("assets/images/skunk.png"))
    sprites.evilImages.push(loadImage("assets/images/swan.png"))
    sprites.evilImages.push(loadImage("assets/images/turkey.png"))

    sprites.desertEmojis = []
    sprites.desertEmojis.push(loadImage("assets/images/scorpion.png"))
    sprites.desertEmojis.push(loadImage("assets/images/snake.png"))
    sprites.desertEmojis.push(loadImage("assets/images/camel.png"))
    sprites.desertEmojis.push(loadImage("assets/images/2camel.png"))
    sprites.desertEmojis.push(loadImage("assets/images/cockroach.png"))

    inGame = true

    crabGif = loadImage("assets/images/crab.gif")
}

function startGame(mode) {

    player = sprites.playerSprite()
    sprites.keys = keys

    titleScreen.active = false;
    game = new Game();

    game.font = font_coolvetica;
    game.player = player;
    game.mode = mode;
    game.active = true;
    inGame = game.inGame
    game.sprites = sprites

    game.startGameFromTutorial = function(){
        localStorage.setItem("tutorial_done", true)
        startGame("game")
    }


}

function draw() {
    // show title background
    let currentScore = round(game.score * 10) || 0
    
    titleBg.moving = true
    if (currentScore < 300) {
        titleBg.bg = bg1
    } else if (currentScore > 300 && currentScore < 500) {
        titleBg.bg = bg2
    } else if (currentScore > 500 && currentScore < 700) {
        titleBg.bg = bg3
    } else if (currentScore > 700 && currentScore < 1000) {
        titleBg.bg = bg4
    } else if (currentScore > 1000){
        titleBg.bg = crabGif
        titleBg.moving = false
    }
    titleBg.show();

    // code after this (background must be first)
    // render a modal
    if (currentModal.active) {
        titleScreen.active = false
        currentModal.show();
    }
    // show title screen
    if (titleScreen.active) {
        titleScreen.show();
    }
    if (game.active) {
        game.show();
    } else {
        titleScreen.active = true
    }

    drawSprites();

    titleScreen.onPlay = function() {
        tutorialDone = localStorage.getItem("tutorial_done")

        if (!tutorialDone) {
            currentModal = new Modal()
            currentModal.text = "You must complete the tutorial first.";
            currentModal.font = font_coolvetica;

            currentModal.closeModal = function() {
                titleScreen.active = true;
                currentModal.hide();
            }

            currentModal.active = true;
            // have completed the tutorial 
            // start playing game
            titleScreen.hide();
        } else if (inGame) {
            startGame("game");
        }

    }
    titleScreen.onTutorial = function() {
        // start the tutorial
        titleScreen.hide();
        startGame("tutorial")
    }
}
