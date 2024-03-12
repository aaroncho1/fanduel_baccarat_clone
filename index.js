var now = new Date();
var datetime = now.toLocaleString();

document.getElementById("datetime").innerHTML = datetime;

let navContainer = document.querySelector('.nav-container');

let nextButton = document.querySelector('.arrow-next')
nextButton.onclick = () => {
    sideScroll(navContainer, 'right', 15, 500, 30);
}

let backButton = document.querySelector('.arrow-back')
backButton.onclick = () => {
    sideScroll(navContainer, 'left', 15, 500, 30);
}

function sideScroll(element, direction, speed, distance, step){
    scrollAmount = 0;
    let slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

function isElementAtMaximumRight(element) {
    return ((element.scrollWidth - element.clientWidth) >= (element.scrollLeft)) && ((element.scrollWidth - element.clientWidth) <= (element.scrollLeft + 1)) 
}


navContainer.addEventListener('scroll', () => {
    scrollPos = navContainer.scrollLeft;
    if (scrollPos > 0) {document.getElementById('arrow-back-svg').style.display = 'block';
        document.querySelector('.nav-container').style.webkitMaskImage = 'linear-gradient(270deg, #000 80%, transparent 97%)'
    } else {
        document.getElementById('arrow-back-svg').style.display = 'none';
        document.querySelector('.nav-container').style.webkitMaskImage = 'linear-gradient(90deg, #000 80%, transparent 97%)'
    }
    if (isElementAtMaximumRight(navContainer)){
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'flex';
    }
})

document.addEventListener("DOMContentLoaded", (event) => {
    let playerCardImages = document.querySelector('.player-cards').children
    let bankerCardImages = document.querySelector('.banker-cards').children
    if (playerCardImages.length > 2) {
        for (let playerCard of playerCardImages){
            playerCard.style.maxHeight = "150px";
            playerCard.style.maxWidth = "115px";
        }
    } else {
        for (let playerCard of playerCardImages) {
            playerCard.style.maxHeight = "auto"
        }
    }
    if (bankerCardImages.length > 2) {
        for (let bankerCard of bankerCardImages) {
            bankerCard.style.maxHeight = "150px";
            bankerCard.style.maxWidth = "115px";
        }
    } else {
        for (let bankerCard of bankerCardImages) {
            bankerCard.style.maxHeight = "auto"
        }
    }
})

