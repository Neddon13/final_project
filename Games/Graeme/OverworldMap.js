class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperSrc = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0)
    }
}

window.OverworldMaps = {
    Demo: {
        lowerSrc: "/images/maptileset/samplemap/samplemap2.png",
        gameObjects: {
            hero: new GameObject({
                x: 2,
                y: 3,
            }),
            doggo: new GameObject({
                x: 6,
                y: 1,
                src: "/images/characters/animal/doggo.png"
            })
        }
    },
    Test: {

    }
}