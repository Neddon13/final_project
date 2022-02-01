document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game')
    const ground = document.querySelector('.ground')
    const obstacle = document.querySelector('.obstacle')

    let birdLeft = 278
    let birdBottom = 150
    let gravity = 3


    function startGame(){
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let timerId = setInterval(startGame, 20)


    function control(e){
        if (e.keyCode === 32){
            jump()
        }
    }

    function jump() {
        if (birdBottom < 430 ) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('keydown', control)


    function generateObstacle(){
        let obstacleLeft = 600
        let randomHeight = Math.random() * 70
        let obstacleBottom = randomHeight
        obstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'

        function moveObstacle(){
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
        }
        let timerId = setInterval(moveObstacle, 20)
    }
    generateObstacle()

})