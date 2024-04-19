let wager = parseFloat(parseFloat((document.getElementById('total-wager')).textContent).toFixed(2))
let wagerElement = document.getElementById('total-wager');
let balance = parseFloat(parseFloat((document.getElementById('available-balance')).textContent).toFixed(2))
let balanceElement = document.getElementById('available-balance');
let cashOutBtnElement = document.getElementById('cash-out-btn');
let cardsObj = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'A': 1, 'J': 10, 'Q': 10, 'K': 10
};
let cardsArr = Object.keys(cardsObj);
let playerScoreElement = document.getElementById('player-score');
let playerScore = 0;
let bankerScoreElement = document.getElementById('banker-score');
let bankerScore = 0;
let bankerCardsDiv = document.querySelector('.banker-cards');
let playerCardsDiv = document.querySelector('.player-cards');
let wagerSelectionsDiv = document.querySelector('.wager-selections-bottom');
let chipsImgElements = wagerSelectionsDiv.children;
let clearBtn = document.getElementById('clear-btn');
let cashoutBtn = document.getElementById('cash-out-btn');
let mouseOverSelectionsDiv = document.querySelector('.selections-mouseover-block');
let chipPosTop = 15;
let chipsWagerArr = [];

function shrinkCards(){
    if (window.innerWidth > 1280){
        if (playerCardsDiv.childElementCount > 2){
            Array.from(playerCardsDiv.children).forEach( (img) => {
                playerCardsDiv.style.width = '95%';
                img.style.width = '108px';
                img.style.height = '166px';
            })
        }
        if (bankerCardsDiv.childElementCount > 2) {
            Array.from(bankerCardsDiv.children).forEach((img) => {
                bankerCardsDiv.style.width = '95%';
                img.style.width = '108px';
                img.style.height = '166px';
            })
        }
    }
}

function resetCardsStyle(){
    [playerCardsDiv, bankerCardsDiv].forEach((div) => {
        Array.from(div.children).forEach((img) => {
            div.style.width = '100%';
            img.style.width = '45%';
            img.style.height = 'auto';
        })
    })
}

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

function blackOutChips(){
    Array.from(chipsImgElements).forEach(chip => chip.style.opacity = '.2');
}

function blackOutClearAndCashoutBtns(){
    [clearBtn, cashoutBtn].forEach(div => div.style.opacity = '.2');
}

function blackOutFirstSecondPElements(div){
    for (let i = 0; i < 3; i++) {
        Array.from(div.children)[i].style.opacity = '0';
    }
}

function resetClearAndCashoutBtns(){
    [clearBtn, cashoutBtn].forEach(div => div.style.opacity = '1');
}

function setNewBalance(balance){
    let newBalance = String(balance).includes('.') ? String(balance) + '0' : String(balance) + '.00';
    balanceElement.textContent = newBalance;
}

function disableOnClickForChips(){
    document.querySelector('.wager-selections-block').style.display = 'block';
}

function addChipToSelection(div){
    let classStr = div.className.split(' ')[0];
    let posChange;
    blackOutFirstSecondPElements(div);
    div.classList.add('wager-effect');
    getChipsWagerArr(wager);
    posChange = setNewPos(chipsWagerArr.length);
    chipsWagerArr.forEach((chipAmt) => {
        let newImgElement = document.createElement('img');
        newImgElement.src = `./assets/images/${chipAmt}-chip.png`;
        document.querySelector(`.${classStr}-chip-selections`).appendChild(newImgElement);
        document.querySelector(`.${classStr}-chip-selections`).style.display = 'flex';
        let positionTop = `${chipPosTop -= posChange}px`;
        newImgElement.style.top = positionTop;
    })
}

function getChipsWagerArr(dupWager) {
    [500, 100, 25, 5, 1].forEach(chipAmt => {
        while (dupWager % chipAmt < dupWager) {
            chipsWagerArr.push(chipAmt);
            dupWager -= chipAmt;
        }
    })
}

function setNewPos(arrLength){
    if (arrLength <= 5) {
        return 5;
    } else if (arrLength > 5 && arrLength <= 25) {
        return 2;
    } else if (arrLength > 25 && arrLength <= 50) {
        return 1;
    } else {
        return 0;
    }
}

function disableChips() {
    if (balance === 0) {
        for (let chipImg of document.querySelector('.wager-selections-bottom').children) {
            chipImg.style.opacity = '.2';
        }
    } else if (balance - wager < 1) {
        disableSelectedChips(0,5);
    } else if (balance - wager < 5) {
        disableSelectedChips(1, 4);
        enableSelectedChips(0,1);
    } else if (balance - wager < 25) {
        disableSelectedChips(2, 3);
        enableSelectedChips(0, 2);
    } else if (balance - wager < 100) {
        disableSelectedChips(3, 2);
        enableSelectedChips(0, 3);
    } else if (balance - wager < 500) {
        disableSelectedChips(4,1);
        enableSelectedChips(0, 4);
    } else {
        enableSelectedChips(0, 5);
    }
}

function disableMouseOverSelections(){
    mouseOverSelectionsDiv.style.display = 'block';
}

function enableMouseOverSelections(){
    mouseOverSelectionsDiv.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", disableChips);


function setChipsAndCashoutBtn() {
    balance === 0 ? cashOutBtnElement.style.opacity = '.2' : cashOutBtnElement.style.opacity = '1';
    Array.from(chipsImgElements).forEach( chip => {
        chip.addEventListener('click', () => {
            let amount = Number(chip.id.split('-')[0]);
            if (wager < balance){
                if (balance < amount){
                    document.getElementById(id).style.opacity = '.2';
                } else {
                    if (wager + amount <= balance){
                        let newWager = wager += amount;
                        wagerElement.textContent = String(newWager) + '.00';
                        disableChips();
                    } else {
                        disableChips();
                    }
                }
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', setChipsAndCashoutBtn);
document.addEventListener('DOMContentLoaded', () => {
    mouseOverAllSelections();
    mouseOutAllSelections();
})

document.getElementById('clear-btn').onclick = () => {
    resetWagerAndDisableChips();
}

function resetWagerAndDisableChips() {
    chipsWagerArr = [];
    wager = 0;
    wagerElement.textContent = "0.00";
    disableChips();
}

function mouseOverDivEffect(div){
    if (wager > 0) {
        document.getElementById(`mouseover-${div.className}-wager`).textContent = wager;
        div.querySelector('p:first-of-type').style.display = 'none';
        div.querySelector('p:nth-of-type(2)').style.display = 'none';
        div.querySelector('p:last-of-type').style.display = 'block';
        div.classList.add('selections-hover-effect');
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

function settleBet(bet) {
    if (bet === 'tie') {
        if (playerScore === bankerScore) {
            balance += wager + (wager * 8);
            setNewBalance(balance);
        } 
    }
}

function resetUIChanges(div) {
    for (let i = 0; i < 3; i++) {
        Array.from(div.children)[i].style.opacity = '1';
    }
    div.classList.remove('wager-effect');
    let tieSelectionsDiv = document.querySelector('.tie-chip-selections')
    let tieSelectionsArr = Array.from(tieSelectionsDiv.children);
    tieSelectionsArr.forEach( imgEl => tieSelectionsDiv.removeChild(imgEl));
    resetWagerAndDisableChips();
    balance === 0 ? cashOutBtnElement.style.opacity = '.2' : cashOutBtnElement.style.opacity = '1';
    clearBtn.style.opacity = '1';
    document.querySelector('.wager-selections-block').style.display = 'none';
    // resetScoreAndClearCards();
}

function resetScoreAndClearCards() {
    playerScore = 0;
    playerScoreElement.textContent = playerScore;
    bankerScore = 0;
    bankerScoreElement.textContent = bankerScore;
    Array.from(playerCardsDiv.children).forEach(imgEl => playerCardsDiv.removeChild(imgEl));
    Array.from(bankerCardsDiv.children).forEach(imgEl => bankerCardsDiv.removeChild(imgEl));
}

function drawPlayerCard(){
    let drawnCard = cardsArr[Math.floor(Math.random() * cardsArr.length)];
    let cardImgElement = document.createElement('img');
    cardImgElement.setAttribute('src', `./assets/images/${drawnCard}-card.png`);
    document.querySelector('.player-cards').appendChild(cardImgElement);
    playerScore += cardsObj[drawnCard];
    playerScore = playerScore % 10;
    playerScoreElement.textContent = playerScore
}

function drawBankerCard() {
    let drawnCard = cardsArr[Math.floor(Math.random() * cardsArr.length)];
    let cardImgElement = document.createElement('img');
    cardImgElement.setAttribute('src', `./assets/images/${drawnCard}-card.png`);
    document.querySelector('.banker-cards').appendChild(cardImgElement);
    bankerScore += cardsObj[drawnCard];
    bankerScore = bankerScore % 10;
    bankerScoreElement.textContent = bankerScore;
}

function drawFirstTwo(){
    setTimeout(drawPlayerCard, 1000);
    setTimeout(drawBankerCard, 2000);
    setTimeout(drawPlayerCard, 3000);
    setTimeout(drawBankerCard, 4000);
    setTimeout(() => {
        enableMouseOverSelections();
    }, 6000)
}

function drawThirdPlayerCard(){
    if (playerScore < 6){
        drawPlayerCard();
        drawThirdBankerCard();
    } else {
        drawBankerCard();
    }
}

function drawThirdBankerCard(){
    setTimeout(() => {
        if (bankerScore <= 2 && bankerCardsDiv.children.length < 3){
            drawBankerCard();
        } else if (bankerCardsDiv.children.length < 3 && bankerScore === 3 && parseInt(playerCardsDiv.children[2].src.split('-card')[0][playerCardsDiv.children[2].src.split('-card')[0].length - 1]) !== 8){
            drawBankerCard();
        } else if (bankerCardsDiv.children.length < 3 && bankerScore === 4 && [2, 3, 4, 5, 6, 7].includes(parseInt(playerCardsDiv.children[2].src.split('-card')[0][playerCardsDiv.children[2].src.split('-card')[0].length - 1]))){
            drawBankerCard();
        } else if (bankerCardsDiv.children.length < 3 && bankerScore === 5 && [4, 5, 6, 7].includes(parseInt(playerCardsDiv.children[2].src.split('-card')[0][playerCardsDiv.children[2].src.split('-card')[0].length - 1]))){
            drawBankerCard();
        } else if (bankerCardsDiv.children.length < 3 && bankerScore === 6 && [6, 7].includes(parseInt(playerCardsDiv.children[2].src.split('-card')[0][playerCardsDiv.children[2].src.split('-card')[0].length - 1]))) {
            drawBankerCard();
        } else if (bankerCardsDiv.children.length < 3 && bankerScore >= 7){
            return;
        }
        shrinkCards();
    }, 1000)
}

function naturalStands(){
    return bankerScore > 7 || playerScore > 7;
}

function drawCards(e){
    if (wager > 0) {
        let betSelection = e.target.className.split(' ')[0];
        disableMouseOverSelections();
        addChipToSelection(e.target);
        blackOutChips();
        blackOutClearAndCashoutBtns();
        disableOnClickForChips();
        balance -= wager;
        setNewBalance(balance);
        drawFirstTwo();
        setTimeout(() => {
            if (naturalStands()){
                settleBet(betSelection);
                resetUIChanges(e.target);
                return;
            } else {
                drawThirdPlayerCard();
                shrinkCards();
                drawThirdBankerCard();
            }
        }, 5000);
        if (!naturalStands()) { 
            setTimeout(() => {
                settleBet(betSelection);
                resetUIChanges(e.target);
            }, 6000);
        } 
    }
    //have to finish function logic
}

document.querySelector('.tie').addEventListener('click', drawCards);