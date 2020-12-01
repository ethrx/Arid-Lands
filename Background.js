// scrolling background
class Background {
    constructor() {
        this.bgSpeed = 1;
        this.bgx1 = 0;
        this.bgx2 = width;
    }
    show() {
        // background
        if (this.moving) {
            image(this.bg, this.bgx1, 0, width, height);
            image(this.bg, this.bgx2, 0, width, height);

            this.bgx1 -= this.bgSpeed;
            this.bgx2 -= this.bgSpeed;

            if (this.bgx1 < (0 - width)) {
                this.bgx1 = width;
            }
            if (this.bgx2 < (0 - width)) {
                this.bgx2 = width;
            }
        } else {
            image(this.bg, 0, 0, width, height)
        }
    }
}