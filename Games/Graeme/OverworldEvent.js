class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehaviour({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        // This is a handler that completes when the correct Person is finished walking. It resolves the event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who){
                document.removeEventListener("PersonStandingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonStandingComplete", completeHandler);
    }

    walk (resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehaviour({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        // This is a handler that completes when the correct Person is finished walking. It resolves the event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who){
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonWalkingComplete", completeHandler);
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}