//Declaration of global variables
let sequence = [];
let playerSequence  = [];
let interval;
let show;
let level;
let computerTurn;
let correct;
let tempo = 800;
let timeoutId;
let startTimeout;
let count;

//Declaration of element variables
const Currentscore = document.querySelector('#Currentscore');
const Highscore = document.querySelector('#Highscore');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');
const yellow = document.querySelector('#yellow');
const red = document.querySelector('#red');
const startButton = document.querySelector('#startButton');

//If the start button is clicked
startButton.addEventListener('click', () => {
    startTimeout = setTimeout("play()", 3000); //Begin 3 seconds after button press
    Currentscore.innerHTML = ("0" + "1").slice(-2); //Set Current score to "01"
    document.getElementById('powerLight').style.backgroundColor = "greenyellow"; //Change Powerlight to green
});

//Base play function
function play() {
    tempo = 800; //Default light speed gap is 800ms
    sequence = []; //Initialize empty array for sequence
    playerSequence = []; //Initialize empty array for player sequence
    show = 0; //How many flashes have appeared
    interval = 0; //Base value for interval
    level = 1; //Set to level 1 for start of game
    correct = true; //Correct selection = true

    computerTurn = true; //Computer Turn = true
    //Speed setting for level
    if(level === 5)
    {
        tempo = 600;
    }
    else if(level === 9)
    {
        tempo = 400;
    }
    else if(level === 13)
    {
        tempo = 200;
    }
    //setInterval for main game function based on what tempo is required
    interval = setInterval(gameLevel, tempo);
}

function gameLevel() {
    //Push a random number between one and four into computer sequence array (sequence of flashes)
    sequence.push(Math.floor(Math.random() * 4) + 1);

    //If the number of flashes appeared is equal to the current level
    if(show === level) {
        clearInterval(interval);    //Clear the interval
        computerTurn = false;       //Allow to be users turn
        clearColor();               //Clear all flashing colors
        on = true;                  //Game on = true
    }

    //If computer turn  = true
    if(computerTurn)
    {
        clearColor();   //clear all colors
        setTimeout(() => {  //Timeout for user flashes
            if(sequence[show] === 1)    //If sequence at array index of how many flashes appeared = 1
            {
                one();  //Call one function (green color)
            }
            if(sequence[show] === 2)
            {
                two();  //Call one function (red color)
            }
            if(sequence[show] === 3)
            {
                three();    //Call one function (yellow color)
            }
            if(sequence[show] === 4)
            {
                four(); //Call one function (blue color)
            }
            show++; //Increment number of flashes
        }, 200);    //Timeout set to 200ms
    }
}

function one() {
    green.style.backgroundColor = "greenyellow";    //Set background color of circle to flashed green
    clearInterval(timeoutId);   //Clear timeout interval for user time limit
    startTimer();   //Begin user move timer
}

function two() {
    red.style.backgroundColor = "tomato";
    clearInterval(timeoutId);
    startTimer();
}

function three() {
    yellow.style.backgroundColor = "#f6ff00";
    clearInterval(timeoutId);
    startTimer();
}

function four() {
    blue.style.backgroundColor = "deepskyblue";
    clearInterval(timeoutId);
    startTimer();
}

function clearColor() {
    green.style.backgroundColor = "green";  //Reset all colors
    blue.style.backgroundColor = "blue";
    yellow.style.backgroundColor = "gold";
    red.style.backgroundColor = "red";
}

function gameOver() {
    green.style.backgroundColor = "greenyellow";    //Flash all colors
    red.style.backgroundColor = "tomato";
    yellow.style.backgroundColor = "#f6ff00";
    blue.style.backgroundColor = "deepskyblue";
    clearInterval(timeoutId);   //Clear timeout interval
}

green.addEventListener('click', () => { //If green is clicked
    if(on) {    //if game on = true
        playerSequence.push(1); //Push that color into the players sequence
        check();    //Check if the colors match
        one();  //Call flash blue
        setTimeout(() => {  //set timeout for clearing colors at 300ms
            clearColor();
        }, 300);
    }
});

red.addEventListener('click', () => {
    if(on) {
        playerSequence.push(2);
        check();
        two();
        setTimeout(() => {
            clearColor();
        }, 300);
    }
});

yellow.addEventListener('click', () => {
    if(on) {
        playerSequence.push(3);
        check();
        three();
        setTimeout(() => {
            clearColor();
        }, 300);
    }
});

blue.addEventListener('click', () => {
    if(on) {
        playerSequence.push(4);
        check();
        four();
        setTimeout(() => {
            clearColor();
            }, 300);
    }
});

//Check player choice
function check() {
    //If player sequence array at player sequence index length is not equal to sequence array at player sequence index length
    //( - 1 because of 0 base settings)
    if(playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1])
    {
        correct = false;    //Set correct choice to false
    }

    //If choice is incorrect
    if(correct === false)
    {
        reset();   //Reset the game
    }

    //If level is equal to player sequence length and choice is correct
    if(level ===  playerSequence.length && correct)
    {
        level++;    //Move onto next level
        playerSequence = [];    //Reset player sequence array
        computerTurn = true;    //It is the computers turn
        show = 0;   //Reset flashes to 0
        Currentscore.innerHTML = ("0" + level).slice(-2);   //Set current score to new level
        //Speed settings
        if(level === 5)
        {
            tempo = 600;
        }
        else if(level === 9)
        {
            tempo = 400;
        }
        else if(level === 13)
        {
            tempo = 200;
        }
        interval = setInterval(gameLevel, tempo); //Re-call main game function at desired tempo
    }
}

//Timer for 5 second time limit for user selection per level
function startTimer() {
    timeoutId = setInterval(reset, 5500) //When 5 seconds has been reached call doIncative()
}

//End game after 5 seconds has elapsed
function reset() {
    clearInterval(timeoutId);   //Clear interval id as to avoid unwanted extra flashes
    //Reset power light to red
    document.getElementById('powerLight').style.backgroundColor = "red";
    //Loop for flash colors 5 times
    for(let i = 900; i < 5000; i = i+900)
    {
        setTimeout("gameOver()", i);
        setTimeout("clearColor()", i+450);
    }
    //Set highest score to the current level (Score)
    Highscore.innerHTML = ("0" + level).slice(-2);
    //Reset current score to "00"
    Currentscore.innerHTML = "00";
    //Set timeout for reset
    setTimeout(() => {
        Currentscore.innerHTML = "00";
        clearColor();
    }, 5500);
}
