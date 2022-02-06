const utils = {
    withGrid(n) {
        return n * 32;
    },

    asGridCoord(x, y) {
        return `${x*32},${y*32}`
    },

    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 32;
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        }
        return {x,y};
    },

    emitEvent(name, detail) {
        const event = new CustomEvent(name, detail);
        document.dispatchEvent(event);
    },

    oppositeDirection(direction) {
        if (direction === "left") {
            return "right"
        } else if (direction === "right") {
            return "left"
        } else if (direction === "down") {
            return "up"
        } else {
            return "down"
        }
    },

    wait(ms) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, ms)
        })
      },

}