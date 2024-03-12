let wager = parseFloat(parseFloat((document.getElementById('total-wager')).textContent).toFixed(2))

let balance = parseFloat(parseFloat((document.getElementById('available-balance')).textContent).toFixed(2))

let chipsImgElements = document.querySelector('.wager-selections-bottom').children

function disableSelectedChips(indOne, indTwo) {
    let chipsArr = Array.from(chipsImgElements);
    let disabledChips = chipsArr.splice(indOne, indTwo);
    for (let chip of disabledChips) {
        chip.style.opacity = '.2';
    }
}

function disableChips() {
    if (balance === 0) {
        for (let chipImg of document.querySelector('.wager-selections-bottom').children) {
            chipImg.style.opacity = '.2';
        }
    } else if (balance < 1) {
        disableSelectedChips(0,5);
    } else if (balance < 25) {
        disableSelectedChips(1, 4);
    } else if (balance < 100) {
        disableSelectedChips(2, 3);
    } else if (balance < 500) {
        disableSelectedChips(3, 2);
    } else if (balance < 1000) {
        disableSelectedChips(4,1);
    }
}

document.addEventListener("DOMContentLoaded", disableChips);

document.getElementById('1-chip').onclick = () => {
    
}
