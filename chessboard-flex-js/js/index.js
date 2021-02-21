
let column = [];
let row = [];
let container = document.querySelector('.container')
var myAudio = new Audio('../images/wooden-object-place.wav')
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
    document.querySelector('.container').style.backgroundColor = border[n];

}

addelement();
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
let selELarr2 =[]
function printID(e) {

    e = e || window.event;
    e = e.target || e.srcElement;
    let el = document.getElementById(e.id);
    let selELarr = [];
    let n;
    if (el != null) {
        let sel = el.innerHTML;
        if (sel.length != 0) {
            pick = sel;
            selEl.push(e.id);
            console.log(selEl);
        
            if (typeof selEl[1] == "undefined") {
                document.getElementById(selEl[0]).classList.add('select')
                selELarr = String(selEl[0]).split('-');
                console.log(pick);
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
                    console.log(Number(selELarr[1]));
                    n = 7 - Number(selELarr[1]);
                    moveVerticalPlus(n, selELarr)
                }
                else if (pick == whites.rook) { 
                    moveVerticalMinus(Number(selELarr[1]), selELarr)

                }
            }
            else {
                removeSel();
                document.getElementById(selEl[1]).classList.add('select')
                selELarr = String(selEl[1]).split('-');
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
                    console.log(Number(selELarr[1]));
                    n = 7 - Number(selELarr[1]);
                    console.log(Number(selELarr[1]));
                    console.log(n);
                    let m = Number(selELarr[1]);
                    console.log(m);
                    moveVerticalPlus(n, selELarr); 
                    moveVerticalMinus(m, selELarr)

                    
                }
                else if (pick == whites.rook) { 
                    moveVerticalMinus(Number(selELarr[1]), selELarr)

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
            if (typeof pick != 'undefined') {
                allSel = document.querySelectorAll('.select');
                console.log(allSel);
                console.log(pick);
                console.log(selEl[0]);
                for (let i = 0; i < allSel.length; i++) { 
                    console.log(allSel[i]);
                    console.log();
                    let allSelid = allSel[i].id; //get ID of the selected elements
                    if (allSelid != selEl[0]) { 
                        console.log('okeydokey');
                        console.log(pick);
                        console.log(el);
                
                        console.log(allSel[i]); 
                        console.log(el);
                        if (allSel[i] == el) {
                            console.log('yes');
                            el.innerHTML = pick;
                            document.getElementById(selEl[0]).classList.remove('select');
                            document.getElementById(selEl[0]).innerHTML = "";
                            if (pick.length != 0) {myAudio.play(); }
                        
                             pick = "";
                        }
                    }
                }
                console.log();
                removeSel();
            }      
        }
         
    }
}
function moveVerticalPlus(n, selELarr) {
    if (n != 0) {
        selELarr1[1] = Number(selELarr[1])
        for (let i = 1; i <= n; i++){
        selELarr1[1] = Number(selELarr1[1]) + 1;
        document.getElementById(`${selELarr[0]}-${selELarr1[1]}-${selELarr[2]}`).classList.add('select')
        }}
}

function moveVerticalMinus(n, selELarr) { 
    console.log(n);
    console.log(selELarr);
    if (n != 0) { 
        selELarr2[1] = Number(selELarr[1])
        for (let i = 1; i <= n; i++){
        console.log(selELarr2[1]);
        selELarr2[1] = Number(selELarr2[1]) - 1;
        document.getElementById(`${selELarr[0]}-${selELarr2[1]}-${selELarr[2]}`).classList.add('select')
        }
    }
}

function removeSel() { 
    let allSel = document.querySelectorAll('.select');
    for (let a = 0; a < allSel.length; a++) { 
        allSel[a].classList.remove('select')
    }
}