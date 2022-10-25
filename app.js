//collect some html
const squares = document.querySelectorAll(".square");
const Hpannounce = document.getElementById("announce");
// const notes = document.getElementById("notes");
// const scoutHpannounce = document.getElementById("announceTwo");
const restart = document.getElementById("restartButton");
const start = document.getElementById("playButton");
const howTo = document.getElementById("howTo");
const howToPlayInstructions = document.getElementById("howToPlayInstructions");
const exitInstructions = document.getElementById("exitInstructions");
const menuGameButton = document.getElementById("menuGameButton");

// const announceThree = document.getElementById("announceThree");
// const announceFour = document.getElementById("announceFour");

// start of game
let gameRunning = false;

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
let playerTankHp = 50;
let playerTankAlive = true;
let playerTankLastKnownLocation = 0;

//computer scout info
let computerScoutLocation = 0;
let computerScoutMoved = false;
let computerScoutHp = 100;
let computerScoutAlive = true;
// scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;

//computer tank info
let computerTankHp = 50;
let computerTankLocation = 0;
let computerTankMoved = false;
let computerTankAlive = true;
let computerTankHasShot = 0;
// Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;

//update infor function
function updateInfo() {
  // Hpannounce.innerHTML = "Enemy Tank HP: " + computerTankHp;
  // scoutHpannounce.innerHTML = "Enemy Scout HP: " + computerScoutHp;
  // announceThree.innerHTML = "Player Tank HP: " + playerTankHp;
  // announceFour.innerHTML = "Player Tank HP: " + playerScoutHp;
  // notes.innerHTML = "info: ";
}

//main menu buttons
start.addEventListener("click", playFunc);

howTo.addEventListener("click", function () {
  howToPlayInstructions.style.display = "inline";
});

exitInstructions.addEventListener("click", function () {
  howToPlayInstructions.style.display = "none";
});

menuGameButton.addEventListener("click", function () {
  gameRunning = false;
  start.style.display = "inline";
  start.innerHTML = "Resume";
  howTo.style.display = "inline";
  document.getElementById("restartDiv").style.display = "inline";
  document.getElementById("restartDiv").style.top = "375px";
});

function playFunc() {
  gameRunning = true;
  start.style.display = "none";
  howTo.style.display = "none";
  menuGameButton.style.display = "inline";
  document.getElementById("headingsText").innerHTML =
    "select artillery starting location";
  document.getElementById("restartDiv").style.display = "none";
}

//restart game function
restart.addEventListener("click", function () {
  restart.innerHTML = "Restarting...";
  if (computerTankAlive == false || playerTankAlive == false) {
    restartFunc();
  } else {
    setTimeout(restartFunc, 3000);
  }
});

function restartFunc() {
  //resart game
  gameRunning = true;
  //reset squares
  start.style.display = "none";
  howTo.style.display = "none";
  document.getElementById("restartDiv").style.display = "none";
  document.getElementById("headingsText").innerHTML =
    "select artillery starting location";
  for (let i = 0; i < squares.length; i++) {
    squares[i].className = "square";
    // squares[i].innerHTML = "";
    //reset player scout info
  }
  scoutPlaced = false;
  scoutLocation = 0;
  scoutMoved = 0;
  playerScoutHp = 100;
  //reset player tank info
  tankPlaced = false;
  tankLocation = 0;
  tankMoved = 0;
  tankHasShot = 0;
  playerTankHp = 50;
  playerTankAlive = true;
  //reset computer scout info
  computerScoutMoved = false;
  computerScoutLocation = 0;
  computerScoutAlive = true;
  computerScoutHp = 100;
  // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
  //reset computer tank info
  computerTankHp = 50;
  computerTankLocation = 0;
  computerTankAlive = true;
  computerTankMoved = false;
  // Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
  // // updateInfo();
  var e = document.getElementsByClassName("square");
  for (var x = 0; x < e.length; x++) {
    e[x].style.cursor = "";
  }
  restart.innerHTML = "Restart";
}

//place units
//player places tank
function playerPlaceTank(i) {
  squares[i].className = "placedTank";
  tankPlaced = true;
  // squares[i].innerHTML = "player tank";
  tankLocation = i;
  // WhereCanIMove();
  playerTankLastKnownLocation = i;
}

// computer places tank
function compPlaceTank() {
  if (tankLocation <= 50) {
    const optionsList = [+31, +37, +42, +45, +47];
    var index = Math.floor(Math.random() * optionsList.length);
    tankPlacementChoiceNumber = optionsList[index];
    placementAttempt = tankLocation + tankPlacementChoiceNumber;
  } else if (tankLocation > 50) {
    const optionsList = [-31, -37, -42, -45, -47];
    var index = Math.floor(Math.random() * optionsList.length);
    tankPlacementChoiceNumber = optionsList[index];
    placementAttempt = tankLocation + tankPlacementChoiceNumber;
  }

  if (
    0 <= placementAttempt <= 99 &&
    squares[placementAttempt].className == "square"
  ) {
    computerTankLocation = placementAttempt;
    document.getElementById("headingsText").innerHTML =
      "select scout starting location";
    document.getElementById("headingsText").id = "headingsTextTwo";
    document.getElementById("headingsTextTwo").id = "headingsText";
  } else {
    compPlaceTank();
  }

  // let rand = Math.floor(Math.random() * 100);
  // if (squares[rand].className == "square") {
  //   // squares[rand].className = "computerTank";
  //   // squares[rand].innerHTML = "computer tank";
  //   computerTankLocation = rand;
  // } else {
  //   compPlaceTank();
  // }
}

//player places scout
function playerPlaceScout(i) {
  if (squares[i].className == "square" && i != computerTankLocation) {
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
  // notes.innerHTML = "we got here";

  if (tankLocation <= 50) {
    const optionsList = [+31, +37, +42, +45, +47];
    var index = Math.floor(Math.random() * optionsList.length);
    tankPlacementChoiceNumber = optionsList[index];
    placementAttempt = tankLocation + tankPlacementChoiceNumber;
  } else if (tankLocation > 50) {
    const optionsList = [-31, -37, -42, -45, -47];
    var index = Math.floor(Math.random() * optionsList.length);
    tankPlacementChoiceNumber = optionsList[index];
    placementAttempt = tankLocation + tankPlacementChoiceNumber;
  }

  // const optionsList = [
  //   +32, +35, +37, +41, +53, +69, -32, -35, -37, -41, -53, -69,
  // ];
  // var index = Math.floor(Math.random() * optionsList.length);
  // scoutPlacementChoiceNumber = optionsList[index];
  // let placementAttempt = tankLocation + scoutPlacementChoiceNumber;
  // notes.innerHTML = tankPlacementChoiceNumber + " " + placementAttempt;

  if (0 <= placementAttempt <= 99) {
    if (squares[placementAttempt].className == "square") {
      // notes.innerHTML = "we also got here";
      computerScoutLocation = placementAttempt;
      squares[computerScoutLocation].className = "computerScout";
      WhereCanIMoveScout();
      revealArtillery();
      tankRevealArtillery();
      document.getElementById("headingsText").innerHTML = "move scout";
    } else {
      // notes.innerHTML = "we didnt even get here";
      compPlaceScout();
    }
  } else {
    compPlaceScout();
  }

  // let rand = Math.floor(Math.random() * 100);
  // if (squares[rand].className == "square") {
  //   squares[rand].className = "computerScout";
  //   // squares[rand].innerHTML = "computer scout";
  //   computerScoutLocation = rand;
  //   WhereCanIMoveScout();
  //   revealArtillery();
  //   tankRevealArtillery();
  // } else {
  //   compPlaceScout();
  // }
}

function crosshairCursorOn() {
  var e = document.getElementsByClassName("square");
  for (var x = 0; x < e.length; x++) {
    e[x].style.cursor = 'url("images/crosshair50.png")25 25, move';
  }

  var e = document.getElementsByClassName("computerTank");
  for (var x = 0; x < e.length; x++) {
    e[x].style.cursor = 'url("images/crosshair50.png")25 25, move';
  }

  var e = document.getElementsByClassName("computerScout");
  for (var x = 0; x < e.length; x++) {
    e[x].style.cursor = 'url("images/crosshair50.png")25 25, move';
  }
}

function crosshairCursorOff() {
  var e = document.getElementsByClassName("square");
  for (var x = 0; x < e.length; x++) {
    e[x].style.cursor = "";
  }

  var e = document.getElementsByClassName("computerTank");
  for (var x = 0; x < e.length; x++) {
    e[x].style.cursor = "";
  }

  var e = document.getElementsByClassName("computerScout");
  for (var x = 0; x < e.length; x++) {
    e[x].style.cursor = "";
  }
}

// move and fire units
// player change location of scout
function scoutMove(i) {
  function completeTurn() {
    // Hpannounce.innerHTML = computerTankLocation;
    squares[scoutLocation].className = "square";
    // squares[scoutLocation].innerHTML = "";
    squares[i].className = "placedScout";
    // squares[i].innerHTML = "player scout";
    scoutLocation = i;
    scoutMoved++;
    // notes.innerHTML = "info: Fire artillery!";
    clearNearBy();
    revealArtillery();
    crosshairCursorOn();
    document.getElementById("headingsText").innerHTML = "fire artillery";
  }

  if (canUnitMove(i, scoutLocation) == -1 && squares[i].className == "nearBy") {
    squares[scoutLocation].className = "transL";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, scoutLocation) == +1 &&
    squares[i].className == "nearBy"
  ) {
    squares[scoutLocation].className = "transR";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, scoutLocation) == -10 &&
    squares[i].className == "nearBy"
  ) {
    squares[scoutLocation].className = "transU";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, scoutLocation) == -9 &&
    squares[i].className == "nearBy"
  ) {
    squares[scoutLocation].className = "transUR";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, scoutLocation) == -11 &&
    squares[i].className == "nearBy"
  ) {
    squares[scoutLocation].className = "transUL";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, scoutLocation) == +10 &&
    squares[i].className == "nearBy"
  ) {
    squares[scoutLocation].className = "transD";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, scoutLocation) == +11 &&
    squares[i].className == "nearBy"
  ) {
    squares[scoutLocation].className = "transDR";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, scoutLocation) == +9 &&
    squares[i].className == "nearBy"
  ) {
    squares[scoutLocation].className = "transDL";
    setTimeout(completeTurn, 1000);
  }
}

// player change location of artillery
function tankMove(i) {
  function completeTurn() {
    squares[tankLocation].className = "square";
    playerTankLastKnownLocation = tankLocation;
    // squares[tankLocation].innerHTML = "";
    squares[i].className = "placedTank";
    // squares[i].innerHTML = "player scout";
    tankLocation = i;
    tankMoved++;
    // notes.innerHTML = "info: Fire artillery!";
    clearNearBy();
    tankRevealArtillery();
    document.getElementById("headingsText").innerHTML = "computer turn";
    setTimeout(CompueterScoutMove, 500);
  }

  if (canUnitMove(i, tankLocation) == -1 && squares[i].className == "nearBy") {
    squares[tankLocation].className = "transLTank";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, tankLocation) == +1 &&
    squares[i].className == "nearBy"
  ) {
    squares[tankLocation].className = "transRTank";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, tankLocation) == -10 &&
    squares[i].className == "nearBy"
  ) {
    squares[tankLocation].className = "transUTank";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, tankLocation) == -9 &&
    squares[i].className == "nearBy"
  ) {
    squares[tankLocation].className = "transURTank";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, tankLocation) == -11 &&
    squares[i].className == "nearBy"
  ) {
    squares[tankLocation].className = "transULTank";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, tankLocation) == +10 &&
    squares[i].className == "nearBy"
  ) {
    squares[tankLocation].className = "transDTank";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, tankLocation) == +11 &&
    squares[i].className == "nearBy"
  ) {
    squares[tankLocation].className = "transDRTank";
    setTimeout(completeTurn, 1000);
  } else if (
    canUnitMove(i, tankLocation) == +9 &&
    squares[i].className == "nearBy"
  ) {
    squares[tankLocation].className = "transDLTank";
    setTimeout(completeTurn, 1000);
  }
}

function squareHit(i) {
  function removeExplosion() {
    if (computerTankAlive == false) {
      squares[i].className = "computerTank explosionHit";
    } else if (playerTankAlive == false) {
      squares[i].className = "placedTank explosionHitPlayerUnits";
    } else {
      switch (squares[i].className) {
        case "computerTank explosionHit":
          squares[i].className = "computerTank";
          break;
        case "computerScout explosionHit":
          squares[i].className = "computerScout";
          break;
        case "square explosionMiss":
          squares[i].className = "square";
          break;
        case "placedTank explosionHitPlayerUnits":
          squares[i].className = "placedTank";
          break;
        case "placedScout explosionHitPlayerUnits":
          squares[i].className = "placedScout";
          break;
      }
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
      squares[i].className = "placedTank explosionHitPlayerUnits";
      setTimeout(removeExplosion, 500);
      break;
    case "placedScout":
      squares[i].className = "placedScout explosionHitPlayerUnits";
      setTimeout(removeExplosion, 500);
      break;
  }

  function removeHiddenTankExplosion() {
    squares[i].className = "square";
  }

  if (i == computerTankLocation) {
    squares[i].className = "computerTank explosionHit";
    setTimeout(removeHiddenTankExplosion, 500);
  }
}

// player shoot tank
function tankShoot(i) {
  // Hpannounce.innerHTML = computerTankLocation;
  if (squares[i].className == "computerTank") {
    gameRunning = false;
    computerTankHp -= 50;
    squareHit(i);
    // updateInfo();
    tankAlive(i);
    crosshairCursorOff();
    tankHasShot++;
    // notes.innerHTML = "info: ";
    if (gameOver()) {
      document.getElementById("headingsText").innerHTML =
        "artillery destroyed - You win!";
    } else {
      document.getElementById("headingsText").innerHTML = "move artillery";
      setTimeout(WhereCanIMove, 500);
    }
  } else if (squares[i].className == "computerScout") {
    gameRunning = false;
    computerScoutHp -= 50;
    // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
    squareHit(i);
    // updateInfo();
    // scoutAlive(i);

    crosshairCursorOff();
    document.getElementById("headingsText").innerHTML = "move artillery";
    tankHasShot++;
    // notes.innerHTML = "info: ";
    if (gameOver()) {
      document.getElementById("headingsText").innerHTML =
        "artillery destroyed - You win!";
    } else {
      document.getElementById("headingsText").innerHTML = "move artillery";
      setTimeout(WhereCanIMove, 500);
    }
  } else if (i == computerTankLocation) {
    gameRunning = false;
    computerTankHp -= 50;
    // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
    squareHit(i);
    // updateInfo();
    // scoutAlive(i);
    crosshairCursorOff();
    document.getElementById("headingsText").innerHTML = "you hit the tank!";
    tankHasShot++;
    // notes.innerHTML = "info: ";
    if (gameOver()) {
      document.getElementById("headingsText").innerHTML =
        "artillery destroyed - You win!";
    } else {
      document.getElementById("headingsText").innerHTML = "move artillery";
      setTimeout(WhereCanIMove, 500);
    }
  } else {
    gameRunning = false;
    //could add in effect later
    // squares[i].className = "clicked";
    tankHasShot++;
    squareHit(i);
    crosshairCursorOff();
    document.getElementById("headingsText").innerHTML = "move artillery";
    // notes.innerHTML = "info: ";
    setTimeout(WhereCanIMove, 500);
  }
}

function computerTankShoot() {
  if (computerTankAlive == true) {
    squares[computerTankLocation].className = "computerTank";

    if ((playerTankLastKnownLocation + 1) % 10 == 0) {
      const optionOne = [-1, 10, -10, 9, -11];
      var index = Math.floor(Math.random() * optionOne.length);
      attackChoiceNumber = optionOne[index];
    } else if (playerTankLastKnownLocation % 10 == 0) {
      const optionTwo = [1, 10, -10, 11, -9];
      var index = Math.floor(Math.random() * optionTwo.length);
      attackChoiceNumber = optionTwo[index];
    } else {
      const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
      var index = Math.floor(Math.random() * optionThree.length);
      attackChoiceNumber = optionThree[index];
    }

    let attackChoice = playerTankLastKnownLocation + attackChoiceNumber;

    if (attackChoice >= 0 && attackChoice <= 99 && attackChoice != computerTankLocation && attackChoice != computerScoutLocation) {
      if (squares[attackChoice].className == "placedTank") {
        playerTankHp -= 50;
        // Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
        squareHit(attackChoice);
        // updateInfo();
        CheckPlayerTankAlive(attackChoice);
        if (gameOver()) {
          document.getElementById("headingsText").innerHTML =
            "artillery destroyed - You lose!";
        }
        computerTankHasShot++;
        setTimeout(CompueterTankMove, 500);
      } else if (squares[attackChoice].className == "placedScout") {
        playerScoutHp -= 50;
        // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
        squareHit(attackChoice);
        // updateInfo();
        CheckPlayerScoutAlive(attackChoice);
        if (gameOver()) {
          document.getElementById("headingsText").innerHTML =
            "artillery destroyed - You lose!";
        }
        computerTankHasShot++;
        setTimeout(CompueterTankMove, 500);
      } else {
        //could add in effect later
        // squares[rand].className = "clicked";
        squareHit(attackChoice);
        computerTankHasShot++;
        setTimeout(CompueterTankMove, 500);
      }
    } else {
      computerTankShoot();
    }
  } else {
    setTimeout(CompueterTankMove, 500);
  }
}

// // note to help with computer tank shoot
// if ((playerTankLastKnownLocation + 1) % 10 == 0) {

//   function CompueterTankMove() {
//     if (computerTankAlive == true) {
//       let moveChoiceNumber = 0;
//       // set movement options depending on unit location and get choice
//       if ((computerTankLocation + 1) % 10 == 0) {
//         const optionOne = [-1, 10, -10, 9, -11];
//         var index = Math.floor(Math.random() * optionOne.length);
//         moveChoiceNumber = optionOne[index];
//       } else if (computerTankLocation % 10 == 0) {
//         const optionTwo = [1, 10, -10, 11, -9];
//         var index = Math.floor(Math.random() * optionTwo.length);
//         moveChoiceNumber = optionTwo[index];
//       } else {
//         const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
//         var index = Math.floor(Math.random() * optionThree.length);
//         moveChoiceNumber = optionThree[index];
//       }
//       //detemine movement choice
//       let moveChoice = computerTankLocation + moveChoiceNumber;
//       // check move is possible
//       if (
//         moveChoice >= 0 &&
//         moveChoice <= 99 &&
//         squares[moveChoice].className == "square" &&
//         moveChoice != computerScoutLocation
//       ) {
//         // Hpannounce.innerHTML =
//         // moveChoice + " " + tankLocation + " " + scoutLocation;
//         // scoutHpannounce.innerHTML = "i ran";
//         // announceThree.innerHTML = "Player Tank HP: " + playerTankHp;
//         // announceFour.innerHTML = "Player Tank HP: " + playerScoutHp;
//         // notes.innerHTML = "info: ";

//         squares[computerTankLocation].className = "square";
//         // squares[computerTankLocation].innerHTML = "";
//         //

//         // WTF when the below is on it doesnt do it...
//         // squares[moveChoice].className = "computerTank";
//         // squares[moveChoice].innerHTML = "computer tank";
//         computerTankLocation = moveChoice;
//         // announceThree.innerHTML = computerTankLocation;

//         WhereCanIMoveScout();
//         revealArtillery();
//         tankRevealArtillery();
//         resetMove();
//         document.getElementById("headingsText").innerHTML = "move scout";
//       } else {
//         CompueterTankMove();
//       }
//     } else {
//       resetMove();
//     }
//   }

// // computer shoot tank
// function computerTankShoot() {
//   if (computerTankAlive == true) {
//     squares[computerTankLocation].className = "computerTank";

//     let rand = Math.floor(Math.random() * 100);

//     if (squares[rand].className == "placedTank") {
//       playerTankHp -= 50;
//       // Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
//       squareHit(rand);
//       // updateInfo();
//       CheckPlayerTankAlive(rand);
//       gameOver();
//       computerTankHasShot++;
//       setTimeout(CompueterTankMove, 500);
//     } else if (squares[rand].className == "placedScout") {
//       playerScoutHp -= 50;
//       // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
//       squareHit(rand);
//       // updateInfo();
//       CheckPlayerScoutAlive(rand);
//       gameOver();
//       computerTankHasShot++;
//       setTimeout(CompueterTankMove, 500);
//     } else {
//       //could add in effect later
//       // squares[rand].className = "clicked";
//       squareHit(rand);
//       computerTankHasShot++;
//       setTimeout(CompueterTankMove, 500);
//     }
//   } else {
//     setTimeout(CompueterTankMove, 500);
//   }
// }

// // computer shoot tank
// function computerTankShoot() {
//   if (computerTankAlive == true) {
//     squares[computerTankLocation].className = "computerTank";

//     let rand = Math.floor(Math.random() * 100);

//     if (squares[rand].className == "placedTank") {
//       playerTankHp -= 50;
//       // Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;
//       squareHit(rand);
//       // updateInfo();
//       CheckPlayerTankAlive(rand);
//       gameOver();
//       computerTankHasShot++;
//       setTimeout(CompueterTankMove, 500);
//     } else if (squares[rand].className == "placedScout") {
//       playerScoutHp -= 50;
//       // scoutHpannounce.innerHTML = "Scout HP: "+ computerScoutHp;
//       squareHit(rand);
//       // updateInfo();
//       CheckPlayerScoutAlive(rand);
//       gameOver();
//       computerTankHasShot++;
//       setTimeout(CompueterTankMove, 500);
//     } else {
//       //could add in effect later
//       // squares[rand].className = "clicked";
//       squareHit(rand);
//       computerTankHasShot++;
//       setTimeout(CompueterTankMove, 500);
//     }
//   } else {
//     setTimeout(CompueterTankMove, 500);
//   }
// }

// // change location of tank
// function tankMove(i) {
//   if (canUnitMove(i, tankLocation) && squares[i].className == "nearBy") {
//     squares[tankLocation].className = "square";
//     squares[tankLocation].innerHTML = "";
//     squares[i].className = "placedTank";
//     // squares[i].innerHTML = "player tank";
//     tankLocation = i;
//     tankMoved++;
//     clearNearBy();
//     tankRevealArtillery();

//     // WhereCanIMove();
//     // computer moves scout then turn is reset
//     // is this the best place to put this?
//     setTimeout(CompueterScoutMove, 500);
//     // setTimeout(CompueterScoutMove, 100);
//     // resetMove();
//   }
// }

//where can i move, and then shoot, and even see...

function revealArtillery() {
  // notes.innerHTML = "reveal ran";
  if ((scoutLocation + 1) % 10 == 0) {
    // notes.innerHTML = "reveal ran1";
    if (scoutLocation - 1 == computerTankLocation) {
      squares[scoutLocation - 1].className = "computerTank";
    } else if (scoutLocation + 10 == computerTankLocation) {
      squares[scoutLocation + 10].className = "computerTank";
    } else if (scoutLocation - 10 == computerTankLocation) {
      squares[scoutLocation - 10].className = "computerTank";
    } else if (scoutLocation + 9 == computerTankLocation) {
      squares[scoutLocation + 9].className = "computerTank";
    } else if (scoutLocation - 11 == computerTankLocation) {
      squares[scoutLocation - 11].className = "computerTank";
    }
  } else if (scoutLocation % 10 == 0) {
    // notes.innerHTML = "reveal ran2";
    if (scoutLocation + 1 == computerTankLocation) {
      squares[scoutLocation + 1].className = "computerTank";
    } else if (scoutLocation + 10 == computerTankLocation) {
      squares[scoutLocation + 10].className = "computerTank";
    } else if (scoutLocation - 10 == computerTankLocation) {
      squares[scoutLocation - 10].className = "computerTank";
    } else if (scoutLocation + 11 == computerTankLocation) {
      squares[scoutLocation + 11].className = "computerTank";
    } else if (scoutLocation - 9 == computerTankLocation) {
      squares[scoutLocation - 9].className = "computerTank";
    }
  } else {
    // notes.innerHTML = "reveal ran3";
    if (scoutLocation + 1 == computerTankLocation) {
      squares[scoutLocation + 1].className = "computerTank";
    } else if (scoutLocation - 1 == computerTankLocation) {
      squares[scoutLocation - 1].className = "computerTank";
    } else if (scoutLocation + 10 == computerTankLocation) {
      squares[scoutLocation + 10].className = "computerTank";
    } else if (scoutLocation - 10 == computerTankLocation) {
      squares[scoutLocation - 10].className = "computerTank";
    } else if (scoutLocation + 11 == computerTankLocation) {
      squares[scoutLocation + 11].className = "computerTank";
    } else if (scoutLocation + 9 == computerTankLocation) {
      squares[scoutLocation + 9].className = "computerTank";
    } else if (scoutLocation - 11 == computerTankLocation) {
      squares[scoutLocation - 11].className = "computerTank";
    } else if (scoutLocation - 9 == computerTankLocation) {
      squares[scoutLocation - 9].className = "computerTank";
    }
  }
}

function tankRevealArtillery() {
  // notes.innerHTML = "reveal ran";
  if ((tankLocation + 1) % 10 == 0) {
    // notes.innerHTML = "reveal ran1";
    if (tankLocation - 1 == computerTankLocation) {
      squares[tankLocation - 1].className = "computerTank";
    } else if (tankLocation + 10 == computerTankLocation) {
      squares[tankLocation + 10].className = "computerTank";
    } else if (tankLocation - 10 == computerTankLocation) {
      squares[tankLocation - 10].className = "computerTank";
    } else if (tankLocation + 9 == computerTankLocation) {
      squares[tankLocation + 9].className = "computerTank";
    } else if (tankLocation - 11 == computerTankLocation) {
      squares[tankLocation - 11].className = "computerTank";
    }
  } else if (tankLocation % 10 == 0) {
    // notes.innerHTML = "reveal ran2";
    if (tankLocation + 1 == computerTankLocation) {
      squares[tankLocation + 1].className = "computerTank";
    } else if (tankLocation + 10 == computerTankLocation) {
      squares[tankLocation + 10].className = "computerTank";
    } else if (tankLocation - 10 == computerTankLocation) {
      squares[tankLocation - 10].className = "computerTank";
    } else if (tankLocation + 11 == computerTankLocation) {
      squares[tankLocation + 11].className = "computerTank";
    } else if (tankLocation - 9 == computerTankLocation) {
      squares[tankLocation - 9].className = "computerTank";
    }
  } else {
    // notes.innerHTML = "reveal ran3";
    if (tankLocation + 1 == computerTankLocation) {
      squares[tankLocation + 1].className = "computerTank";
    } else if (tankLocation - 1 == computerTankLocation) {
      squares[tankLocation - 1].className = "computerTank";
    } else if (tankLocation + 10 == computerTankLocation) {
      squares[tankLocation + 10].className = "computerTank";
    } else if (tankLocation - 10 == computerTankLocation) {
      squares[tankLocation - 10].className = "computerTank";
    } else if (tankLocation + 11 == computerTankLocation) {
      squares[tankLocation + 11].className = "computerTank";
    } else if (tankLocation + 9 == computerTankLocation) {
      squares[tankLocation + 9].className = "computerTank";
    } else if (tankLocation - 11 == computerTankLocation) {
      squares[tankLocation - 11].className = "computerTank";
    } else if (tankLocation - 9 == computerTankLocation) {
      squares[tankLocation - 9].className = "computerTank";
    }
  }
}

function clearNearBy() {
  for (let i = 0; i < squares.length; i++) {
    // return;
    if (squares[i].className == "nearBy") {
      squares[i].className = "square";
    }
  }
}

function WhereCanIMoveScout() {
  if ((scoutLocation + 1) % 10 == 0) {
    for (let i = 0; i < squares.length; i++) {
      if (
        (i == scoutLocation - 1 ||
          i == scoutLocation + 10 ||
          i == scoutLocation - 10 ||
          i == scoutLocation + 9 ||
          i == scoutLocation - 11) &&
        squares[i].className == "square"
      ) {
        squares[i].className = "nearBy";
      }
    }
  } else if (scoutLocation % 10 == 0) {
    for (let i = 0; i < squares.length; i++) {
      if (
        (i == scoutLocation + 1 ||
          i == scoutLocation + 10 ||
          i == scoutLocation - 10 ||
          i == scoutLocation + 11 ||
          i == scoutLocation - 9) &&
        squares[i].className == "square"
      ) {
        squares[i].className = "nearBy";
      }
    }
  } else {
    for (let i = 0; i < squares.length; i++) {
      if (
        (i == scoutLocation + 1 ||
          i == scoutLocation - 1 ||
          i == scoutLocation + 10 ||
          i == scoutLocation - 10 ||
          i == scoutLocation + 11 ||
          i == scoutLocation + 9 ||
          i == scoutLocation - 11 ||
          i == scoutLocation - 9) &&
        squares[i].className == "square"
      ) {
        squares[i].className = "nearBy";
      }
    }
  }
  gameRunning = true;
  gameOver();

  // if ((tankLocation + 1) % 10 == 0) {
  //     const optionOne = [-1, 10, -10, 9, -11];
  // }

  // else if (tankLocation % 10 == 0) {
  //     const optionTwo = [1, 10, -10, 11, -9];
  // } else {
  //     const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
  // }
}

function WhereCanIMove() {
  if ((tankLocation + 1) % 10 == 0) {
    for (let i = 0; i < squares.length; i++) {
      if (
        (i == tankLocation - 1 ||
          i == tankLocation + 10 ||
          i == tankLocation - 10 ||
          i == tankLocation + 9 ||
          i == tankLocation - 11) &&
        squares[i].className == "square"
      ) {
        squares[i].className = "nearBy";
      }
    }
  } else if (tankLocation % 10 == 0) {
    for (let i = 0; i < squares.length; i++) {
      if (
        (i == tankLocation + 1 ||
          i == tankLocation + 10 ||
          i == tankLocation - 10 ||
          i == tankLocation + 11 ||
          i == tankLocation - 9) &&
        squares[i].className == "square"
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
  gameRunning = true;
  gameOver();

  // if ((tankLocation + 1) % 10 == 0) {
  //     const optionOne = [-1, 10, -10, 9, -11];
  // }

  // else if (tankLocation % 10 == 0) {
  //     const optionTwo = [1, 10, -10, 11, -9];
  // } else {
  //     const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
  // }
}

// computer scout move
function CompueterScoutMove() {
  if (computerScoutAlive == true) {
    function completeTurn() {
      squares[computerScoutLocation].className = "square";
      squares[moveChoice].className = "computerScout";
      setTimeout(computerTankShoot, 500);
      computerScoutLocation = moveChoice;
    }

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
      if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == -1
      ) {
        squares[computerScoutLocation].className = "transLCS";
        setTimeout(completeTurn, 1000);
      } else if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == +1
      ) {
        squares[computerScoutLocation].className = "transRCS";
        setTimeout(completeTurn, 1000);
      } else if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == -10
      ) {
        squares[computerScoutLocation].className = "transUCS";
        setTimeout(completeTurn, 1000);
      } else if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == -9
      ) {
        squares[computerScoutLocation].className = "transURCS";
        setTimeout(completeTurn, 1000);
      } else if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == -11
      ) {
        squares[computerScoutLocation].className = "transULCS";
        setTimeout(completeTurn, 1000);
      } else if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == +10
      ) {
        squares[computerScoutLocation].className = "transDCS";
        setTimeout(completeTurn, 1000);
      } else if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == +11
      ) {
        squares[computerScoutLocation].className = "transDRCS";
        setTimeout(completeTurn, 1000);
      } else if (
        squares[moveChoice].className == "square" &&
        moveChoice != computerTankLocation &&
        moveChoiceNumber == +9
      ) {
        squares[computerScoutLocation].className = "transDLCS";
        setTimeout(completeTurn, 1000);
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

// //computer scout move
// function CompueterScoutMove() {
//   if (computerScoutAlive == true) {
//     let moveChoiceNumber = 0;
//     // set movement options depending on unit location and get choice
//     if ((computerScoutLocation + 1) % 10 == 0) {
//       const optionOne = [-1, 10, -10, 9, -11];
//       var index = Math.floor(Math.random() * optionOne.length);
//       moveChoiceNumber = optionOne[index];
//     } else if (computerScoutLocation % 10 == 0) {
//       const optionTwo = [1, 10, -10, 11, -9];
//       var index = Math.floor(Math.random() * optionTwo.length);
//       moveChoiceNumber = optionTwo[index];
//     } else {
//       const optionThree = [1, -1, 10, -10, 11, 9, -11, -9];
//       var index = Math.floor(Math.random() * optionThree.length);
//       moveChoiceNumber = optionThree[index];
//     }
//     //detemine movement choice
//     let moveChoice = computerScoutLocation + moveChoiceNumber;
//     // check move is possible
//     if (moveChoice >= 0 && moveChoice <= 99) {
//       if (
//         squares[moveChoice].className == "square" &&
//         moveChoice != computerTankLocation
//       ) {
//         squares[computerScoutLocation].className = "square";
//         squares[computerScoutLocation].innerHTML = "";
//         squares[moveChoice].className = "computerScout";
//         // squares[moveChoice].innerHTML = "computer scout";
//         computerScoutLocation = moveChoice;
//         setTimeout(computerTankShoot, 500);
//       } else {
//         CompueterScoutMove();
//       }
//     } else {
//       CompueterScoutMove();
//     }
//   } else {
//     computerTankShoot();
//   }
// }

//computer tank move
function CompueterTankMove() {
  if (computerTankAlive == true && gameRunning == true) {
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
    if (
      moveChoice >= 0 &&
      moveChoice <= 99 &&
      squares[moveChoice].className == "square" &&
      moveChoice != computerScoutLocation
    ) {
      // Hpannounce.innerHTML =
      // moveChoice + " " + tankLocation + " " + scoutLocation;
      // scoutHpannounce.innerHTML = "i ran";
      // announceThree.innerHTML = "Player Tank HP: " + playerTankHp;
      // announceFour.innerHTML = "Player Tank HP: " + playerScoutHp;
      // notes.innerHTML = "info: ";

      squares[computerTankLocation].className = "square";
      // squares[computerTankLocation].innerHTML = "";
      //

      // WTF when the below is on it doesnt do it...
      // squares[moveChoice].className = "computerTank";
      // squares[moveChoice].innerHTML = "computer tank";
      computerTankLocation = moveChoice;
      // announceThree.innerHTML = computerTankLocation;

      WhereCanIMoveScout();
      revealArtillery();
      tankRevealArtillery();
      resetMove();
      document.getElementById("headingsText").innerHTML = "move scout";
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
  switch (i - unitLocation) {
    case 1:
      return 1;
    case -1:
      return -1;
    case 10:
      return 10;
    case -10:
      return -10;
    case 11:
      return 11;
    case 9:
      return 9;
    case -11:
      return -11;
    case -9:
      return -9;
  }
}

//check enemy tank is alive
function tankAlive(i) {
  if (computerTankHp <= 0) {
    // Hpannounce.innerHTML = "Tank HP: Tank is dead!";
    // squares[i].className = "computerTank explosionHit";
    // squares[i].innerHTML = "";
    computerTankAlive = false;
  }
}

//check enemy scout is alive
function scoutAlive(i) {
  if (computerScoutHp <= 0) {
    // scoutHpannounce.innerHTML = "Scout HP: Scout is dead!";
    // squares[i].className = "square";
    // squares[i].innerHTML = "";
    computerScoutAlive = false;
  }
}

//check player tank is alive
function CheckPlayerTankAlive(i) {
  if (playerTankHp <= 0) {
    // announceThree.innerHTML = "Player Tank HP: Tank is dead!";
    // squares[i].className = "square";
    // squares[i].innerHTML = "";
    playerTankAlive = false;
  }
}

//check player scout is alive
function CheckPlayerScoutAlive(i) {
  if (playerScoutHp <= 0) {
    // announceFour.innerHTML = "Player Scout HP: Scout is dead!";
    // squares[i].className = "square";
    // squares[i].innerHTML = "";
    playerScoutAlive = false;
  }
}

function displayRestart() {
  document.getElementById("restartDiv").style.top = "275px";
  document.getElementById("restartDiv").style.display = "inline";
}

//check for game over
function gameOver() {
  if (computerTankHp <= 0 || playerTankHp <= 0) {
    // scoutHpannounce.innerHTML = "Scout HP: Scout is dead! - GAME OVER DUDE!";
    clearNearBy();
    gameRunning = false;
    setTimeout(displayRestart, 1000);
    return true;
  }
}

//display info before game begins
// updateInfo();

//starting announcement

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
      } else if (scoutMoved < 1) {
        scoutMove(i);
      } else if (tankHasShot < 1) {
        // document.getElementsByClassName('square').style.cursor = "url(\"images/crosshair50.png\")25 25, move";
        // var e = document.getElementsByClassName("square");
        // for (var x = 0; x < e.length; x++) {
        //   e[x].style.cursor = "url(\"images/crosshair50.png\")25 25, move";
        // }

        // document.getElementsByClassName("square").style.margin = "3px";

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
