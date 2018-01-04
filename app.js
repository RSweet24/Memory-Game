/*
 * List of icons for the cards
 */
let cards = ['fa-bicycle', 'fa-bullhorn', 'fa-diamond', 'fa-television', 'fa-wifi', 'fa-taxi', 'fa-ship', 'fa-laptop',
    'fa-bicycle', 'fa-bullhorn', 'fa-diamond', 'fa-television', 'fa-wifi', 'fa-taxi', 'fa-ship', 'fa-laptop'
];
/*
    Shuffling the cards and then creating the html
*/
cards = shuffle(cards);
let deck = document.querySelector('.deck');

function blankCard() {
    let newBlankCard = document.createElement('li');
    newBlankCard.setAttribute('class', 'card');
    return newBlankCard;
}

function cardIcon(i) {
    let newIcon = document.createElement('i');
    newIcon.setAttribute('class', 'fa ' + cards[i]);
    return newIcon;
}
for (var i = 0; i < cards.length; i++) {
    deck.appendChild(blankCard(i)).appendChild(cardIcon(i));
}

function showCard(cardToFlip) {
    cardToFlip.setAttribute('class', 'card show');
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let clickedCard = document.querySelectorAll('.card'),
    result;
for (var i = 0; i < clickedCard.length; i++) {
    result = clickedCard[i];
    result.addEventListener('click', function () {
        showCard(this);
    });
}
