let divelement = []
const gameboard = document.querySelector('.innercontainer');
let activeplayer;
let player1 = 'x';
let player2 = 'o';
let moves = new Array();
let move = new Array(3);
let gameover = false;
let movescount;
let move1 = [[]];
let draw;
let winningPlayer;
let ai;

const reset = document.querySelector('.reset')
const previousBtn = document.querySelector('.btn-previous');
const nextBtn = document.querySelector('.btn-next');
const btn = document.querySelectorAll('.btn');
const playagain = document.querySelector('.playagain');
const moveHistory = document.querySelector('.movehistory');
const overlay = document.querySelector('.overlay');
const winner = document.querySelector('.winner')
const AIorHUMAN = document.querySelectorAll('.AIorHUMAN');
const human = document.querySelector('.HUMAN')
const overlay1 = document.querySelector('.overlay1');
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
for (let i = 0; i < AIorHUMAN.length; i++) { 
    AIorHUMAN[i].addEventListener('click', AIorHuman);
}
//this fuction select if play against AI or Human
function AIorHuman() {
    ai = this.innerHTML == 'AI' ? true : false;
    overlay1.classList.add('hidden');
    return ai;
 }
divCreate();
init()
reset.addEventListener('click', init)
function init() { 
    overlay1.classList.remove('hidden');
    overlay.classList.add('hidden');
    gameover = false;
    movescount = 0;
    activeplayer = player1;
    move1 = [[]];
    moves = new Array();
    previousBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
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
            if (!ai) {
                if (activeplayer === player1) {
                this.innerHTML = activeplayer;
                storemove();
                checkwin();
                if (!gameover) {
                    activeplayer = player2;
                }             
            }
            else {
            
                if (activeplayer === player2) {
                    this.innerHTML = activeplayer;
                    storemove();
                    checkwin();
                    if (!gameover) {
                        activeplayer = player1;
                    }   
                }
            }
            }
            else if (ai) {
                if (activeplayer === player1) {
                    this.innerHTML = activeplayer;
                    storemove();
                    checkwin();
                    if (!gameover) {
                        activeplayer = player2;
                        //ai move
                        aimoves();
                        console.log(activeplayer);
                        storemove();
                        checkwin();
                        activeplayer = player1;

                    }             
                }
            }
            
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
            draw = false;
            gameover = true;
            break
        }
    }
//Check win Vertically
    for (let x = 0; x < 3; x++) { 
        if ((move[0][x] != "") && (move[0][x] === move[1][x]) && (move[1][x] === move[2][x])) {
            draw = false;
            gameover = true;
            break
        }
        }
//Check win Diagonally
    if (((move[0][0] != "") && (move[0][0] === move[1][1]) && (move[1][1] === move[2][2])) || (((move[0][2] != "") && (move[0][2] === move[1][1]) && (move[1][1] === move[2][0])))) {
        draw = false;
        gameover = true;
    }
//Check if Draw
    if (movescount === 10) { 
        gameover = true;
        draw = true;
    }
    if (gameover) {
        displayoverlay()
      

    }
}
 
function displayoverlay() { 
    if (draw) {
        winner.innerHTML = `Draw`;
    }
    else { 
        winner.innerHTML = `Player "${activeplayer}" wins`
    }
    overlay.classList.remove('hidden');
    playagain.addEventListener('click', init);
    moveHistory.addEventListener('click',movehistory)
}

function movehistory() { 
    overlay.classList.add('hidden');
    previousBtn.classList.remove('hidden')
    previousBtn.addEventListener('click', previousMove);
    for (let i=0; i < btn.length; i++) { 
        btn[i].addEventListener('click', prevNextMove)
    }
}

function aimoves() { 
    let validmoveindex = []
    for (let i = 0; i < 9; i++) { 
        if (divelement[i].innerHTML === '') { 
            validmoveindex.push(i);
        }
    }
   
    let randommoveindex = Math.floor(Math.random() * validmoveindex.length);
    divelement[validmoveindex[randommoveindex]].innerHTML = activeplayer;

}

function aiHard() { 
    
}