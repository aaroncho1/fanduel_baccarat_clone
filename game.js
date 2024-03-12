let wager = parseFloat(parseFloat((document.getElementById('total-wager')).textContent).toFixed(2))
let wagerElement = document.getElementById('total-wager');
let balance = parseFloat(parseFloat((document.getElementById('available-balance')).textContent).toFixed(2))
let balanceElement = document.getElementById('available-balance');

let chipsImgElements = document.querySelector('.wager-selections-bottom').children

function disableSelectedChips(indOne, indTwo) {
    let chipsArr = Array.from(chipsImgElements);
    let disabledChips = chipsArr.splice(indOne, indTwo);
    for (let chip of disabledChips) {
        chip.style.opacity = '.2';
    }
}

function enableSelectedChips(indOne, indTwo) {
    let chipsArr = Array.from(chipsImgElements);
    let enabledChips = chipsArr.splice(indOne, indTwo);
    for (let chip of enabledChips) {
        chip.style.opacity = '1';
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
        enableSelectedChips(0,1);
    } else if (balance < 100) {
        disableSelectedChips(2, 3);
        enableSelectedChips(0, 2);
    } else if (balance < 500) {
        disableSelectedChips(3, 2);
        enableSelectedChips(0, 3);
    } else if (balance < 1000) {
        disableSelectedChips(4,1);
        enableSelectedChips(0, 4);
    } else {
        enableSelectedChips(0, 5);
    }
}

document.addEventListener("DOMContentLoaded", disableChips);

document.getElementById('1-chip').onclick = () => {
    if (balance < 1){
        document.getElementById('1-chip').style.opacity = '.2';
    } else {
        wagerElement.textContent = String(balance += 1);
        disableChips();
    } 
}

document.getElementById('25-chip').onclick = () => {
    if (balance < 25) {
        document.getElementById('25-chip').style.opacity = '.2';
    } else {
        wagerElement.textContent = String(balance += 25);
        disableChips();
    }
}
