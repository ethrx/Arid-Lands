class TitleScreen {
    constructor() {
        this.playColor = color(0, 0, 0)
        this.tutorialColor = color(0, 0, 0)

        this.active = true;
    }

    buttonHandlers() {
        this.playColor = color(0, 0, 0)
        this.tutorialColor = color(0, 0, 0)

        // start button
        if (
            mouseX >= (this.cw / 2) - 70 &&
            mouseY >= (this.ch / 2) - 35 &&
            (mouseX <= (70 * 2) + (this.cw / 2 - 70)) &&
            (mouseY <= 35 + (this.ch / 2 - 25))
        ) {
            this.playColor = color("#4C4C4C")
            if (mouseIsPressed) {
                this.onPlay();
            }
        }

        // tutorial button
        if (
            mouseX >= ((this.cw / 2) - 85) &&
            mouseY >= ((this.ch / 2) + 30) &&
            (mouseX <= (85 * 2) + (this.cw / 2 - 85)) &&
            (mouseY <= 35 + (this.ch / 2 + 50))
        ) {
            // 
            this.tutorialColor = color("#4C4C4C")
            if(mouseIsPressed) {
                this.onTutorial()
            }
        }
 
    }
    show() {
        // title text
        textFont(this.titleFont);
        textSize(200)
        textAlign("center")
        text("Arid Lands", width / 2, height / 2 - 150)

        // button handlers
        this.buttonHandlers();


        // style settings
        textSize(30);
        textFont(this.buttonFont)
        fill(this.playColor);
        stroke(this.playColor);
        strokeWeight(1);

        // play button
        
        textAlign("center");
        text("PLAY", this.cw / 2, this.ch / 2);
        noFill();
        strokeWeight(3);
        rect(
                (this.cw / 2) - 70,
                (this.ch / 2) - 35,
                70 * 2,
                50, 10
            )
            // tutorial button
        fill(this.tutorialColor);
        stroke(this.tutorialColor);
        strokeWeight(1);
        textSize(30)
        textAlign("center")
        text("TUTORIAL", this.cw / 2, this.ch / 2 + 65)
        noFill()
        strokeWeight(3);
        rect(
            (this.cw / 2) - 85,
            (this.ch / 2) + 30,
            85 * 2,
            50, 10
        )
    }
    hide() {
        this.active = false;
    }
}