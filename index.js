var now = new Date();
var datetime = now.toLocaleString();

document.getElementById("datetime").innerHTML = datetime;

let nextButton = document.querySelector('.arrow-next')
nextButton.onclick = () => {
    let container = document.querySelector('.nav-container');
    sideScroll(container, 'right', 15, 250, 30);
}

let backButton = document.querySelector('.arrow-back')
backButton.onclick = () => {
    let container = document.querySelector('.nav-container');
    sideScroll(container, 'left', 15, 250, 30);
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

