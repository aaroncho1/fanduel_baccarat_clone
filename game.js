let wager = parseFloat(parseFloat((document.getElementById('total-wager')).textContent).toFixed(2))
let wagerElement = document.getElementById('total-wager');
let balance = parseFloat(parseFloat((document.getElementById('available-balance')).textContent).toFixed(2))
let balanceElement = document.getElementById('available-balance');
let cashOutBtnElement = document.getElementById('cash-out-btn');
let chipIdsArr = ['1-chip', '25-chip', '100-chip', '500-chip', '1000-chip'];
let cardsObj = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'A': 1, 'J': 10, 'Q': 10, 'K': 10
};
let cardsArr = Object.keys(cardsObj);
let playerScoreElement = document.getElementById('player-score');
let playerScore = 0;
let bankerScoreElement = document.getElementById('banker-score');
let bankerScore = 0;

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

function setChipsAndCashoutBtn() {
    balance === 0 ? cashOutBtnElement.style.opacity = '.2' : cashOutBtnElement.style.opacity = '1';
    chipIdsArr.forEach( id => {
        document.getElementById(id).onclick = () => {
            let amount = Number(id.split('-')[0]);
            if (wager < balance){
                if (balance < amount){
                    document.getElementById(id).style.opacity = '.2';
                } else {
                    if (wager + amount <= balance){
                        wagerElement.textContent = String(wager += amount);
                        disableChips();
                    } else {
                        disableChips();
                    }
                }
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', setChipsAndCashoutBtn);
document.addEventListener('DOMContentLoaded', () => {
    mouseOverAllSelections();
    mouseOutAllSelections();
})

document.getElementById('clear-btn').onclick = () => {
    wager = 0;
    wagerElement.textContent = "0.00";
}

function mouseOverDivEffect(div){
    if (wager > 0) {
        document.getElementById(`mouseover-${div.className}-wager`).textContent = wager;
        div.querySelector('p:first-of-type').style.display = 'none';
        div.querySelector('p:nth-of-type(2)').style.display = 'none';
        div.querySelector('p:last-of-type').style.display = 'block';
        div.classList.add('selections-hover-effect');
        div.style.border = "2px solid black";
    }
}

function mouseOutDivEffect(div){
    div.querySelector('p:first-of-type').style.display = 'block';
    div.querySelector('p:nth-of-type(2)').style.display = 'block';
    div.querySelector('p:last-of-type').style.display = 'none';
    div.classList.remove('selections-hover-effect');
    div.style.border = "2px solid #BAD7C8";
}

function mouseOverAllSelections(){
    Array.from(document.querySelector('.selections-box').children).forEach(div => div.addEventListener("mouseover", () => {
        mouseOverDivEffect(div);
    }))
}

function mouseOutAllSelections(){
    Array.from(document.querySelector('.selections-box').children).forEach(div => div.addEventListener("mouseout", () => {
        mouseOutDivEffect(div);
    }))
}

function drawPlayerCard(){
    let drawnCard = cardsArr[Math.floor(Math.random() * cardsArr.length)];
    let cardImgElement = document.createElement('img');
    cardImgElement.setAttribute('src', `./assets/images/${drawnCard}-card.png`);
    document.querySelector('.player-cards').appendChild(cardImgElement);
    playerScoreElement.textContent = playerScore += cardsObj[drawnCard];
}

function drawBankerCard() {
    let drawnCard = cardsArr[Math.floor(Math.random() * cardsArr.length)];
    let cardImgElement = document.createElement('img');
    cardImgElement.setAttribute('src', `./assets/images/${drawnCard}-card.png`);
    document.querySelector('.banker-cards').appendChild(cardImgElement);
    bankerScoreElement.textContent = bankerScore += cardsObj[drawnCard];
}

function drawCardsForTie(){
    if (wager > 0) {
        let tieDiv = document.querySelector('.tie');
        tieDiv.removeEventListener('click', drawCardsForTie);
        balance -= wager;
        balanceElement.textContent = balance;
        setTimeout(drawPlayerCard, 1000);
        setTimeout(drawBankerCard, 2000);
        setTimeout(drawPlayerCard, 3000);
        setTimeout(drawBankerCard, 4000);
    }
}

document.querySelector('.tie').addEventListener('click', drawCardsForTie);