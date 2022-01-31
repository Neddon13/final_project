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
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(3),
            }),
            // doggo: new GameObject({
            //     x: utils.withGrid(6),
            //     y: utils.withGrid(1),
            //     src: "/images/characters/animal/doggo.png"
            // })
        }
    },
    Test: {

    }
}