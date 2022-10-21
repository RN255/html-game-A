//collect some html
const squares = document.querySelectorAll(".square");
const Hpannounce = document.getElementById("announce");
const notes = document.getElementById("notes");
const scoutHpannounce = document.getElementById("announceTwo");
const restart = document.getElementById("restartButton");


// start of game
let gameRunning = true;

//Player scout info
let scoutPlaced = false;
let scoutLocation = 0
let scoutMoved = 0;

//player Tank info
let tankPlaced = false;
let tankLocation = 0
let tankMoved = 0;
let tankHasShot = 0;

//computer scout info
let computerScoutLocation = 0;
let computerScoutMoved = false;
let computerScoutHp = 100;
let computerScoutAlive = true;
scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;

//computer tank info
let computerTankHp = 100;
let computerTankLocation = 0;
let computerTankMoved = false;
let computerTankAlive = true;
Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;


//restart game function
restart.addEventListener("click", restartFunc);
function restartFunc() {
    //resart game
    gameRunning = true;
    //reset squares
    for (let i = 0; i < squares.length; i++) {
    squares[i].className = "square";
    squares[i].innerHTML = "";
    //reset player scout info
    scoutPlaced = false;
    scoutLocation = 0;
    scoutMoved = 0;
    //reset player tank info
    tankPlaced = false;
    tankLocation = 0
    tankMoved = 0;
    tankHasShot = 0;
    //reset computer scout info
    computerScoutMoved = false;
    computerScoutLocation = 0;
    computerScoutHp = 100;
    scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
    //reset computer tank info
    computerTankHp = 100;
    computerTankLocation = 0;
    computerTankMoved = false;
    Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
}
}

//place units
//player places tank
function playerPlaceTank(i) {
    squares[i].className = "placedTank";
    tankPlaced = true;
    squares[i].innerHTML = "player tank";
    tankLocation = i;
}

// computer places tank
function compPlaceTank () {
    let rand = Math.floor(Math.random() * 100);
    if (squares[rand].className == "square") {
        squares[rand].className = "computerTank";
        squares[rand].innerHTML = "computer tank";
        computerTankLocation = rand;
    } else {
        compPlaceTank ()
    }
}

//player places scout
function playerPlaceScout(i) {
    if (squares[i].className == "square") {
        squares[i].className = "placedScout";
        scoutPlaced = true;
        squares[i].innerHTML = "player scout";
        scoutLocation = i;
    } else {
        playerPlaceScout();
    }     
}

//computer places scout
function compPlaceScout() {
    let rand = Math.floor(Math.random() * 100);
    if (squares[rand].className == "square") {
        squares[rand].className = "computerScout";
        squares[rand].innerHTML = "computer scout";
        computerScoutLocation =  rand;
    } else {
        compPlaceScout()
    }
}

// move and fire units
// player change location of scout
function scoutMove(i) {
    if (canUnitMove(i, scoutLocation) && squares[i].className == "square") {
        squares[scoutLocation].className = "square";
        squares[scoutLocation].innerHTML = "";
        squares[i].className = "placedScout";
        squares[i].innerHTML = "player scout";
        scoutLocation = i;
        scoutMoved ++;
    } 
}

// shoot tank
function tankShoot(i) {
    if (squares[i].className == "computerTank") {
        computerTankHp -= 50;
        Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
        tankAlive(i);
        gameOver();
        tankHasShot ++;
    } else if (squares[i].className == "computerScout") {
        computerScoutHp -= 50;
        scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
        scoutAlive(i);
        gameOver();
        tankHasShot ++;
    } else {
        squares[i].className = "clicked";
        tankHasShot ++;
    }
}
  
// change location of tank
function tankMove(i) {
    if (canUnitMove(i, tankLocation)) {
        squares[tankLocation].className = "square";
        squares[tankLocation].innerHTML = "";
        squares[i].className = "placedTank";
        squares[i].innerHTML = "player tank";
        tankLocation = i;
        tankMoved ++;
        // computer moves scout then turn is reset
        // is this the best place to put this?
        setTimeout(CompueterScoutMove, 100);
        resetMove();
    } 
    
}  

//computer scout move
function CompueterScoutMove () {
    if (computerScoutAlive == true) {
        let moveChoiceNumber = 0;
        // set movement options depending on unit location and get choice
        if ((computerScoutLocation +1 ) % 10 == 0) {
            const optionOne = [-1, 10, -10, 9, -11];
            var index = Math.floor(Math.random() * optionOne.length);
            moveChoiceNumber = optionOne[index];
        } else if (computerScoutLocation % 10 == 0) {
            const optionTwo = [1, 10, -10, 11, -9];
            var index = Math.floor(Math.random() * optionTwo.length);
            moveChoiceNumber = optionTwo[index];
        } else { 
            const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
            var index = Math.floor(Math.random() * optionThree.length);
            moveChoiceNumber = optionThree[index];
        }    
        //detemine movement choice
        let moveChoice = computerScoutLocation + moveChoiceNumber;
        // check move is possible
        if (moveChoice >= 0 && moveChoice <= 99){
            if (squares[moveChoice].className == "square") {
                squares[computerScoutLocation].className = "square";
                squares[computerScoutLocation].innerHTML = "";
                squares[moveChoice].className = "computerScout";
                squares[moveChoice].innerHTML = "computer scout";
                computerScoutLocation = moveChoice;
    
            } else {
                CompueterScoutMove();    
            }
        } else {
            CompueterScoutMove(); 
        }
    } 
    }  

//reset turn
function resetMove() {
    scoutMoved = 0;
    tankMoved = 0;
    tankHasShot = 0;
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
        computerScoutAlive = false;
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

            if (tankPlaced == false) {
                playerPlaceTank(i);
                setTimeout(compPlaceTank, 100);
            } 
            
            else if (scoutPlaced == false) {
                playerPlaceScout(i);
                setTimeout(compPlaceScout, 100);
                
            } 
            
            else if (scoutMoved < 2) {
                scoutMove (i);
            }

            else if (tankHasShot < 1) {
                tankShoot(i);
            }

            else if (tankMoved < 1) {
                tankMove (i);
            }

            // this is not actually being called, it is called above, could change...
            else {
                CompueterScoutMove();
            }
                
            
           



        } 
        
        else {
            return;
        }
        
    }
}

