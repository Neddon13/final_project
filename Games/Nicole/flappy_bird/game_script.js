const pipes = document.getElementById("pipes");
const gap = document.getElementById("gap");
const bird = document.getElementById("bird");
const jumping = 0;

gap.addEventListener('animationiteration', () => {
    const random = -((Math.random()*300)+150);
    gap.style.top = random + "px"
});

setInterval(function(){
    const birdTop = 
    parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    if(jumping==0){
    bird.style.top = (birdTop+3)+"px";
    }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    const jumpInterval = setInterval(function(){
        const birdTop = 
        parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
        if((birdTop>6)&&(counter<15)){
        bird.style.top = (birdTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}