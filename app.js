//collect some html
const squares = document.querySelectorAll(".square");
const Hpannounce = document.getElementById("announce");
const notes = document.getElementById("notes");
const scoutHpannounce = document.getElementById("announceTwo");
const restart = document.getElementById("restartButton");

const announceThree = document.getElementById("announceThree");
const announceFour = document.getElementById("announceFour");

// start of game
let gameRunning = true;

//Player scout info
let scoutPlaced = false;
let scoutLocation = 0;
let scoutMoved = 0;
let playerScoutHp = 100;
let playerScoutAlive = true;

//player Tank info
let tankPlaced = false;
let tankLocation = 0;
let tankMoved = 0;
let tankHasShot = 0;
let playerTankHp = 100;
let playerTankAlive = true;

//computer scout info
let computerScoutLocation = 0;
let computerScoutMoved = false;
let computerScoutHp = 100;
let computerScoutAlive = true;
// scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;

//computer tank info
let computerTankHp = 100;
let computerTankLocation = 0;
let computerTankMoved = false;
let computerTankAlive = true;
let computerTankHasShot = 0;
// Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;

//update infor function
function updateInfo() {
  Hpannounce.innerHTML = "Enemy Tank HP: " + computerTankHp;
  scoutHpannounce.innerHTML = "Enemy Scout HP: " + computerScoutHp;
  announceThree.innerHTML = "Player Tank HP: " + playerTankHp;
  announceFour.innerHTML = "Player Tank HP: " + playerScoutHp;
}

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
    playerScoutHp = 100;
    //reset player tank info
    tankPlaced = false;
    tankLocation = 0;
    tankMoved = 0;
    tankHasShot = 0;
    playerTankHp = 100;
    //reset computer scout info
    computerScoutMoved = false;
    computerScoutLocation = 0;
    computerScoutAlive = true;
    computerScoutHp = 100;
    // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
    //reset computer tank info
    computerTankHp = 100;
    computerTankLocation = 0;
    computerTankAlive = true;
    computerTankMoved = false;
    // Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
    updateInfo();
  }
}

//place units
//player places tank
function playerPlaceTank(i) {
  squares[i].className = "placedTank";
  tankPlaced = true;
  // squares[i].innerHTML = "player tank";
  tankLocation = i;
  WhereCanIMove();
}

// computer places tank
function compPlaceTank() {
  let rand = Math.floor(Math.random() * 100);
  if (squares[rand].className == "square") {
    squares[rand].className = "computerTank";
    // squares[rand].innerHTML = "computer tank";
    computerTankLocation = rand;
  } else {
    compPlaceTank();
  }
}

//player places scout
function playerPlaceScout(i) {
  if (squares[i].className == "square") {
    squares[i].className = "placedScout";
    scoutPlaced = true;
    // squares[i].innerHTML = "player scout";
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
    // squares[rand].innerHTML = "computer scout";
    computerScoutLocation = rand;
  } else {
    compPlaceScout();
  }
}

// move and fire units
// player change location of scout
function scoutMove(i) {
  if (canUnitMove(i, scoutLocation) && squares[i].className == "square") {
    squares[scoutLocation].className = "square";
    squares[scoutLocation].innerHTML = "";
    squares[i].className = "placedScout";
    // squares[i].innerHTML = "player scout";
    scoutLocation = i;
    scoutMoved++;
  }
}

function squareHit(i) {
  function removeExplosion() {
    switch (squares[i].className) {
      case "computerTank explosionHit":
        squares[i].className = "computerTank";
        setTimeout(removeExplosion, 500);
        break;
      case "computerScout explosionHit":
        squares[i].className = "computerScout";
        setTimeout(removeExplosion, 500);
        break;
      case "square explosionMiss":
        squares[i].className = "square";
        setTimeout(removeExplosion, 500);
        break;
      case "placedTank explosionHit":
        squares[i].className = "placedTank";
        setTimeout(removeExplosion, 500);
        break;
      case "placedScout explosionHit":
        squares[i].className = "placedScout";
        setTimeout(removeExplosion, 500);
        break;
    }
  }

  switch (squares[i].className) {
    case "computerTank":
      squares[i].className = "computerTank explosionHit";
      setTimeout(removeExplosion, 500);
      break;
    case "computerScout":
      squares[i].className = "computerScout explosionHit";
      setTimeout(removeExplosion, 500);
      break;
    case "square":
      squares[i].className = "square explosionMiss";
      setTimeout(removeExplosion, 500);
      break;
    case "placedTank":
      squares[i].className = "placedTank explosionHit";
      setTimeout(removeExplosion, 500);
      break;
    case "placedScout":
      squares[i].className = "placedScout explosionHit";
      setTimeout(removeExplosion, 500);
      break;
  }
}

// player shoot tank
function tankShoot(i) {
  if (squares[i].className == "computerTank") {
    computerTankHp -= 50;
    // Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
    squareHit(i);
    updateInfo();
    tankAlive(i);
    gameOver();
    tankHasShot++;
  } else if (squares[i].className == "computerScout") {
    computerScoutHp -= 50;
    // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
    squareHit(i);
    updateInfo();
    scoutAlive(i);
    gameOver();
    tankHasShot++;
  } else {
    //could add in effect later
    // squares[i].className = "clicked";
    tankHasShot++;
    squareHit(i);
  }
}

// computer shoot tank
function computerTankShoot() {
  if (computerTankAlive == true) {
    let rand = Math.floor(Math.random() * 100);

    if (squares[rand].className == "placedTank") {
      playerTankHp -= 50;
      // Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
      squareHit(rand);
      updateInfo();
      CheckPlayerTankAlive(rand);
      gameOver();
      computerTankHasShot++;
      setTimeout(CompueterTankMove, 500);
    } else if (squares[rand].className == "placedScout") {
      playerScoutHp -= 50;
      // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
      squareHit(rand);
      updateInfo();
      CheckPlayerScoutAlive(rand);
      gameOver();
      computerTankHasShot++;
      setTimeout(CompueterTankMove, 500);
    } else {
      //could add in effect later
      // squares[rand].className = "clicked";
      squareHit(rand);
      computerTankHasShot++;
      setTimeout(CompueterTankMove, 500);
    }
  } else {
    setTimeout(CompueterTankMove, 500);
  }
}

// change location of tank
function tankMove(i) {
  if (canUnitMove(i, tankLocation)) {
    squares[tankLocation].className = "square";
    squares[tankLocation].innerHTML = "";
    squares[i].className = "placedTank";
    // squares[i].innerHTML = "player tank";
    tankLocation = i;
    tankMoved++;
    clearNearBy();
    WhereCanIMove();
    // computer moves scout then turn is reset
    // is this the best place to put this?
    setTimeout(CompueterScoutMove, 500);
    // setTimeout(CompueterScoutMove, 100);
    // resetMove();
  }
}

//where can i move, and then shoot, and even see...

function clearNearBy() {
  for (let i = 0; i < squares.length; i++) {
    // return;
    if (squares[i].className == "nearBy") {
      squares[i].className = "square";
    }
  }
}

function WhereCanIMove() {
  if ((tankLocation + 1) % 10 == 0) {
    for (let i = 0; i < squares.length; i++) {
      if (
        i == tankLocation - 1 ||
        i == tankLocation + 10 ||
        i == tankLocation - 10 ||
        i == tankLocation + 9 ||
        i == tankLocation - 11
      ) {
        squares[i].className = "nearBy";
      }
    }
  } else if (tankLocation % 10 == 0) {
    for (let i = 0; i < squares.length; i++) {
      if (
        i == tankLocation + 1 ||
        i == tankLocation + 10 ||
        i == tankLocation - 10 ||
        i == tankLocation + 11 ||
        i == tankLocation - 9
      ) {
        squares[i].className = "nearBy";
      }
    }
  } else {
    for (let i = 0; i < squares.length; i++) {
      if (
        (i == tankLocation + 1 ||
          i == tankLocation - 1 ||
          i == tankLocation + 10 ||
          i == tankLocation - 10 ||
          i == tankLocation + 11 ||
          i == tankLocation + 9 ||
          i == tankLocation - 11 ||
          i == tankLocation - 9) &&
        squares[i].className == "square"
      ) {
        squares[i].className = "nearBy";
      }
    }
  }

  // if ((tankLocation + 1) % 10 == 0) {
  //     const optionOne = [-1, 10, -10, 9, -11];
  // }

  // else if (tankLocation % 10 == 0) {
  //     const optionTwo = [1, 10, -10, 11, -9];
  // } else {
  //     const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
  // }
}

//computer scout move
function CompueterScoutMove() {
  if (computerScoutAlive == true) {
    let moveChoiceNumber = 0;
    // set movement options depending on unit location and get choice
    if ((computerScoutLocation + 1) % 10 == 0) {
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
    if (moveChoice >= 0 && moveChoice <= 99) {
      if (squares[moveChoice].className == "square") {
        squares[computerScoutLocation].className = "square";
        squares[computerScoutLocation].innerHTML = "";
        squares[moveChoice].className = "computerScout";
        // squares[moveChoice].innerHTML = "computer scout";
        computerScoutLocation = moveChoice;
        setTimeout(computerTankShoot, 500);
      } else {
        CompueterScoutMove();
      }
    } else {
      CompueterScoutMove();
    }
  } else {
    computerTankShoot();
  }
}

//computer tank move
function CompueterTankMove() {
  if (computerTankAlive == true) {
    let moveChoiceNumber = 0;
    // set movement options depending on unit location and get choice
    if ((computerTankLocation + 1) % 10 == 0) {
      const optionOne = [-1, 10, -10, 9, -11];
      var index = Math.floor(Math.random() * optionOne.length);
      moveChoiceNumber = optionOne[index];
    } else if (computerTankLocation % 10 == 0) {
      const optionTwo = [1, 10, -10, 11, -9];
      var index = Math.floor(Math.random() * optionTwo.length);
      moveChoiceNumber = optionTwo[index];
    } else {
      const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
      var index = Math.floor(Math.random() * optionThree.length);
      moveChoiceNumber = optionThree[index];
    }
    //detemine movement choice
    let moveChoice = computerTankLocation + moveChoiceNumber;
    // check move is possible
    if (moveChoice >= 0 && moveChoice <= 99) {
      if (squares[moveChoice].className == "square") {
        squares[computerTankLocation].className = "square";
        squares[computerTankLocation].innerHTML = "";
        squares[moveChoice].className = "computerTank";
        // squares[moveChoice].innerHTML = "computer tank";
        computerTankLocation = moveChoice;
        resetMove();
      } else {
        CompueterTankMove();
      }
    } else {
      CompueterTankMove();
    }
  } else {
    resetMove();
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
  }
}

//check enemy tank is alive
function tankAlive(i) {
  if (computerTankHp <= 0) {
    Hpannounce.innerHTML = "Tank HP: Tank is dead!";
    squares[i].className = "square";
    squares[i].innerHTML = "";
    computerTankAlive = false;
  }
}

//check enemy scout is alive
function scoutAlive(i) {
  if (computerScoutHp <= 0) {
    scoutHpannounce.innerHTML = "Scout HP: Scout is dead!";
    squares[i].className = "square";
    squares[i].innerHTML = "";
    computerScoutAlive = false;
  }
}

//check player tank is alive
function CheckPlayerTankAlive(i) {
  if (playerTankHp <= 0) {
    announceThree.innerHTML = "Player Tank HP: Tank is dead!";
    squares[i].className = "square";
    squares[i].innerHTML = "";
    playerTankAlive = false;
  }
}

//check player scout is alive
function CheckPlayerScoutAlive(i) {
  if (playerScoutHp <= 0) {
    announceFour.innerHTML = "Player Scout HP: Scout is dead!";
    squares[i].className = "square";
    squares[i].innerHTML = "";
    playerScoutAlive = false;
  }
}

//check for game over
function gameOver() {
  if (computerScoutHp <= 0 && computerTankHp <= 0) {
    scoutHpannounce.innerHTML = "Scout HP: Scout is dead! - GAME OVER DUDE!";
    gameRunning = false;
  }
}

//display info before game begins
updateInfo();

// game loop
for (let i = 0; i < squares.length; i++) {
  squares[i].onclick = () => {
    if (gameRunning == true) {
      if (tankPlaced == false) {
        playerPlaceTank(i);
        setTimeout(compPlaceTank, 100);
      } else if (scoutPlaced == false) {
        playerPlaceScout(i);
        setTimeout(compPlaceScout, 100);
      } else if (scoutMoved < 0) {
        scoutMove(i);
      } else if (tankHasShot < 1) {
        tankShoot(i);
      } else if (tankMoved < 1) {
        tankMove(i);
        // yes, they are called from inside the computer moves as
        // if we did it here we would need another click
        // also, up there it comes in sequence, not in one go
        // setTimeout(CompueterScoutMove, 500);
        // setTimeout(CompueterTankMove, 500);
        // resetMove();
      }
      // this is not actually being called, it is called above, could change...
      // else {
      //     CompueterScoutMove();
      // }
    }
    // else {
    //     return;
    // }
  };
}
