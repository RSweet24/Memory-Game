/*
 * List of icons for the cards
 */
let cards = ['fa-bicycle', 'fa-bullhorn', 'fa-diamond', 'fa-television', 'fa-wifi', 'fa-taxi', 'fa-ship', 'fa-laptop',
'fa-bicycle', 'fa-bullhorn', 'fa-diamond', 'fa-television', 'fa-wifi', 'fa-taxi', 'fa-ship', 'fa-laptop'
];
let shownCards = [];
let deck = document.querySelector('.deck');
let matchesLeft = 8;
let moveCounter = 0;
let moves = document.querySelector('span');
document.querySelector('.restart').addEventListener('click', resetGame);

startGame();

function startGame(){
/*
Shuffling the cards
*/
cards = shuffle(cards);
deck = document.querySelector('.deck');
matchesLeft = 8;
moves.innerText = moveCounter;
createCards();
assignClickHandler();
timer();
}

function createCards() {
for (var i = 0; i < cards.length; i++) {
    deck.appendChild(blankCard(i)).appendChild(cardIcon(i));
}
}

function resetGame(){
cards = shuffle(cards);
matchesLeft = 8;
clearCards();
startGame();
}

function clearCards() {
var gameDeck = document.querySelector('.deck');
gameDeck.innerHTML = '';
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
var currentIndex = array.length,
    temporaryValue, randomIndex;

while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}

return array;
}

// creating the html
function blankCard() {
let newBlankCard = document.createElement('li');
newBlankCard.setAttribute('class', 'card');
return newBlankCard;
}

// Adding icon to the cards
function cardIcon(i) {
let newIcon = document.createElement('i');
newIcon.setAttribute('class', 'fa ' + cards[i]);
return newIcon;
}

// Flipping the cards when clicked
function showCard(cardToFlip) {
cardToFlip.setAttribute('class', 'card open show');
shownCards.push(cardToFlip);
if(shownCards.length === 2){
    cardsToMatch(shownCards);
    shownCards = [];
}
}

function setCardAsMatch(card){
card.setAttribute('class', 'card match animated flip');
setTimeout(function(){
    $(card).removeClass('animated flip');
}, 2000);

}

function noMatchAnimate() {
$('.deck').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  $(this).removeClass('animated shake');
  $('.card').removeClass('open show');
});
};

function cardsToMatch(shownCards){
if(shownCards[0].innerHTML === shownCards[1].innerHTML){
    setCardAsMatch(shownCards[0]);
    setCardAsMatch(shownCards[1]);
    --matchesLeft;
    addMoves();
}else{
    noMatchAnimate();
    addMoves();
    return false;
}
}

function assignClickHandler(){
let clickedCard = document.querySelectorAll('.card'), result;
for (var i = 0; i < clickedCard.length; i++) {
result = clickedCard[i];
result.addEventListener('click', cardClickedEventHandler.bind(this));
}
}

function addMoves() {
    moveCounter++
    moves.innerText = moveCounter;
}
/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one) - done
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) - done
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

// Click event
function cardClickedEventHandler(cardToShow){
showCard(cardToShow.target);
    if(matchesLeft === 0){
        alert("You win");
        clearTimeout(t);
        stopWatch.textContent = "00:00:00";
        seconds = 0; minutes = 0; hours = 0;
        resetGame();
    }
}

let stopWatch = document.querySelector('.stop-watch')
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    stopWatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();
