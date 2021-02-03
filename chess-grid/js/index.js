
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
defaultPosition();

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
let selELarr1 = []
let selELarr2 = []
let selELarr3 = []
let selELarr4 = []
let selELarr5 = []
let selELarr6 = []
let selELarr7 = []
let selELarr8 = []
let selELarr1k=new Array(8).fill(0).map(() => new Array(2).fill(0));
let blackEaten;//storage for eaten black peices
let whiteEaten;//storage for eaten white peices
let blackEatenEL = []//storage for eaten black peices
let whiteEatenEL = []//storage for eaten white peices

let whitePlayer = document.querySelector('.white1')
let BlackPlayer = document.querySelector('.black1')
whitePlayer.classList.toggle('active')

function printID(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    console.log(e);
    let el = document.getElementById(e.id);
    let selELarr = [];
    let n;
    let n1;
    let canmove;
    console.log(el);
    console.log(e.id);
    let activePlayer;
    let pick1;
    if (el != null) {
        let sel = el.innerHTML;
        console.log(sel);
        pick1 = sel;
        let CP = element => element === pick1;
        activePlayer = document.querySelector('.active').id;
        console.log(activePlayer);
        //check if pick chess peice is black or white
        if (activePlayer == 'whiteP') {
            canmove = whiteP.some(CP);
        } else { 
            canmove = blackP.some(CP);
        }
       // if (canmove) {
            if ((sel.length != 0) && (canmove)) {
                pick = sel;
                selEl.push(e.id);

                console.log(selEl);
                if (typeof selEl[1] == "undefined") {
                    document.getElementById(selEl[0]).classList.add('select')
                    selELarr = String(selEl[0]).split('-');
                    console.log(selELarr);

                    if (pick == black.pawn) {
                        if (Number(selELarr[1]) == 1) {
                            n = 2;
                        }
                        else {
                            n = 1;
                        }
                        moveVerticalPlus(n, selELarr)
                    }
                    else if (pick == whites.pawn) {
                        if (Number(selELarr[1]) == 6) {
                            n = 2;
                        }
                        else {
                            n = 1;
                        }
                        moveVerticalMinus(n, selELarr)
                    }
                    if (pick == black.rook) {
                        n = 7 - Number(selELarr[1]);
                        moveVerticalPlus(n, selELarr)
                    }
                    else if (pick == whites.rook) {
                        moveVerticalMinus(Number(selELarr[1]), selELarr)

                    }
                    else if (pick == black.bishop) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                        console.log(Number(selELarr[1]));
                    
                        moveDiagonal1(n,n1,selELarr);
                        moveDiagonal2(n,m1, selELarr);
                        moveDiagonal3(m, n1, selELarr);
                        moveDiagonal4(m,m1,selELarr);
                    
                    }
                    else if (pick == whites.bishop) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                    
                        moveDiagonal1(n,n1,selELarr);
                        moveDiagonal2(n,m1, selELarr);
                        moveDiagonal3(m,n1, selELarr);
                        moveDiagonal4(m,m1,selELarr);
                    }
                    else if (pick == black.knight) {
                        horsemove(selELarr)
                    }
                    else if (pick == whites.knight) { 
                        horsemove(selELarr)
                    }
                }
                else {
                    removeSel();
                    document.getElementById(selEl[1]).classList.add('select')
                    selELarr = String(selEl[1]).split('-');
                    if (pick == black.pawn) {
                        if (Number(selELarr[1]) == 1) {
                            n = 2;
                        }
                        else {
                            n = 1;
                        }
                        moveVerticalPlus(n, selELarr)
                    }
                    else if (pick == whites.pawn) {
                        if (Number(selELarr[1]) == 6) {
                            n = 2;
                        }
                        else {
                            n = 1;
                        }
                        moveVerticalMinus(n, selELarr)
                    }
                    else if (pick == black.rook) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                        console.log(Number(selELarr[1]));
                    
                        moveVerticalPlus(n, selELarr);
                        moveVerticalMinus(m, selELarr)
                        moveSideRight(n1, selELarr)
                        moveSideLeft(m1, selELarr)
                    
                    }
                    else if (pick == whites.rook) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                        moveVerticalMinus(m, selELarr);
                        moveVerticalPlus(n, selELarr);
                        moveSideRight(n1, selELarr)
                        moveSideLeft(m1, selELarr)
                    }
                    else if (pick == black.bishop) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                        console.log(Number(selELarr[1]));
                    
                        moveDiagonal1(n,n1,selELarr);
                        moveDiagonal2(n,m1, selELarr);
                        moveDiagonal3(m, n1, selELarr);
                        moveDiagonal4(m,m1,selELarr);
                    
                    }
                    else if (pick == whites.bishop) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                    
                        moveDiagonal1(n,n1,selELarr);
                        moveDiagonal2(n,m1, selELarr);
                        moveDiagonal3(m,n1, selELarr);
                        moveDiagonal4(m,m1,selELarr);
                    }
                    else if (pick == black.knight) {
                        horsemove(selELarr)
                    }
                    else if (pick == whites.knight) { 
                        horsemove(selELarr)
                    }
                    else if (pick == black.queen) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                        console.log(Number(selELarr[1]));
                    
                        moveVerticalPlus(n, selELarr);
                        moveVerticalMinus(m, selELarr)
                        moveSideRight(n1, selELarr)
                        moveSideLeft(m1, selELarr)
                        moveDiagonal1(n,n1,selELarr);
                        moveDiagonal2(n,m1, selELarr);
                        moveDiagonal3(m, n1, selELarr);
                        moveDiagonal4(m,m1,selELarr);
                    
                    }
                    else if (pick == whites.queen) {
                        n = 7 - Number(selELarr[1]);
                        n1 = 7 - Number(selELarr[2]);
                        let m = Number(selELarr[1]);
                        let m1 = Number(selELarr[2]);
                        moveVerticalMinus(m, selELarr);
                        moveVerticalPlus(n, selELarr);
                        moveSideRight(n1, selELarr)
                        moveSideLeft(m1, selELarr);
                        moveDiagonal1(n,n1,selELarr);
                        moveDiagonal2(n,m1, selELarr);
                        moveDiagonal3(m,n1, selELarr);
                        moveDiagonal4(m,m1,selELarr);
                    }

                    selEl.shift();
                }
                /*             
                                console.log('a pawn is selected');
                                selELarr[1] = Number(selELarr[1]) + 1;
                                console.log(selELarr);
                                console.log(`${selELarr[0]}-${selELalrr[1]}-${selELarr[2]}`);
                                
                            }  */
         

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
                }
            }
        //}
         
    //}
}
function moveVerticalPlus(n, selELarr) {
    if (n != 0) {
        selELarr1[1] = Number(selELarr[1])
        for (let i = 1; i <= n; i++) {
            selELarr1[1] = Number(selELarr1[1]) + 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr1[1]}-${selELarr[2]}`);
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
                    console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
            posiblemoves.classList.add('select')
        }
    }
}

function moveVerticalMinus(n, selELarr) { 
    if (n != 0) { 
        selELarr2[1] = Number(selELarr[1])
        for (let i = 1; i <= n; i++){
        selELarr2[1] = Number(selELarr2[1]) - 1;
            posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr2[1]}-${selELarr[2]}`);
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
                    console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
        posiblemoves.classList.add('select')
        }
    }
}

function moveSideRight(n, selELarr) {
    if (n != 0) {
        selELarr3[2] = Number(selELarr[2])
        for (let i = 1; i <= n; i++) {
            selELarr3[2] = Number(selELarr3[2]) + 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr[1]}-${selELarr3[2]}`);
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
                    console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
            posiblemoves.classList.add('select')
        }
    }
}
function moveSideLeft(n, selELarr) { 
    if (n != 0) { 
        selELarr4[2] = Number(selELarr[2])
        for (let i = 1; i <= n; i++){
        selELarr4[2] = Number(selELarr4[2]) - 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr[1]}-${selELarr4[2]}`);
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
                    console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
        posiblemoves.classList.add('select')
        }
    }
}
function moveDiagonal1(l,m, selELarr) {
    if (l >= m) {
        n = m;
    }
    else {
        n = l;
    }
    
    if (n != 0) {
        console.log(n);
        selELarr5[1] = Number(selELarr[1])
        selELarr5[2] = Number(selELarr[2])
        for (let i = 1; i <= n; i++) {
            selELarr5[1] = Number(selELarr5[1]) + 1;
            selELarr5[2] = Number(selELarr5[2]) + 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr5[1]}-${selELarr5[2]}`);
            if (posiblemoves.innerHTML != "") { //if there is a peice on its way stop
              //  console.log(pick);
                //Check if Black or White Piece
                //console.log(posiblemoves.innerHTML);
                //console.log(blackP.find(element => element === pick));
                let CP = element => element === pick;
                let PM = element => element === posiblemoves.innerHTML;
                
                //check if pick chess peice is black or white
         //       console.log(blackP.some(CP));
                if (((blackP.some(CP)) && (blackP.some(PM))) || ((whiteP.some(CP)) && (whiteP.some(PM)))) {
            //        console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
            posiblemoves.classList.add('select')
        }
    }
}
function moveDiagonal2(l,m, selELarr) {
    if (l >= m) {
        n = m;
    }
    else {
        n = l;
    }
    if (n != 0) {
        console.log(n);
        selELarr6[1] = Number(selELarr[1])
        selELarr6[2] = Number(selELarr[2])
        for (let i = 1; i <= n; i++) {
            selELarr6[1] = Number(selELarr6[1]) + 1;
            selELarr6[2] = Number(selELarr6[2]) - 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr6[1]}-${selELarr6[2]}`);
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
                    console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
            posiblemoves.classList.add('select')
        }
    }
}
function moveDiagonal3(l,m, selELarr) {
    if (l >= m) {
        n = m;
    }
    else {
        n = l;
    }
    if (n != 0) {
        console.log(n);
        selELarr7[1] = Number(selELarr[1])
        selELarr7[2] = Number(selELarr[2])
        for (let i = 1; i <= n; i++) {
            selELarr7[1] = Number(selELarr7[1]) - 1;
            selELarr7[2] = Number(selELarr7[2]) + 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr7[1]}-${selELarr7[2]}`);
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
                    console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
            posiblemoves.classList.add('select')
        }
    }
}
function moveDiagonal4(l,m, selELarr) {
    if (l >= m) {
        n = m;
    }
    else {
        n = l;
    }
    if (n != 0) {
        console.log(n);
        selELarr8[1] = Number(selELarr[1])
        selELarr8[2] = Number(selELarr[2])
        for (let i = 1; i <= n; i++) {
            selELarr8[1] = Number(selELarr8[1]) - 1;
            selELarr8[2] = Number(selELarr8[2]) - 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr8[1]}-${selELarr8[2]}`);
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
                    console.log(`same`);
                    break;
                }
                else {
                    posiblemoves.classList.add('redselect')
                    break
                }
               
            }
            posiblemoves.classList.add('select')
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

function horsemove(selELarr) {
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
               
             posiblemoves.classList.remove('select')
            }
            else {
                posiblemoves.classList.remove('select')
                posiblemoves.classList.add('redselect')
                
            }
           
        }    
    }
    
 /*        for (let i = 1; i <= n; i++) {
            selELarr4[1] = Number(selELarr4[1]) - 1;
            selELarr4[2] = Number(selELarr4[2]) - 1;
            let posiblemoves = document.getElementById(`${selELarr[0]}-${selELarr4[1]}-${selELarr4[2]}`);
        
        } */   
}