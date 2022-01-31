class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        
        // const image = new Image();
        // image.onload = () => {
        //     this.ctx.drawImage(image, 0, 0)
        // }
        // image.src = "/images/maptileset/samplemap/samplemap2.png"

        const x = 4;
        const y = 3;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,       // image to draw
                0,          // x co-ord of start of image on spritesheet
                0,          // y co-ord of start of image on spritesheet
                32,         // width of image to cut
                32,         // height of image to cut
                x * 32,     // x co-ord of top left of where sprite should be drawn
                y * 32 + 4,     // y co-ord of top left of where sprite should be drawn
                32,         // x co-ord of bottom right of where sprite should be drawn
                32          // y co-ord of bottom right of where sprite should be drawn
            )
        }
        shadow.src = "/images/characters/shadow.png"

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero,       // image to draw
                0,          // x co-ord of start of image on spritesheet
                0,          // y co-ord of start of image on spritesheet
                32,         // width of image to cut
                32,         // height of image to cut
                x * 32 - 1,     // x co-ord of top left of where sprite should be drawn
                y * 32 - 10,     // y co-ord of top left of where sprite should be drawn
                32,         // x co-ord of bottom right of where sprite should be drawn
                32          // y co-ord of bottom right of where sprite should be drawn
            )
        }
        hero.src = "/images/characters/male/hero.png"


    }
}