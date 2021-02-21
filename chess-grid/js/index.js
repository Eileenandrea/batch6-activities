
let column = [];
let row = [];
let container = document.querySelector('.container')
var myAudio = new Audio('../images/wooden-object-place.wav')
let posiblemoves;
const whites = {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn:'♙',
}

const black={ 
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn:'♟︎',
}
let whiteP = Object.values(whites);
let blackP = Object.values(black);
console.log(whiteP);
console.log(blackP);
function theme(n) {
    const themedark = ['#803E04', "#7a7a7a", '#0A85AE'];
    const themelight = ['#FFCE9E', 'rgb(247, 247, 247)',  '#fff'];
    const border = ['#391C08', '#353535','#023850']
    //document.querySelectorAll('.black').style.backgroundColor = 'brown';
    let allBlack = document.querySelectorAll('.black');
    for (let i = 0; i < 32; i++) { 
        allBlack[i].style.backgroundColor = themedark[n];
    }
    let allWhite = document.querySelectorAll('.white');
    for (let i = 0; i < 32; i++) { 
        allWhite[i].style.backgroundColor = themelight[n];
    }
    document.querySelector('.outercontainer').style.backgroundColor = border[n];

}


function addelement() { 
    for (let x = 0; x < 8; x++) { 
        column[x] = document.createElement('div');
        column[x].classList.add('column')
        //column[x].classList.add('black')
        container.appendChild(column[x])
        console.log(container);
        for (let y = 0; y < 8; y++){
            row[y] = document.createElement('div');
            row[y].classList.add('row');    
            row[y].id =`box-${x}-${y}`
            if ((y % 2)^(x % 2))  {
                row[y].classList.add('black');
            }
            else { 
                row[y].classList.add('white');
            }

            column[x].appendChild(row[y]);
        }
    }
}
square =[]
//defaultPosition();

function defaultPosition() { 
    for (let i = 0; i < 8; i++) { 
        for (let j = 0; j < 8; j++) { 
            if (i == 0 ) {
                if (j == 0 || j == 7) { 
                    document.getElementById(`box-${i}-${j}`).textContent = black.rook
                }
                else if (j == 1 || j == 6) { 
                    document.getElementById(`box-${i}-${j}`).textContent = black.knight
                }
                else if (j == 2 || j == 5) { 
                    document.getElementById(`box-${i}-${j}`).textContent = black.bishop
                }
                else if (j == 3) { 
                    document.getElementById(`box-${i}-${j}`).textContent = black.queen
                }
                
                else if (j == 4) { 
                    document.getElementById(`box-${i}-${j}`).textContent = black.king
                }
            }
            if (i == 1) { 
                document.getElementById(`box-${i}-${j}`).textContent = black.pawn
            }

            if (i == 6) {
                document.getElementById(`box-${i}-${j}`).textContent = whites.pawn; 
            }
            if (i == 7 ) {
                if (j == 0 || j == 7) { 
                    document.getElementById(`box-${i}-${j}`).textContent = whites.rook
                }
                else if (j == 1 || j == 6) { 
                    document.getElementById(`box-${i}-${j}`).textContent = whites.knight
                }
                else if (j == 2 || j == 5) { 
                    document.getElementById(`box-${i}-${j}`).textContent = whites.bishop
                }
                else if (j == 3) { 
                    document.getElementById(`box-${i}-${j}`).textContent = whites.queen
                }
                
                else if (j == 4) { 
                    document.getElementById(`box-${i}-${j}`).textContent = whites.king
                }
            }
            
        }
    }
}
let selEl = []
let pick;
let selELarr1k = new Array(8).fill(0).map(() => new Array(2).fill(0));
let blackEaten;//storage for eaten black peices
let whiteEaten;//storage for eaten white peices
let blackEatenEL = []//storage for eaten black peices
let whiteEatenEL = []//storage for eaten white peices
let whitePlayer = document.querySelector('.white1')
let BlackPlayer = document.querySelector('.black1')
whitePlayer.classList.toggle('active')
let selELarr = [];

checked();
function printID(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    console.log(e);
    let el = document.getElementById(e.id);

    let n;
    let n1;
    let canmove;
    let activePlayer;
    let pick1;
    if (el != null) {
        let sel = el.innerHTML;
        pick1 = sel;
        let CP = element => element === pick1;
        activePlayer = document.querySelector('.active').id;
        //check if pick chess peice is black or white
        if (activePlayer == 'whiteP') {
            canmove = whiteP.some(CP);
        } else { 
            canmove = blackP.some(CP);
        }
            if ((sel.length != 0) && (canmove)) {
                pick = sel;
                selEl.push(e.id);
                if (typeof selEl[1] == "undefined") {
                    document.getElementById(selEl[0]).classList.add('select')
                    selELarr = String(selEl[0]).split('-');
                    chessmoves();
                }
                else {
                    removeSel();
                    document.getElementById(selEl[1]).classList.add('select')
                    selELarr = String(selEl[1]).split('-');
                    chessmoves();
                    selEl.shift();
                }
            }
            else {
 //               if (typeof pick != 'undefined') {
                    allSel = document.querySelectorAll('.select');
                    redSel = document.querySelectorAll('.redselect')
       //             console.log(allSel);
     //               console.log(redSel);
                    for (let i = 0; i < allSel.length; i++) {

                        let allSelid = allSel[i].id; //get ID of the selected elements
                        if (allSelid != selEl[0]) {

                            if (allSel[i] == el) {
                                el.innerHTML = pick;
                                document.getElementById(selEl[0]).classList.remove('select');
                                document.getElementById(selEl[0]).innerHTML = "";
                                if (pick.length != 0) { myAudio.play(); }
                        
                                pick = "";
                                console.log(typeof pick);
                                            
                                whitePlayer.classList.toggle('active')
                                BlackPlayer.classList.toggle('active')
                            }
                     
                        }
                    }                     
                        //console.log(redSel);
                    for (let i = 0; i < redSel.length; i++) {
                            let redSelid = redSel[i].id;
                        if (redSel[i] == el) {
                            let EP = element => element === el.innerHTML;
                            console.log(blackP.some(EP));
                            if (blackP.some(EP)) {
                                blackEaten = el.innerHTML;
                            }
                            else { 
                                whiteEaten = el.innerHTML;
                            }
                            console.log(blackEaten);
                            console.log(whiteEaten);
                            
                            if (blackP.some(EP)) {
                                let WhitePE = document.querySelector('.whiteP')
                                blackEatenEL = document.createElement('div');
                                console.log(blackEaten);
                                blackEatenEL.textContent = blackEaten;
                                WhitePE.appendChild(blackEatenEL);
                            }
                            else { 
                                
                                let BlackPE = document.querySelector('.blackP')
                                whiteEatenEL = document.createElement('div');
                                whiteEatenEL.textContent = whiteEaten;
                                BlackPE.appendChild(whiteEatenEL);
                            }            
                            el.innerHTML = pick;
                                document.getElementById(selEl[0]).classList.remove('select');
                                document.getElementById(selEl[0]).innerHTML = "";
                                if (pick.length != 0) { myAudio.play(); }
                            pick = "";
                                          
                                
                                whitePlayer.classList.toggle('active')
                                BlackPlayer.classList.toggle('active')
                                
                            }
                        } 
                     
                removeSel();
                checked();
                }
            }
        //}
         
    //}
}
function checked() { 
    let whitePieces = [];
    let blackPieces = [];
    let whitePiecesid = [];
    let blackPiecesid = [];
    let whitePiecesinHTML = [];
    let blackPiecesinHTML = [];
    let allpeices =[];
    allbox = document.querySelectorAll('.row');
    for (let i = 0; i < 64; i++) { 
      
        let CP = element => element === allbox[i].innerHTML;
        if (whiteP.some(CP)) {
            whitePieces.push(allbox[i]);
            whitePiecesid.push(allbox[i].id)
            whitePiecesinHTML.push(allbox[i.innerHTML])
        }
        else if (blackP.some(CP)) {
            blackPieces.push(allbox[i])
            blackPiecesid.push(allbox[i].id)
            blackPiecesinHTML.push(allbox[i].innerHTML)
        }
    }
    
    console.log(whitePieces);
    activePlayer = document.querySelector('.active').id;
    console.log(activePlayer);
    if (activePlayer == 'whiteP') {
        for (let i = 0; i < blackPieces.length; i++) {
            let cArray = String(blackPiecesid[i]).split('-')
            console.log(`${cArray}: ${blackPiecesinHTML[i]}` );
            if (blackPiecesinHTML[i] == black.pawn) {
                 console.log('yes');
                 if ((Number(cArray[1]) == 1) || (((Number(cArray[1]) == 6) && (pick == whites.pawn)))) {
                     np = 3;
                     console.log(np);
                }
                else {
                    np = 2;
                }
                moveVerticalPlus(np, cArray,blackPiecesinHTML[i],'green','red')
            }  
        }
        console.log(document.querySelectorAll('.green'));
        
    }
}
function chessmoves() { 
    if ((pick == black.pawn) || (pick == whites.pawn)) {
        if ((Number(selELarr[1]) == 1) || (((Number(selELarr[1]) == 6) && (pick == whites.pawn)))) {
            np = 3;
        }
        else {
            np = 2;
        }
        if (pick == black.pawn) moveVerticalPlus(np, selELarr)
        else if (pick == whites.pawn) moveVerticalMinus(np, selELarr);
    }
    else if ((pick == black.rook) || (pick == whites.rook)) {
        moveVerticalPlus(8, selELarr,pick)
        moveVerticalMinus(8, selELarr,pick)
        moveSideRight(8, selELarr,pick)
        moveSideLeft(8, selELarr,pick)
    }
    else if ((pick == black.bishop) || (pick == whites.bishop)) {
        moveDiagonal1(8, selELarr,pick);
        moveDiagonal2(8, selELarr,pick);
        moveDiagonal3(8, selELarr,pick);
        moveDiagonal4(8, selELarr,pick);
    }
    else if (pick == black.knight) {
        horsemove(selELarr,pick)
    }
    else if (pick == whites.knight) {
        horsemove(selELarr,pick)
    }
    else if ((pick == black.queen) || (pick == whites.queen)) {
        moveVerticalPlus(8, selELarr,pick);
        moveVerticalMinus(8, selELarr,pick)
        moveSideRight(8, selELarr,pick)
        moveSideLeft(8, selELarr,pick)
        moveDiagonal1(8, selELarr,pick);
        moveDiagonal2(8, selELarr,pick);
        moveDiagonal3(8, selELarr),pick;
        moveDiagonal4(8, selELarr,pick);
    
    }
    else if ((pick == black.king) || (pick == whites.king)) {
        n = 2;
        moveVerticalPlus(n, selELarr,pick);
        moveVerticalMinus(n, selELarr,pick)
        moveSideRight(n, selELarr,pick)
        moveSideLeft(n, selELarr,pick)
        moveDiagonal1(n, selELarr,pick);
        moveDiagonal2(n, selELarr,pick);
        moveDiagonal3(n, selELarr,pick);
        moveDiagonal4(n, selELarr,pick);
    }  
}
function moveVerticalPlus(n,selELarr,pick,select='select',redselect='redselect') {
    let selELarr1 = []
    console.log(select);
    console.log(redselect);
    console.log(pick);
    if (selELarr[1] != 7) {
        for (let i = 1; i < n; i++) {
            selELarr1[i] = Number(selELarr[1]) + i
            if (selELarr1[i] >= 7) {
                break;
            }
        }     
        for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr1[i]}-${selELarr[2]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }     
}
function moveVerticalMinus(n, selELarr,pick,select='select',redselect='redselect') { 
    let selELarr1 = []
    console.log(n);
    if (selELarr[1] != 0) {
        for (let i = 1; i < n; i++) {
            selELarr1[i] = Number(selELarr[1]) - i
            if ((selELarr1[i] >= 7) || (selELarr1[i] <= 0)) {
                break;
            }
        }
        for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr1[i]}-${selELarr[2]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }
}
function moveSideRight(n, selELarr,pick,select='select',redselect='redselect') {
    let selELarr1 = []
    if (selELarr[2] != 7) {
        for (let i = 1; i < n; i++) {
            selELarr1[i] = Number(selELarr[2]) + i
            if (selELarr1[i] >= 7) {
                break;
            }
        }
           for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr[1]}-${selELarr1[i]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }
}
function moveSideLeft(n, selELarr,pick,select='select',redselect='redselect') { 
    let selELarr1 = []
    console.log(n);
    if (selELarr[2] != 0) {
        for (let i = 1; i < n; i++) {
            console.log(i);
            selELarr1[i] = Number(selELarr[2]) - i
            if ((selELarr1[i] >= 7) || (selELarr1[i] <= 0)) {
                break;
            }
        }
        console.log(selELarr1);
        for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr[1]}-${selELarr1[i]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }
}
function moveDiagonal1(n,selELarr,pick,select='select',redselect='redselect') {
    let selELarr1 = []
    let selELarr2 = [];
    if ((selELarr[1] != 7) && (selELarr[2] != 7)){
        for (let i = 1; i < n; i++) {
            selELarr1[i] = Number(selELarr[1]) + i
            selELarr2[i] = Number(selELarr[2]) + i
            if ((selELarr1[i] >= 7) || (selELarr2[i] >= 7)) {
                break;
            }
        }

        for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr1[i]}-${selELarr2[i]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }
}
function moveDiagonal2(n, selELarr,pick,select='select',redselect='redselect') {
    let selELarr1 = []
    let selELarr2 = [];
    if ((selELarr[1] != 7) && (selELarr[2] != 0)){
        for (let i = 1; i < n; i++) {
            selELarr1[i] = Number(selELarr[1]) + i
            selELarr2[i] = Number(selELarr[2]) - i
            if ((selELarr1[i] >= 7) || (selELarr2[i] <= 0)) {
                break;
            }
        }
        for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr1[i]}-${selELarr2[i]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }
}
function moveDiagonal3(n, selELarr,pick,select='select',redselect='redselect') {
    let selELarr1 = []
    let selELarr2 = [];
    if ((selELarr[1] != 0) && (selELarr[2] != 7)){
        for (let i = 1; i < n; i++) {
            selELarr1[i] = Number(selELarr[1]) - i
            selELarr2[i] = Number(selELarr[2]) + i
            if ((selELarr1[i] <= 0) || (selELarr2[i] >= 7)) {
                break;
            }
        }
        for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr1[i]}-${selELarr2[i]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }
}
function moveDiagonal4(n, selELarr,pick,select='select',redselect='redselect') {
    let selELarr1 = []
    let selELarr2 = [];
    if ((selELarr[1] != 0) && (selELarr[2] != 0)){
        for (let i = 1; i < n; i++) {
            selELarr1[i] = Number(selELarr[1]) - i
            selELarr2[i] = Number(selELarr[2]) - i
            if ((selELarr1[i] <= 0) || (selELarr2[i] <= 0)) {
                break;
            }
        }
        console.log(selELarr1);
        console.log(selELarr2);
        console.log(selELarr1.length);
        for (let i = 1; i < selELarr1.length; i++) {
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr1[i]}-${selELarr2[i]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
                //Check if Black or White Piece
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
            
                //check if pick chess peice is black or white
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
                    break;
                }
                else {
                    posiblemoves.classList.add(redselect)
                    break
                }
            }
            posiblemoves.classList.add(select)
        }
    }
}
function removeSel() { 
    let allSel = document.querySelectorAll('.select');
    let allSelR = document.querySelectorAll('.redselect');
    for (let a = 0; a < allSel.length; a++) { 
        allSel[a].classList.remove('select')
    }
    for (let a = 0; a < allSelR.length; a++) { 
        allSelR[a].classList.remove('redselect')
    }
    
}
function horsemove(selELarr,pick,select='select',redselect='redselect') {
    let knightMoves = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];
    let selELarrl1k2 = []
    for (let i = 0; i < 8; i++) {
        selELarr1k[i][0] = Number(selELarr[1]) + knightMoves[i][0];
        selELarr1k[i][1] = Number(selELarr[2]) + knightMoves[i][1];
    }
    console.log(selELarr1k.length);

    console.log(selELarr1k);
    console.log(selELarr[1]);
    console.log(knightMoves);
    console.log(selELarr1k);
    console.log(selELarrl1k2);
    for (let i = 0; i < selELarr1k.length; i++) { 
        if ((((selELarr1k[i][0]) < 8) && ((selELarr1k[i][1]) < 8)) && (((selELarr1k[i][0]) > -1) && ((selELarr1k[i][1]) >-1 ))) { 
            console.log(`${(selELarr1k[i][0])}: ${(selELarr1k[i][1])}`);
            selELarrl1k2.push(selELarr1k[i])
            console.log(selELarrl1k2);
        }
    }
    console.log(selELarrl1k2);

    for (let i = 0; i < selELarrl1k2.length; i++) { 
        let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarrl1k2[i][0]}-${selELarrl1k2[i][1]}`)
        console.log(posiblemoves);
        
        posiblemoves.classList.add('select')
        if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
            console.log(pick);
            //Check if Black or White Piece
            console.log(posiblemoves.innerHTML);
            console.log(blackP.find(element => element === pick));
            let CP = element => element === pick;
            let PM = element => element === posiblemoves.innerHTML;
            
            //check if pick chess peice is black or white
            console.log(blackP.some(CP));
            if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
               
             posiblemoves.classList.remove(select)
            }
            else {
                posiblemoves.classList.remove(select)
                posiblemoves.classList.add(redselect)
                
            }
           
        }    
    }
 
 
 /*        for (let i = 1; i <= n; i++) {
            selELarr4[1] = Number(selELarr4[1]) - 1;
            selELarr4[2] = Number(selELarr4[2]) - 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr4[1]}-${selELarr4[2]}`);
        
        } */   
}
