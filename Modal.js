class Modal {
	constructor() {
		this.active = true;
	}
	closeHandler() {
		if (mouseIsPressed) {

			if (mouseX < (width / 2 + 80) + 10 && mouseX > (width / 2 + 80) - 10) {
				if (mouseY < (height / 2 - 75) + 5.5 && mouseY > (height / 2 - 75) - 17.5) {
					this.closeModal();
				}
			}
		}
	}

	show() {
		this.closeHandler();

		// outline box
		rectMode(CORNER)
		noFill();
		strokeWeight(5)
		rect(width / 2 - 100, height / 2 - 100, 200, 200, 20);

		// x to close
		strokeWeight(4)
		fill(0, 0, 0)
		textFont(this.font)
		textAlign("center")
		textSize(24)
		text("x", width / 2 + 80, height / 2 - 75)

		// text
		rectMode(CENTER)
		strokeWeight(4)
		fill(0, 0, 0)
		textFont(this.font)
		textAlign("center")
		textSize(20)
		text(this.text,
			width / 2 + 5, // x1
			height / 2 + 70, // x2
			width / (this.text.length / 5), // width?
			height / 2 - 100); // height?

	}
	hide() {
		this.active = false;
	}
}