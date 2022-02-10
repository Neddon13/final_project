document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const playBtn = document.querySelector('.play') 

    //above assigning variables to the query selectors for the html file tags to be used for the game script 
  
    const width = 20 // width of grid in divs 
    let currentIndex = 0 // first div in grid
    let foodIndex = 0 //first div in grid
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0 // start score
    let speed = 0.95 // speed of movement
    let intervalTime = 0
    let interval = 0
  
  
    //to start, and restart the game
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake')) // resets game
      squares[foodIndex].classList.remove('food') // resest game
      clearInterval(interval) // resets game
      score = 0 // start score
      randomFood() // genertes food
      direction = 1
      scoreDisplay.innerText = score // display score
      intervalTime = 175 // time between movements of snakes head, body and tail
      currentSnake = [2,1,0] // array for snake , 2 = head , 1 = body and 0 = tail
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(gameOutcomes, intervalTime)
    }
  
  
    //function that deals with the games outcomes
    function gameOutcomes() {
      //deals with snake hitting edges/walls or snake hitting itself
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom stop game
        (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall stop game
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall stop game
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top wall stop game
        squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself stop game
      ) {
        return clearInterval(interval) // reset
      }
  
      const tail = currentSnake.pop() //removes last value of the array and shows it
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the snake
  
      //deals with snake eating food
      if(squares[currentSnake[0]].classList.contains('food')) {
        squares[currentSnake[0]].classList.remove('food')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomFood() // generates food
        score++ // adds 1 to score when consumed
        scoreDisplay.textContent = score // display updated score
        clearInterval(interval) // resets interval 
        intervalTime = intervalTime * speed // speed multiplier when eating food added
        interval = setInterval(gameOutcomes, intervalTime) // interval set 
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
  
    //generate new apple once apple is eaten
    function randomFood() {
      do{
         foodIndex = Math.floor(Math.random() * squares.length) // this allows us to genarate random food using math.random to genarate a random number based on sqaure length, so the apple can show anywhere on the grid and math.floor to round down the integer to make sure the random sqaure is within the grid
      } while(squares[foodIndex].classList.contains('snake')) //making sure food will not spawn inside the snake
      squares[foodIndex].classList.add('food')
    }
  
  
    //assign functions to keycodes
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 68) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 87) {
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode === 65) {
        direction = -1 // if we press left, the snake will go left one div
      } else if (e.keyCode === 83) {
        direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
      }
    }
  
    document.addEventListener('keyup', control) // when a key is pressed call control function to use the keys assigned to play the game
    playBtn.addEventListener('click', startGame) // when play button is clicked start game
  })