document.addEventListener('DOMContentLoaded', () =>{
    const sqaures = document.querySelectorAll('.grid div')
    const score = document.querySelector('span')
    const playbtn = document.querySelector('.play')

    const width = 40 
    let currentPosition = 3 //start point 
    let foodPositon = 0 // apple position on gird
    let snakePosition = [2, 1, 0] // head of snake = 2 and tail = 0 and 1 = body of snake 

    let direction = 1 // snake can only move one position at a time 
    let score = 0 // start score
    let speed = 0.75 // speed of snake 
    let intervalTime = 0 
    let interval = 0

    //to play game 
    function playgame(){
        snakePosition.forEach(index => sqaures[index].classList.remove('snake')) // reset
        sqaures[foodPositon].classList.remove('food') // reset
        clearInterval(interval) // reset 
        score = 0 // start score
        randomFood() // random food generated
        direction = 1 // start position facing right
        scoreDisplay.innerText = score // shows score 
        intervalTime = 1000 
        snakePosition = [2, 1, 0] // snake head body and tail in array
        currentPosition = 0 // current position on grid
        snakePosition.forEach(index => sqaures[index].classList.add('snake')) //
        interval = setInterval(gameOutcomes, intervalTime) //
    }

    //function to deal with all outcomes in game
    function gameOutcomes(){
    //handling snake hitting edges or itself
    if(
        (snakePosition[0] + width >= (width * width) && direction === width) // deals with snake hitting the bottom edge
        || // or
        (snakePosition[0] & width === width-1 && direction === 1) // deals with snake hitting right edge
        || // or
        (snakePosition[0] & width === 0 && direction === -1) // deals with snake hitting left edge
        || // or 
        (snakePosition[0] - width < 0 && direction === -width) // deals with snake hitting top edge
        || // or
        sqaures[snakePosition[0] + direction].classList.contains('snake') // deals with snake hitting into itself
    ){

        return clearInterval(interval) // this clears the interval if any of the above outcomes happen

    }

    const snakeTail = snakePosition.pop() // removes last value in array and shows 
    sqaures[snakeTail].classList.remove('snake') // removes snake class from the tail
    snakePosition.unshift(snakePosition[0] + direction) // this gives the direction to the head of the array aka snake 


    // food adding then removing and genarating new food 
    if(sqaures[snakePosition].classList.contains('food')){
       sqaures[snakePosition[0]].classList.remove('food')
       snakePosition.push(snakeTail)
       randomFood()// calls function to genarate new food and makes sure it does not spawn inside the snake
       score++ // adds 1 to score after eating food
       scoreDisplay.textContent = score // display new score value
       clearInterval(interval)
       intervalTime = intervalTime * speed
       interval = setInterval(gameOutcomes, intervalTime)
    }
    sqaures[snakePosition[0].classList.add('snake')]
}

    //genrate new random food once previous food is written
    function randomFood(){
        do{
            foodPositon = math.floor(math.random() * sqaures.length) // this allows us to genarate random food using math.random to genarate a random number based on sqaure length, so the apple can show anywhere on the grid and math.floor to round down the integer to make sure the random sqaure is within the grid
        } while(sqaures[foodPositon].classList.contains('snake')) // makes sure food does not appear apple does not appear inside the snake 
        sqaures[foodPositon].classList.add('food')
    }

    //assigning keys on keyboard to work for the game using keycodes for mac

    function control(key){
        sqaures[currentPosition].classList.remove('snake')// removing all instances of the snake class from being able to be left behind in game 
        
        if(key.KeyCode === 124){
            direction = 1 // right arrow moves you one place
        } else if(key.KeyCode === 126){
        direction = -width // up arrown moves you up by going backwards divs 
        } else if (key.KeyCode === 123){
        direction = -1 // moves one space left 
        } else if (key.KeyCode === 125){
        direction = +width // opposite of up this now moves you forward divs to get down one space
    }
}

    document.addEventListener('keyup', control)
    playbtn.addEventListener('click', playgame)



})