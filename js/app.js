const card = document.getElementsByClassName("card");

let OpenedCards = [];

let allElements = [];

const restartGame = document.getElementsByClassName("restart");

let moves = 0;
let seconds = 1, mins = 0;
const movesCounter = document.querySelector("span.moves");

const movesTimer = document.querySelector("span.timer");

const finalTime = document.querySelector("div.final-time span");

const playAgainBtn = document.getElementsByClassName("play-again-btn");

let matchedCard = document.getElementsByClassName("match");

let starContaner = document.querySelector(".stars");

let stars;


// Initiate game while the document is loading
document.body.onload = startGame(); 

// Shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Start game function

function startGame() {
    let elements = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
    allElements = elements.concat(elements);
    moves = 0;
    mins = 0;
    seconds = 0;
    movesCounter.innerHTML = moves;
    movesTimer.innerHTML = "0 mins 0 secs";
    shuffle(allElements);
    // Append elements to the DOM
    const iconsUL = document.createElement("ul");
    iconsUL.className = "deck";
  
    for (var i = 0;  i < allElements.length; i++) {
        const iconLi = document.createElement("li");
        iconLi.className = "card";
        iconLi.setAttribute("value", allElements[i]);
        const icon = document.createElement("i");
        iconLi.appendChild(icon);
        icon.classList.add("fa", "fa-" + allElements[i]);
        iconsUL.appendChild(iconLi);
    }
    document.body.querySelector(".container").appendChild(iconsUL);
   
    fillStarConatiner();
    
    
    // Event listners for cards  
    for (var i = 0; i < allElements.length; i++){
        card[i].addEventListener("click", clickCard);
        card[i].addEventListener("click", openCards);
        card[i].addEventListener("click",showCongrats);
    }
    
}

// Restart Game
function restart() {
    document.querySelector("ul.deck").remove();
    console.log(document.querySelector("ul.deck").remove())
    document.getElementById("congrats").style.display ='none';
    clearInterval(interval);
    startGame();
}


function fillStarConatiner() {
    starContaner.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        var x = document.createElement("li");
        var y = document.createElement("i");
        y.classList.add("fa", "fa-star");
        x.appendChild(y);
        starContaner.appendChild(x);
    }
    stars = document.querySelectorAll(".fa-star");
}

// Add/Remove classes to cards
function clickCard() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    moves++;
    movesCounter.innerHTML = moves;
}

// Open Cards
function openCards() {
    OpenedCards.push(this);
    moveCounter();
    let $leng = OpenedCards.length;
    if($leng === 2) {
        if(OpenedCards[0].getAttribute("value") === OpenedCards[1].getAttribute("value") ) {
            matched();
        }
        else {
            unmatched();
        }
    }
        
}
// If the 2 opened cards is matched 
function matched() {
    OpenedCards[0].classList.add("match", "disabled");
    OpenedCards[1].classList.add("match", "disabled");
    OpenedCards[0].classList.remove("show", "open");
    OpenedCards[1].classList.remove("show", "open");
    OpenedCards = [];

}
// If the 2 opened cards is unmatched 
function unmatched() {
    OpenedCards[0].classList.add("unmatched");
    OpenedCards[1].classList.add("unmatched");
    disableAllCards();
    setTimeout(function(){
        OpenedCards[0].classList.remove("show", "open","unmatched");
        OpenedCards[1].classList.remove("show", "open","unmatched");
        enableAllCards();
        OpenedCards = [];
    },1100);
    
}

// adding disabled class on all cards during the unmatched pairs
function disableAllCards() {
    let cards = document.querySelectorAll("li.card");
    for(let i = 0; i < cards.length;  i++) {
        cards[i].classList.add("disabled");
    }
}

// removing disabled class from all cards except already matched cards
function enableAllCards() {
    let $cards = document.querySelectorAll("li.card");
    for(let i = 0; i < $cards.length;  i++) {
        if($cards[i].classList.contains("match")) {
            // cards[i].classList.remove("disabled");
        } else {
            $cards[i].classList.remove("disabled");
        }
    }
}

// adjust stars based on moves
function moveCounter(){
    if(moves === 1 ) {
        calculateTime();
    }

    if (moves > 16 && moves < 22){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].classList= "fa fa-star-o";
            }
        }
    }
    else if (moves > 22){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].classList = "fa fa-star-o";
            }
        }
    }
}
// Show modal when the game is done
function showCongrats() {
    if (matchedCard.length == 16){
        document.getElementById("congrats").style.display ='block';
        document.getElementById("congrats").style.zIndex ='1000000';
        document.getElementById("final-moves").innerHTML = moves;
        const finalStarsContainer =  document.getElementById("final-Stars");

        finalStarsContainer.innerHTML = '';

        for ( let i = 0 ; i < 3; i++) {
            finalStarsContainer.appendChild(stars[i]);
        }
        finalTime.innerHTML = mins + " mins " +  seconds + " secs";
        clearInterval(interval);
        
    };
    
}

// Event listener for reset game button
restartGame[0].addEventListener("click", restart);

// Event listener for play again button
playAgainBtn[0].addEventListener("click", restart);

// Adding moves timer to the game 
let interval;
function calculateTime() {
    interval = setInterval(function() {
    movesTimer.innerHTML = mins + " mins " +  seconds + " secs" ;
    seconds++;
    if(seconds == 60) {
        seconds = 0;
        mins++
    }

}, 1000);
}

