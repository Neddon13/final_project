class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        }
        image.src = "/images/maptileset/samplemap/samplemap2.png"

        const hero = new GameObject({
            x: 2,
            y: 3,
        });

        const doggo = new GameObject({
            x: 6,
            y: 1,
            src: "/images/characters/animal/doggo.png"
        });

        setTimeout(() => {
            hero.sprite.draw(this.ctx);
            doggo.sprite.draw(this.ctx);
        }, 200)
        

    }
}