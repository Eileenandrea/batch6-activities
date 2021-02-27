let board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' '],] 
let activeplayer = `x`;
let gameover = false;
let moves = new Array();
moves[0] = [[' ', ' ', ' '],
[' ', ' ', ' '],
[' ', ' ', ' '],];
let move1 = [[]];
let movecount;
let game ={
    welcomeMesasge: function () { 
        return `Welcome to Tic Tac Toe Console `
    },
    instruction: function () {
        return ` 1. To make a move type in move (position) \n
        \n  2. only the active Player can move\n 3. to reset game type in reset() a prompt will display if you want to proceed type in yes`;
    },
    boardconsole: function () { 
        return `  ${board[0][0]} | ${board[0][1]}  | ${board[0][2]}`+`\n ------------`+ `\n ${board[1][0]}  | ${board[1][1]}  | ${board[1][2]}`+`\n ------------`+ `\n ${board[2][0]}  | ${board[2][1]}  | ${board[2][2]}`
    },
    boardposition: function () { 
        return `  1  | 2 | 3`+`\n ------------`+ `\n   4  | 5 | 6`+`\n ------------`+ `\n   7  | 8 | 9`
    },
    gameoverinstruction: function () { 
        return ` 1. to Play again type reset()\n 2.to show previous move type previous()\n 3. to show next move type next()`
    }
}
console.log(`${game.welcomeMesasge()} \n  ${game.instruction()} \n \n ${game.boardposition()}`);

function move(position) { 
    if (!gameover) {
        
        let pos = position - 1
        if (board[Math.floor(pos / 3)][pos % 3] == " ") //Check if empty
        {
            board[Math.floor(pos / 3)][pos % 3] = activeplayer;

            console.log(game.boardconsole());
            storemoves();
            checkwin();
            if (!gameover) {
                toggleActivePlayer();
                console.log(`player ${activeplayer} turn`);
            }
            else { 
                console.log(game.gameoverinstruction());
                movecount = moves.length - 1;
            }
        }
    }
}
function toggleActivePlayer() { 
    activeplayer = activeplayer ==='x' ? 'o' :'x'
}
function checkwin() { 
    //check win horizontally
    for (let i = 0; i < 3; i++) { 
        if ((board[i][0] != " ") && (board[i][0] == board[i][1]) && (board[i][1] == board[i][2])) {
            console.log(`Player ${board[i][0]} wins`);
            gameover = true;
         }          
    }
    //Chek win Vertically
    for (let i = 0; i < 3; i++) { 
        if ((board[0][i] != " ") && (board[0][i] == board[1][i]) && (board[1][i] == board[2][i])) {
            console.log(`Player ${board[0][i]} wins`);
            gameover = true;
         }          
    }
    //Check win Diagonally
    if (((board[0][0] != " ") && (board[0][0] == board[1][1]) && (board[1][1] == board[2][2]))  ) { 
        console.log(`Player ${board[0][0]} wins`);
        gameover = true;

    }
    if (((board[0][2] != " ") && (board[0][2] == board[1][1]) && (board[1][1] == board[2][0]))) { 
        console.log(`Player ${board[0][2]} wins`);
        gameover = true;
    }
}
function reset() { 
    let resetgame = prompt('are you sure you want to reset your game?')
    console.log(resetgame.toLowerCase());
    if (resetgame.toLowerCase() == 'yes') { 
        board = [[' ', ' ', ' '],
                    [' ', ' ', ' '],
                    [' ', ' ', ' '],] 
        activeplayer = `x`;
        gameover = false;
        console.log(`${game.welcomeMesasge()} \n  ${game.instruction()} \n \n ${game.boardposition()}`);

    }
}
function storemoves() { 
    for (let i = 0; i < 3; i++){
        move1[i] = board[i].slice();
    }
    moves.push(move1.slice())
}
function previous() { 
    if (gameover) {
        if (movecount > 0) {
            movecount--;
        board = moves[movecount];
        console.log(game.boardconsole());
        }
        else {
            console.log(`no moves left`);
        }
        }  
}
function next() {
    if (gameover) {
        if (movecount < moves.length -1) {
            movecount++;
            board = moves[movecount];
            console.log(game.boardconsole());
        }
        else {
            console.log(`no moves left`);
        }
    }
}