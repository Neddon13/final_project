class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperSrc = config.upperSrc;

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, 
        utils.withGrid(10.5) - cameraPerson.x,
        utils.withGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            object.mount(this)
        })
    }

    addWall(x, y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x, y) {
        delete this.walls[`${x},${y}`];
    }

    moveWall(currentX, currentY, direction) {
        this.removeWall(currentX, currentY);
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        this.addWall(x, y);
    }
}

window.OverworldMaps = {
    Demo: {
        lowerSrc: "/images/maptileset/samplemap/samplemap.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(11),
                y: utils.withGrid(12),
            }),
            doggo: new GameObject({
                x: utils.withGrid(12),
                y: utils.withGrid(12),
                src: "/images/characters/animal/doggo.png"
            }),
            npc1: new Person({
                x:utils.withGrid(8),
                y:utils.withGrid(14),
                src: "/images/characters/enemy/ninja.png",
                behaviourLoop: [
                    {type: "walk", direction: "left"},
                    {type: "stand", direction: "up", time: 800},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "down"}
                ]
            })
        },
        walls: {
                // Row 0
            [utils.asGridCoord(19, 0)] : true,
            [utils.asGridCoord(26, 0)] : true,
            [utils.asGridCoord(29, 0)] : true,
            [utils.asGridCoord(31, 0)] : true,
            [utils.asGridCoord(36, 0)] : true,
            [utils.asGridCoord(38, 0)] : true,
            [utils.asGridCoord(39, 0)] : true,
            [utils.asGridCoord(53, 0)] : true,
            [utils.asGridCoord(56, 0)] : true,

                // Row 1
            [utils.asGridCoord(20, 1)] : true,
            [utils.asGridCoord(21, 1)] : true,
            [utils.asGridCoord(26, 1)] : true,
            [utils.asGridCoord(31, 1)] : true,
            [utils.asGridCoord(29, 1)] : true,
            [utils.asGridCoord(35, 1)] : true,
            [utils.asGridCoord(39, 1)] : true,
            [utils.asGridCoord(48, 1)] : true,
            [utils.asGridCoord(54, 1)] : true,
            [utils.asGridCoord(55, 1)] : true,
            [utils.asGridCoord(56, 1)] : true,
            [utils.asGridCoord(58, 1)] : true,
            [utils.asGridCoord(59, 1)] : true,

                // Row 2
            [utils.asGridCoord(22, 2)] : true,
            [utils.asGridCoord(26, 2)] : true,
            [utils.asGridCoord(28, 2)] : true,
            [utils.asGridCoord(32, 2)] : true,
            [utils.asGridCoord(33, 2)] : true,
            [utils.asGridCoord(34, 2)] : true,
            [utils.asGridCoord(37, 2)] : true,
            [utils.asGridCoord(38, 2)] : true,
            [utils.asGridCoord(40, 2)] : true,
            [utils.asGridCoord(42, 2)] : true,
            [utils.asGridCoord(43, 2)] : true,
            [utils.asGridCoord(48, 2)] : true,
            [utils.asGridCoord(50, 2)] : true,
            [utils.asGridCoord(56, 2)] : true,
            [utils.asGridCoord(58, 2)] : true,

                // Row 3
            [utils.asGridCoord(15, 3)] : true,
            [utils.asGridCoord(16, 3)] : true,
            [utils.asGridCoord(17, 3)] : true,
            [utils.asGridCoord(20, 3)] : true,
            [utils.asGridCoord(21, 3)] : true,
            [utils.asGridCoord(22, 3)] : true,
            [utils.asGridCoord(25, 3)] : true,
            [utils.asGridCoord(28, 3)] : true,
            [utils.asGridCoord(31, 3)] : true,
            [utils.asGridCoord(34, 3)] : true,
            [utils.asGridCoord(35, 3)] : true,
            [utils.asGridCoord(38, 3)] : true,
            [utils.asGridCoord(39, 3)] : true,
            [utils.asGridCoord(41, 3)] : true,
            [utils.asGridCoord(43, 3)] : true,
            [utils.asGridCoord(44, 3)] : true,
            [utils.asGridCoord(46, 3)] : true,
            [utils.asGridCoord(47, 3)] : true,
            [utils.asGridCoord(51, 3)] : true,
            [utils.asGridCoord(52, 3)] : true,
            [utils.asGridCoord(58, 3)] : true,
            [utils.asGridCoord(59, 3)] : true,

                // Row 4
            [utils.asGridCoord(14, 4)] : true,
            [utils.asGridCoord(18, 4)] : true,
            [utils.asGridCoord(19, 4)] : true,
            [utils.asGridCoord(25, 4)] : true,
            [utils.asGridCoord(28, 4)] : true,
            [utils.asGridCoord(33, 4)] : true,
            [utils.asGridCoord(35, 4)] : true,
            [utils.asGridCoord(37, 4)] : true,
            [utils.asGridCoord(38, 4)] : true,
            [utils.asGridCoord(40, 4)] : true,
            [utils.asGridCoord(44, 4)] : true,
            [utils.asGridCoord(48, 4)] : true,
            [utils.asGridCoord(51, 4)] : true,
            [utils.asGridCoord(53, 4)] : true,

                // Row 5
            [utils.asGridCoord(14, 5)] : true,
            [utils.asGridCoord(25, 5)] : true,
            [utils.asGridCoord(28, 5)] : true,
            [utils.asGridCoord(32, 5)] : true,
            [utils.asGridCoord(35, 5)] : true,
            [utils.asGridCoord(40, 5)] : true,
            [utils.asGridCoord(41, 5)] : true,
            [utils.asGridCoord(43, 5)] : true,
            [utils.asGridCoord(46, 5)] : true,
            [utils.asGridCoord(47, 5)] : true,
            [utils.asGridCoord(51, 5)] : true,
            [utils.asGridCoord(53, 5)] : true,
            [utils.asGridCoord(54, 5)] : true,
            [utils.asGridCoord(55, 5)] : true,
            [utils.asGridCoord(56, 5)] : true,

                // Row 6
            [utils.asGridCoord(7, 6)] : true,
            [utils.asGridCoord(15, 6)] : true,
            [utils.asGridCoord(16, 6)] : true,
            [utils.asGridCoord(20, 6)] : true,
            [utils.asGridCoord(21, 6)] : true,
            [utils.asGridCoord(24, 6)] : true,
            [utils.asGridCoord(27, 6)] : true,
            [utils.asGridCoord(33, 6)] : true,
            [utils.asGridCoord(34, 6)] : true,
            [utils.asGridCoord(35, 6)] : true,
            [utils.asGridCoord(42, 6)] : true,
            [utils.asGridCoord(44, 6)] : true,
            [utils.asGridCoord(45, 6)] : true,
            [utils.asGridCoord(50, 6)] : true,
            [utils.asGridCoord(51, 6)] : true,
            [utils.asGridCoord(53, 6)] : true,
            [utils.asGridCoord(56, 6)] : true,
            [utils.asGridCoord(57, 6)] : true,

                // Row 7
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
            [utils.asGridCoord(1, 7)] : true,
        }
    }
}