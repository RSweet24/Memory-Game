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
let timerStarted = false;
let modal = document.getElementById('youWon');
let modalClose = document.getElementsByClassName("close")[0];
let stopWatch = document.querySelector('.stop-watch');
let seconds = 0;
let minutes = 0;
let hours = 0;
let t = null;


document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('button').addEventListener('click', playAgain);

startGame();
// Setting up the game
function startGame() {
    cards = shuffle(cards);
    deck = document.querySelector('.deck');
    matchesLeft = 8;
    moveCounter = 0;
    moves.innerText = moveCounter;
    createCards();
    assignClickHandler();
    resetTimer();
}
// Creating layout for cards
function createCards() {
    for (var i = 0; i < cards.length; i++) {
        deck.appendChild(blankCard(i)).appendChild(cardIcon(i));
    }
}
// Resetting the game
function resetGame() {
    clearCards();
    clearTimeout();
    resetStars();
    startGame();
}
function playAgain(){
    modal.style.display = "none";
    resetGame();
}
// Clearing the cards to blank
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

// Showing the cards
function showCard(cardToFlip) {
    if (!timerStarted){
        startTimer();
    }
    if (shownCards.length < 2) {
        shownCards.push(cardToFlip);
        cardToFlip.setAttribute('class', 'card open show');
        if (shownCards.length === 2) {
            if (doCardsMatch(shownCards)) {
                shownCards = [];
            }
        }
        if (matchesLeft === 0) {
            modal.style.display = "block";
        }
    }
}
// Flipping the cards when they match
function setCardAsMatch(card) {
    card.setAttribute('class', 'card match animated flip');
    setTimeout(function () {
        $(card).removeClass('animated flip');
    }, 2000);

}
// Shaking the board when cards don't match
function noMatchAnimate() {
    $('.deck').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('animated shake');
        $('.card').removeClass('open show');
        shownCards = [];
    });
}
// Checking cards for a match and incrementing the moves counter
function doCardsMatch(shownCards) {
    if (shownCards[0].innerHTML === shownCards[1].innerHTML) {
        setCardAsMatch(shownCards[0]);
        setCardAsMatch(shownCards[1]);
        --matchesLeft;
        addMoves();
        return true;
    } else {
        noMatchAnimate();
        addMoves();
        return false;
    }
}
// Assigning click handler for each card
function assignClickHandler() {
    let clickedCard = document.querySelectorAll('.card'),
        result;
    for (let i = 0; i < clickedCard.length; i++) {
        result = clickedCard[i];
        result.addEventListener('click', cardClickedEventHandler.bind(this));
    }
}
// move counter
function addMoves() {
    moveCounter++;
    moves.innerText = moveCounter;
    removeStars();
}
// When the game is over this will remove the stars depending on how many moves it took
function removeStars() {
    if (moveCounter === 15 || moveCounter === 25) {
        $('.stars li')[0].remove();
    }
}
// This will set the stars back to 3 at the beginning of the game
function resetStars() {
    $('.stars').empty();
    for (let i = 0; i < 3; i++) {
        let starHTML = '<li><i class="fa fa-star"></i></li>';
        $('.stars').append(starHTML);
    }
}

// Click event that will start the timer and check when the game will be over.
function cardClickedEventHandler(cardToShow) {
    let clickedCard = cardToShow.target;
    if (!clickedCard.classList.contains('match')) {
        if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('open')) {
            showCard(cardToShow.target);
            if (matchesLeft === 0) {
                modalContent();
            }
        }
    }
}
// Timer function to increment the time
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

    startTimer();
}

function startTimer() {
    t = setTimeout(add, 1000);
    timerStarted = true;
}

function resetTimer() {
    clearTimeout(t);
    stopWatch.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerStarted = false;
}

modalClose.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
// Modal content 
function modalContent() {
    let stars = $('.stars li').length;
    $('p')[0].innerText = "You won the game!!! It took you " + stopWatch.innerText + ' to complete the board. You did it in ' + moveCounter + ' moves, which results in ' + stars + ' stars';
    resetTimer();
}