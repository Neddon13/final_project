class Progress {
    constructor() {
        this.mapId = "Outside";
        this.startingHeroX = 0;
        this.startingHeroY = 0;
        this.startingHeroDirection = "down";
        this.isFirstLoad = true;
        this.saveFileKey = "FinalProjectGame_SaveFile";
    }

    save() {
        window.localStorage.setItem(this.saveFileKey, JSON.stringify({
            mapId: this.mapId,
            startingHeroX: this.startingHeroX,
            startingHeroY: this.startingHeroY,
            startingHeroDirection: this.startingHeroDirection,
            isFirstLoad: this.isFirstLoad,
            playerState: {
                items: playerState.items,
                storyFlags: playerState.storyFlags
            }
        }))
    }

    getSave() {
        const file = window.localStorage.getItem(this.saveFileKey);
        return file ? JSON.parse(file) : null
    }

    load() {
        const file = this.getSave();
        if (file) {
            this.mapId = file.mapId;
            this.startingHeroX = file.startingHeroX;
            this.startingHeroY = file.startingHeroY;
            this.startingHeroDirection = file.startingHeroDirection;
            this.isFirstLoad = file.isFirstLoad;
            Object.keys(file.playerState).forEach(key => {
                playerState[key] = file.playerState[key];
            })
        }
    }
}