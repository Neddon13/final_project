const pipes = document.getElementById("pipes")
const gap = document.getElementById("gap")
const bird = document.getElementById("bird")

gap.addEventListener('animationiteration', () => {
    const random = -((Math.random()*350)+250);
    gap.style.top = random + "px"
});