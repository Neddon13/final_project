class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.cutsceneSpaces = config.cutsceneSpaces || {};

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

    async startCutscene(events) {

        this.isCutscenePlaying = true;

        // Start a loop of async events
        for (let i=0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        //Reset NPC idle behaviour
        Object.values(this.gameObjects).forEach(object => object.doBehaviourEvent(this))
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x}, ${object.y}` === `${nextCoords.x}, ${nextCoords.y}`
        })

        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForPositionalCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[ `${hero.x},${hero.y}`];
        if (!this.isCutscenePlaying && match) {
            this.startCutscene( match[0].events );
        }
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
        upperSrc: "/images/maptileset/samplemap/samplemap.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(8),
                y: utils.withGrid(15),
            }),
            doggo: new Person({
                x: utils.withGrid(9),
                y: utils.withGrid(15),
                src: "/images/characters/animal/doggo.png",
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Dog: *loving woof*!", faceHero: "doggo"},
                            {type: "textMessage", text: "You pet the dog. It wags its tail"}
                        ]
                    }
                ]
            }),
            farmer_girl: new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(7),
                src: "/images/characters/female/farmer_girl.png",
                behaviourLoop: [
                    {type: "stand", direction: "left", time: 1600},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "up"},
                    {type: "stand", direction: "left", time: 3200},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "up"},
                    {type: "walk", direction: "up"},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Farmer: I'm busy...", faceHero: "farmer_girl"},
                            {type: "textMessage", text: "Farmer: Go away please"}
                        ]
                    }
                ]
            }),
            guard: new Person({
                x:utils.withGrid(7),
                y:utils.withGrid(19),
                src: "/images/characters/soldier/guard.png",
                behaviourLoop: [
                    {type: "stand", direction: "down", time: 1000},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Guard: Sorry, the bridge isn't safe at the moment", faceHero: "guard"},
                            {type: "textMessage", text: "Guard: Seriously, you'd die"},
                            {type: "textMessage", text: "Guard: Maybe if the dev finished the rest of the game, you'd be able to pass."},
                            {who: "hero", type: "stand", direction: "up", time: 10}
                        ]
                    }
                ]
            }),
            grieving_son: new Person({
                x:utils.withGrid(23),
                y:utils.withGrid(4),
                src: "/images/characters/male/grieving_son.png",
                behaviourLoop: [
                    {type: "stand", direction: "right", time: 1000},
                ],
                talking: [
                    {
                        events: [
                            {type: "textMessage", text: "Sad boy: quiet sobbing.."},
                        ]
                    }
                ]
            })
        },
        walls: {

            // Row -1
            [utils.asGridCoord(0, -1)] : true,
            [utils.asGridCoord(1, -1)] : true,
            [utils.asGridCoord(2, -1)] : true,
            [utils.asGridCoord(3, -1)] : true,
            [utils.asGridCoord(4, -1)] : true,
            [utils.asGridCoord(5, -1)] : true,
            [utils.asGridCoord(6, -1)] : true,
            [utils.asGridCoord(7, -1)] : true,
            [utils.asGridCoord(8, -1)] : true,
            [utils.asGridCoord(9, -1)] : true,
            [utils.asGridCoord(10, -1)] : true,
            [utils.asGridCoord(11, -1)] : true,
            [utils.asGridCoord(12, -1)] : true,
            [utils.asGridCoord(13, -1)] : true,
            [utils.asGridCoord(14, -1)] : true,
            [utils.asGridCoord(15, -1)] : true,
            [utils.asGridCoord(16, -1)] : true,
            [utils.asGridCoord(17, -1)] : true,
            [utils.asGridCoord(18, -1)] : true,
            [utils.asGridCoord(19, -1)] : true,
            [utils.asGridCoord(20, -1)] : true,
            [utils.asGridCoord(21, -1)] : true,
            [utils.asGridCoord(22, -1)] : true,
            [utils.asGridCoord(23, -1)] : true,
            [utils.asGridCoord(24, -1)] : true,
            [utils.asGridCoord(25, -1)] : true,
            [utils.asGridCoord(26, -1)] : true,
            [utils.asGridCoord(27, -1)] : true,
            [utils.asGridCoord(28, -1)] : true,
            [utils.asGridCoord(29, -1)] : true,
            [utils.asGridCoord(30, -1)] : true,
            [utils.asGridCoord(31, -1)] : true,
            [utils.asGridCoord(32, -1)] : true,
            [utils.asGridCoord(33, -1)] : true,
            [utils.asGridCoord(34, -1)] : true,
            [utils.asGridCoord(35, -1)] : true,
            [utils.asGridCoord(36, -1)] : true,
            [utils.asGridCoord(37, -1)] : true,
            [utils.asGridCoord(38, -1)] : true,
            [utils.asGridCoord(39, -1)] : true,
            [utils.asGridCoord(40, -1)] : true,
            [utils.asGridCoord(41, -1)] : true,
            [utils.asGridCoord(42, -1)] : true,
            [utils.asGridCoord(43, -1)] : true,
            [utils.asGridCoord(44, -1)] : true,
            [utils.asGridCoord(45, -1)] : true,
            [utils.asGridCoord(46, -1)] : true,
            [utils.asGridCoord(47, -1)] : true,
            [utils.asGridCoord(48, -1)] : true,
            [utils.asGridCoord(49, -1)] : true,
            [utils.asGridCoord(50, -1)] : true,
            [utils.asGridCoord(51, -1)] : true,
            [utils.asGridCoord(52, -1)] : true,
            [utils.asGridCoord(53, -1)] : true,
            [utils.asGridCoord(54, -1)] : true,
            [utils.asGridCoord(55, -1)] : true,
            [utils.asGridCoord(56, -1)] : true,
            [utils.asGridCoord(57, -1)] : true,
            [utils.asGridCoord(58, -1)] : true,
            [utils.asGridCoord(59, -1)] : true,

            // Row 0
            [utils.asGridCoord(-1, 0)] : true,
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
            [utils.asGridCoord(-1, 1)] : true,
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
            [utils.asGridCoord(-1, 2)] : true,
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
            [utils.asGridCoord(-1, 3)] : true,
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
            [utils.asGridCoord(-1, 4)] : true,
            [utils.asGridCoord(14, 4)] : true,
            [utils.asGridCoord(18, 4)] : true,
            [utils.asGridCoord(19, 4)] : true,
            [utils.asGridCoord(24, 4)] : true,
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
            [utils.asGridCoord(-1, 5)] : true,
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
            [utils.asGridCoord(-1, 6)] : true,
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
            [utils.asGridCoord(-1, 7)] : true,
            [utils.asGridCoord(6, 7)] : true,
            [utils.asGridCoord(8, 7)] : true,
            [utils.asGridCoord(16, 7)] : true,
            [utils.asGridCoord(21, 7)] : true,
            [utils.asGridCoord(22, 7)] : true,
            [utils.asGridCoord(24, 7)] : true,
            [utils.asGridCoord(27, 7)] : true,
            [utils.asGridCoord(36, 7)] : true,
            [utils.asGridCoord(37, 7)] : true,
            [utils.asGridCoord(43, 7)] : true,
            [utils.asGridCoord(49, 7)] : true,
            [utils.asGridCoord(53, 7)] : true,
            [utils.asGridCoord(55, 7)] : true,

            // Row 8
            [utils.asGridCoord(-1, 8)] : true,
            [utils.asGridCoord(6, 8)] : true,
            [utils.asGridCoord(8, 8)] : true,
            [utils.asGridCoord(13, 8)] : true,
            [utils.asGridCoord(15, 8)] : true,
            [utils.asGridCoord(20, 8)] : true,
            [utils.asGridCoord(21, 8)] : true,
            [utils.asGridCoord(24, 8)] : true,
            [utils.asGridCoord(26, 8)] : true,
            [utils.asGridCoord(34, 8)] : true,
            [utils.asGridCoord(36, 8)] : true,
            [utils.asGridCoord(38, 8)] : true,
            [utils.asGridCoord(42, 8)] : true,
            [utils.asGridCoord(43, 8)] : true,
            [utils.asGridCoord(48, 8)] : true,
            [utils.asGridCoord(53, 8)] : true,
            [utils.asGridCoord(56, 8)] : true,

            // Row 9
            [utils.asGridCoord(-1, 9)] : true,
            [utils.asGridCoord(1, 9)] : true,
            [utils.asGridCoord(4, 9)] : true,
            [utils.asGridCoord(5, 9)] : true,
            [utils.asGridCoord(6, 9)] : true,
            [utils.asGridCoord(8, 9)] : true,
            [utils.asGridCoord(10, 9)] : true,
            [utils.asGridCoord(11, 9)] : true,
            [utils.asGridCoord(12, 9)] : true,
            [utils.asGridCoord(14, 9)] : true,
            [utils.asGridCoord(15, 9)] : true,
            [utils.asGridCoord(16, 9)] : true,
            [utils.asGridCoord(20, 9)] : true,
            [utils.asGridCoord(21, 9)] : true,
            [utils.asGridCoord(23, 9)] : true,
            [utils.asGridCoord(26, 9)] : true,
            [utils.asGridCoord(30, 9)] : true,
            [utils.asGridCoord(36, 9)] : true,
            [utils.asGridCoord(39, 9)] : true,
            [utils.asGridCoord(40, 9)] : true,
            [utils.asGridCoord(43, 9)] : true,
            [utils.asGridCoord(49, 9)] : true,
            [utils.asGridCoord(52, 9)] : true,
            [utils.asGridCoord(53, 9)] : true,
            [utils.asGridCoord(57, 9)] : true,
            [utils.asGridCoord(59, 9)] : true,

            // Row 10
            [utils.asGridCoord(-1, 10)] : true,
            [utils.asGridCoord(0, 10)] : true,
            [utils.asGridCoord(2, 10)] : true,
            [utils.asGridCoord(3, 10)] : true,
            [utils.asGridCoord(8, 10)] : true,
            [utils.asGridCoord(9, 10)] : true,
            [utils.asGridCoord(23, 10)] : true,
            [utils.asGridCoord(26, 10)] : true,
            [utils.asGridCoord(36, 10)] : true,
            [utils.asGridCoord(40, 10)] : true,
            [utils.asGridCoord(43, 10)] : true,
            [utils.asGridCoord(45, 10)] : true,
            [utils.asGridCoord(46, 10)] : true,
            [utils.asGridCoord(47, 10)] : true,
            [utils.asGridCoord(48, 10)] : true,
            [utils.asGridCoord(53, 10)] : true,
            [utils.asGridCoord(54, 10)] : true,
            [utils.asGridCoord(55, 10)] : true,
            [utils.asGridCoord(57, 10)] : true,
            [utils.asGridCoord(59, 10)] : true,

            // Row 11
            [utils.asGridCoord(-1, 11)] : true,
            [utils.asGridCoord(5, 11)] : true,
            [utils.asGridCoord(6, 11)] : true,
            [utils.asGridCoord(14, 11)] : true,
            [utils.asGridCoord(15, 11)] : true,
            [utils.asGridCoord(23, 11)] : true,
            [utils.asGridCoord(25, 11)] : true,
            [utils.asGridCoord(26, 11)] : true,
            [utils.asGridCoord(32, 11)] : true,
            [utils.asGridCoord(33, 11)] : true,
            [utils.asGridCoord(34, 11)] : true,
            [utils.asGridCoord(35, 11)] : true,
            [utils.asGridCoord(39, 11)] : true,
            [utils.asGridCoord(43, 11)] : true,
            [utils.asGridCoord(44, 11)] : true,
            [utils.asGridCoord(56, 11)] : true,
            [utils.asGridCoord(57, 11)] : true,
            [utils.asGridCoord(59, 11)] : true,

            // Row 12
            [utils.asGridCoord(-1, 12)] : true,
            [utils.asGridCoord(19, 12)] : true,
            [utils.asGridCoord(20, 12)] : true,
            [utils.asGridCoord(22, 12)] : true,
            [utils.asGridCoord(24, 12)] : true,
            [utils.asGridCoord(30, 12)] : true,
            [utils.asGridCoord(31, 12)] : true,
            [utils.asGridCoord(39, 12)] : true,
            [utils.asGridCoord(49, 12)] : true,

            // Row 13
            [utils.asGridCoord(-1, 13)] : true,
            [utils.asGridCoord(0, 13)] : true,
            [utils.asGridCoord(2, 13)] : true,
            [utils.asGridCoord(3, 13)] : true,
            [utils.asGridCoord(13, 13)] : true,
            [utils.asGridCoord(16, 13)] : true,
            [utils.asGridCoord(17, 13)] : true,
            [utils.asGridCoord(18, 13)] : true,
            [utils.asGridCoord(19, 13)] : true,
            [utils.asGridCoord(21, 13)] : true,
            [utils.asGridCoord(24, 13)] : true,
            [utils.asGridCoord(31, 13)] : true,
            [utils.asGridCoord(32, 13)] : true,
            [utils.asGridCoord(39, 13)] : true,
            [utils.asGridCoord(44, 13)] : true,
            [utils.asGridCoord(45, 13)] : true,
            [utils.asGridCoord(46, 13)] : true,
            [utils.asGridCoord(47, 13)] : true,
            [utils.asGridCoord(49, 13)] : true,
            [utils.asGridCoord(50, 13)] : true,
            [utils.asGridCoord(52, 13)] : true,
            [utils.asGridCoord(53, 13)] : true,

            // Row 14
            [utils.asGridCoord(-1, 14)] : true,
            [utils.asGridCoord(1, 14)] : true,
            [utils.asGridCoord(4, 14)] : true,
            [utils.asGridCoord(15, 14)] : true,
            [utils.asGridCoord(16, 14)] : true,
            [utils.asGridCoord(17, 14)] : true,
            [utils.asGridCoord(18, 14)] : true,
            [utils.asGridCoord(21, 14)] : true,
            [utils.asGridCoord(24, 14)] : true,
            [utils.asGridCoord(30, 14)] : true,
            [utils.asGridCoord(33, 14)] : true,
            [utils.asGridCoord(40, 14)] : true,
            [utils.asGridCoord(44, 14)] : true,
            [utils.asGridCoord(48, 14)] : true,
            [utils.asGridCoord(50, 14)] : true,
            [utils.asGridCoord(52, 14)] : true,
            [utils.asGridCoord(54, 14)] : true,
            [utils.asGridCoord(55, 14)] : true,
            [utils.asGridCoord(56, 14)] : true,

            //Row 15
            [utils.asGridCoord(-1, 15)] : true,
            [utils.asGridCoord(5, 15)] : true,
            [utils.asGridCoord(20, 15)] : true,
            [utils.asGridCoord(23, 15)] : true,
            [utils.asGridCoord(28, 15)] : true,
            [utils.asGridCoord(29, 15)] : true,
            [utils.asGridCoord(32, 15)] : true,
            [utils.asGridCoord(41, 15)] : true,
            [utils.asGridCoord(43, 15)] : true,
            [utils.asGridCoord(44, 15)] : true,
            [utils.asGridCoord(45, 15)] : true,
            [utils.asGridCoord(49, 15)] : true,
            [utils.asGridCoord(50, 15)] : true,
            [utils.asGridCoord(52, 15)] : true,
            [utils.asGridCoord(53, 15)] : true,
            [utils.asGridCoord(54, 15)] : true,
            [utils.asGridCoord(58, 15)] : true,
            [utils.asGridCoord(59, 15)] : true,

            //Row 16
            [utils.asGridCoord(-1, 16)] : true,
            [utils.asGridCoord(4, 16)] : true,
            [utils.asGridCoord(11, 16)] : true,
            [utils.asGridCoord(12, 16)] : true,
            [utils.asGridCoord(19, 16)] : true,
            [utils.asGridCoord(23, 16)] : true,
            [utils.asGridCoord(31, 16)] : true,
            [utils.asGridCoord(41, 16)] : true,
            [utils.asGridCoord(43, 16)] : true,
            [utils.asGridCoord(46, 16)] : true,
            [utils.asGridCoord(48, 16)] : true,
            [utils.asGridCoord(54, 16)] : true,
            [utils.asGridCoord(55, 16)] : true,
            [utils.asGridCoord(56, 16)] : true,
            [utils.asGridCoord(57, 16)] : true,
            [utils.asGridCoord(58, 16)] : true,

            //Row 17
            [utils.asGridCoord(-1, 17)] : true,
            [utils.asGridCoord(3, 17)] : true,
            [utils.asGridCoord(10, 17)] : true,
            [utils.asGridCoord(11, 17)] : true,
            [utils.asGridCoord(18, 17)] : true,
            [utils.asGridCoord(22, 17)] : true,
            [utils.asGridCoord(29, 17)] : true,
            [utils.asGridCoord(30, 17)] : true,
            [utils.asGridCoord(41, 17)] : true,
            [utils.asGridCoord(43, 17)] : true,
            [utils.asGridCoord(47, 17)] : true,
            [utils.asGridCoord(49, 17)] : true,
            [utils.asGridCoord(53, 17)] : true,

            //Row 18
            [utils.asGridCoord(-1, 18)] : true,
            [utils.asGridCoord(4, 18)] : true,
            [utils.asGridCoord(5, 18)] : true,
            [utils.asGridCoord(16, 18)] : true,
            [utils.asGridCoord(17, 18)] : true,
            [utils.asGridCoord(22, 18)] : true,
            [utils.asGridCoord(26, 18)] : true,
            [utils.asGridCoord(28, 18)] : true,
            [utils.asGridCoord(40, 18)] : true,
            [utils.asGridCoord(44, 18)] : true,
            [utils.asGridCoord(48, 18)] : true,
            [utils.asGridCoord(49, 18)] : true,
            [utils.asGridCoord(50, 18)] : true,
            [utils.asGridCoord(52, 18)] : true,

            //Row 19
            [utils.asGridCoord(-1, 19)] : true,
            [utils.asGridCoord(4, 19)] : true,
            [utils.asGridCoord(6, 19)] : true,
            [utils.asGridCoord(8, 19)] : true,
            [utils.asGridCoord(13, 19)] : true,
            [utils.asGridCoord(14, 19)] : true,
            [utils.asGridCoord(15, 19)] : true,
            [utils.asGridCoord(21, 19)] : true,
            [utils.asGridCoord(28, 19)] : true,
            [utils.asGridCoord(40, 19)] : true,
            [utils.asGridCoord(53, 19)] : true,

            //Row 20
            [utils.asGridCoord(-1, 20)] : true,
            [utils.asGridCoord(5, 20)] : true,
            [utils.asGridCoord(6, 20)] : true,
            [utils.asGridCoord(8, 20)] : true,
            [utils.asGridCoord(9, 20)] : true,
            [utils.asGridCoord(10, 20)] : true,
            [utils.asGridCoord(11, 20)] : true,
            [utils.asGridCoord(12, 20)] : true,
            [utils.asGridCoord(21, 20)] : true,
            [utils.asGridCoord(25, 20)] : true,
            [utils.asGridCoord(26, 20)] : true,
            [utils.asGridCoord(28, 20)] : true,
            [utils.asGridCoord(40, 20)] : true,
            [utils.asGridCoord(46, 20)] : true,
            [utils.asGridCoord(47, 20)] : true,
            [utils.asGridCoord(54, 20)] : true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(24, 5)]: [
                {
                    events: [
                        {who: "hero", type: "stand", direction: "up", time: 1600},
                        {type: "textMessage", text: "This is someone's grave. It says 'Taken too soon'.."},
                        {who: "grieving_son", type: "walk", direction: "down"},
                        {who: "grieving_son", type: "stand", direction: "right", time: 10},
                        {who: "hero", type: "stand", direction: "left", time: 10},
                        {type: "textMessage", text: "Sad boy: This is my father's grave.."},
                        {type: "textMessage", text: "Sad boy: He was murdered on my 10th birthday.."},
                        {type: "textMessage", text: "Sad boy: I've been training for years.."},
                        {type: "textMessage", text: "Sad boy: One day, I will have my revenge!!!"},
                        {who: "grieving_son", type: "walk", direction: "up"},
                        {who: "grieving_son", type: "stand", direction: "right", time: 10},
                    ]
                }
            ],
            [utils.asGridCoord(13, 9)]: [
                {
                    events: [
                        {type: "changeMap", map: "Farmhouse"}
                    ]
                }
            ]
        }
    },
    Farmhouse: {
        lowerSrc: "/images/maptileset/samplemap/samplemap2.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(1),
                y: utils.withGrid(1),
            }),
        },
        walls: {},
        cutsceneSpaces: {}
    }
}