let divelement = []
const gameboard = document.querySelector('.innercontainer');
let activepalyer;
let player1 = 'x';
let player2 = 'o';
let moves = new Array();
let move = new Array(3);
let gameover = false;
let movescount;
let move1 = [[]];


const reset = document.querySelector('.reset')
const previousBtn = document.querySelector('.btn-previous');
const nextBtn = document.querySelector('.btn-next')
const btn = document.querySelectorAll('.btn')
for (let i = 0; i < move.length; i++) {
    move[i] = new Array(3)
}

function divCreate() {

    for (let z = 0; z < 9; z++) {
            divelement[z] = document.createElement('div');
            divelement[z].classList.add('boxes')
        gameboard.appendChild(divelement[z]);
            
     }

}

divCreate();
init()
reset.addEventListener('click', init)


 
function init() { 
    gameover = false;
    movescount = 0;
    activepalyer = player1;
    move1 = [[]];
    moves = new Array();
    previousBtn.classList.add('hidden')
    nextBtn.classList.add('hidden')
    move = [
        ['','',''],
        ['','',''],
        ['','','']]
    moves[0] = [
        ['','',''],
        ['','',''],
        ['','','']]
        for (let z = 0; z < 9; z++) {
            divelement[z].innerHTML = '';
        }
}


for (let i = 0; i < divelement.length; i++) { 
        divelement[i].addEventListener('click',game)        
}

function game() { 
    movescount = moves.length + 1;
    if (!gameover) {
        if (this.innerHTML === "") {
            if (activepalyer === player1) {
                this.innerHTML = activepalyer
                activepalyer = player2;
                storemove();
                checkwin();
            }
            else {
            
                if (activepalyer === player2) {
                    this.innerHTML = activepalyer
                    activepalyer = player1;
                    storemove();
                    checkwin();
                }
            }
            console.log(this);
        }
    }
    if (gameover) {
        previousBtn.classList.remove('hidden')
        previousBtn.addEventListener('click', previousMove);
        for (let i=0; i < btn.length; i++) { 
            btn[i].addEventListener('click', prevNextMove)
        }

    }
}
function prevNextMove() {
    if (movescount < moves.length) {
        nextBtn.classList.remove('hidden')
        nextBtn.addEventListener('click', nextMove);
    }
    
    previousBtn.addEventListener('click', previousMove);
}

function previousMove() {
    let z = 0;
    if (movescount > 1) {
        movescount = movescount - 1;
        let currmove = moves[movescount - 1];
        console.log(currmove);
        for (let y=0; y < 3; y++) { 
            for (let x = 0; x < 3; x++) {
               divelement[z].innerHTML = currmove[y][x];
                /*        console.log(divelement[z]);
                       console.log(move[y][x]); */
                z++;
            }
        }
        if (movescount == 1) {
            previousBtn.classList.add('hidden')
        }
     }
}
function nextMove() {
    let z = 0;
    if (movescount != moves.length) {
        movescount = movescount + 1;
        let currmove = moves[movescount - 1];
        console.log(currmove);
        for (let y=0; y < 3; y++) { 
            for (let x = 0; x < 3; x++) {
               divelement[z].innerHTML = currmove[y][x];
                z++;
            }
        }
        console.log(movescount >= 1);
        if (movescount >= 1) {
            previousBtn.classList.remove('hidden');
            
        }
        if (movescount == moves.length) {
            nextBtn.classList.add('hidden')
        }
    }
    else {
        nextBtn.classList.add('hidden')
    }
}
function storemove() {

    let z = 0
    for (let y=0; y < 3; y++) { 
        for (let x = 0; x < 3; x++) {
            move[y][x] = divelement[z].innerHTML;

            z++;
        }
    }
    for (let i = 0; i < 3; i++){
        move1[i] = move[i].slice();
    }
    moves.push(move1.slice())
}

function checkwin() {
  //Check win horizontally  
    for (let y = 0; y < 3; y++) { 
        if ((move[y][0] != "") && (move[y][0] === move[y][1]) && (move[y][1] === move[y][2])) { 
            gameover = true;
            break
        }
    }

//Check win Vertically
for (let x = 0; x < 3; x++) { 
    if ((move[0][x] != "") && (move[0][x] === move[1][x]) && (move[1][x] === move[2][x])) { 
        gameover = true;
        break
    }
    }

//Check win Diagonally
    if (((move[0][0] != "") && (move[0][0] === move[1][1]) && (move[1][1] === move[2][2])) || (((move[0][2] != "") && (move[0][2] === move[1][1]) && (move[1][1] === move[2][0])))) {
        gameover = true;
    }
 }