const squares = document.querySelectorAll(".square");
const Hpannounce = document.getElementById("announce");
const notes = document.getElementById("notes");
const scoutHpannounce = document.getElementById("announceTwo");
const restart = document.getElementById("restartButton");

// start of game
let tankPlaced = false;
let scoutPlaced = false;
let gameRunning = true;

//Player scout info
let scoutLocation = "0"
let scoutMoved = 0;

//restart game function
restart.addEventListener("click", restartFunc);
function restartFunc() {
    for (let i = 0; i < squares.length; i++) {
    squares[i].className = "square";
    squares[i].innerHTML = "";
    tankPlaced = false;
    scoutPlaced = false;
    gameRunning = true;
    computerTankHp = 100;
    Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
    computerScoutHp = 100;
    scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
    scoutMoved = false;
    scoutLocation = "0"
}
}

let computerTankHp = 100;
Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
let computerScoutHp = 100;
scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

//functions for player and computer place units
//player places tank
function playerPlaceTank(i) {
    squares[i].className = "placedTank";
    tankPlaced = true;
    squares[i].innerHTML = "player tank";
}

// computer places tank
function compPlaceTank () {
    let rand = Math.floor(Math.random() * 100);
    if (squares[rand].className == "square") {
        squares[rand].className = "computerTank";
        squares[rand].innerHTML = "computer tank";
    }
}

//player places scout
function playerPlaceScout(i) {
    squares[i].className = "placedScout";
    scoutPlaced = true;
    squares[i].innerHTML = "player scout";
    scoutLocation = i;
    notes.innerHTML = scoutLocation
}

//computer places scout
function compPlaceScout(i) {
    let rand = Math.floor(Math.random() * 100);
        if (squares[rand].className == "square") {
            squares[rand].className = "computerScout";
            squares[rand].innerHTML = "computer scout";
        }
}

// change location of scout
function scoutNewLocation(i) {
    squares[scoutLocation].className = "square";
    squares[scoutLocation].innerHTML = "";
    squares[i].className = "placedScout";
    squares[i].innerHTML = "player scout";
    scoutLocation = i;
    scoutMoved ++;
}

function unitMove(i, unitLocation) {
    if (canUnitMove(i, unitLocation)) {
        scoutNewLocation(i);
    } 
}

//test to see if unit can move
function canUnitMove(i, unitLocation) {
    switch (unitLocation - i) {
        case 1:
            return true;

        case -1:
            return true;

        case 10:
            return true;

        case -10:
            return true;

        case 11:
            return true;
            
        case 9:
            return true;
        
        case -11:
            return true;

        case -9:
            return true;

    }}
        


//check tank is alive
function tankAlive(i) {
    if (computerTankHp <= 0) {
        Hpannounce.innerHTML = "Tank HP: Tank is dead!";
        squares[i].className = "square";
        squares[i].innerHTML = "";

    }
}

//check scout is alive
function scoutAlive(i) {
    if (computerScoutHp <= 0) {
        scoutHpannounce.innerHTML = "Scout HP: Scout is dead!";
        squares[i].className = "square";
        squares[i].innerHTML = "";
    }
}

//check for game over
function gameOver() {
    if (computerScoutHp <= 0 && computerTankHp <= 0) {
        scoutHpannounce.innerHTML = "Scout HP: Scout is dead! - GAME OVER DUDE!";
        gameRunning = false;
    }
}

// game loop
for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
        if (gameRunning == true) {

            if (tankPlaced == false && squares[i].className == "square") {
                playerPlaceTank(i);
                setTimeout(compPlaceTank, 100);
            } 
            
            else if (scoutPlaced == false && squares[i].className == "square") {
                playerPlaceScout(i);
                setTimeout(compPlaceScout, 100);
                
            } 
            
            else if (scoutMoved < 2 && squares[i].className == "square") {
                unitMove (i, scoutLocation);
            }
            


            else if (squares[i].className == "computerTank") {
                    computerTankHp -= 50;
                    Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
                    tankAlive(i);
                    gameOver();
    
            } 
            
            else if (squares[i].className == "computerScout" && gameRunning == true) {
                    computerScoutHp -= 50;
                    scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
                    scoutAlive(i);
                    gameOver();
    
            } 
            
            else { if (squares[i].className == "square") { 
                squares[i].className = "clicked";
            } }
        } 
        
        else {
            return;
        }
        
    }
}

