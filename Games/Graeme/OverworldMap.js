class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperSrc = config.upperSrc;
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
        Object.values(this.gameObjects).forEach(object => {
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
                x: utils.withGrid(2),
                y: utils.withGrid(2),
            }),
            doggo: new GameObject({
                x: utils.withGrid(6),
                y: utils.withGrid(1),
                src: "/images/characters/animal/doggo.png"
            })
        },
        walls: {
            [utils.asGridCoord(1, 3)] : true,
            [utils.asGridCoord(2, 3)] : true,
            [utils.asGridCoord(3, 3)] : true,
            [utils.asGridCoord(4, 3)] : true,
            [utils.asGridCoord(5, 3)] : true,
            [utils.asGridCoord(6, 3)] : true,
            [utils.asGridCoord(7, 3)] : true,
            [utils.asGridCoord(8, 3)] : true,
            [utils.asGridCoord(9, 3)] : true,
        }
    },
    Test: {

    }
}