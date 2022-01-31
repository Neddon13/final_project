class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        const image = new Image();
        const x = 0;
        const y = 0;
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0, 300, 300, x, y, 300, 300)
        }
        image.src = "/images/maptileset/samplemap/samplemap.png"
    }
}