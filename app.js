const squares = document.querySelectorAll(".square");
const Hpannounce = document.getElementById("announce");

// start of game
let tankPlaced = false;
let scoutPlaced = false;

let computerTankHp = 100;
Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;

for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
        if (tankPlaced == false && squares[i].className == "square") {
            squares[i].className = "placedTank";
            tankPlaced = true;
            // computer places tank
            let rand = Math.floor(Math.random() * 100);
            if (squares[rand].className == "square") {
                squares[rand].className = "computerTank"
            }

        } else if (scoutPlaced == false && squares[i].className == "square") {
            squares[i].className = "placedScout";
            scoutPlaced = true;
            // computer place scout
            let rand = Math.floor(Math.random() * 100);
            if (squares[rand].className == "square") {
                squares[rand].className = "computerScout"
            }
            
        } else if (squares[i].className == "computerTank") {
                computerTankHp -= 50;
                Hpannounce.innerHTML = "Tank HP: "+ computerTankHp;

        } else { if (squares[i].className == "square") { 
            squares[i].className = "clicked";
        // document.getElementById("announce").innerHTML = "I have changed!";
        } 
    }
    }
}