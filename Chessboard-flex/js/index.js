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

square =[]
let whitePlayer = document.getElementsByClassName('white1');
console.log(whitePlayer);
console.log(document.querySelector('.white1'));
let selEl = []
let pick;
function printID(e) {
    console.log(`hello World`);
    e = e || window.event;
    e = e.target || e.srcElement;
    let el = document.getElementById(e.id)
    let selELarr = []
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
                if ((pick == whites.pawn) || (pick == black.pawn)) {
                    selELarr[1] = Number(selELarr[1]) + 1;
                    console.log(selELarr);
                    document.getElementById(`${selELarr[0]}-${selELarr[1]}-${selELarr[2]}`).classList.toggle('select')
                }
            }
            else {
                removeSel();
              
                document.getElementById(selEl[1]).classList.add('select')
                selELarr = String(selEl[1]).split('-');
                console.log(selELarr);
                if ((pick == whites.pawn) || (pick == black.pawn)) {
                    selELarr[1] = Number(selELarr[1]) + 1;
                    console.log(selELarr);
                    document.getElementById(`${selELarr[0]}-${selELarr[1]}-${selELarr[2]}`).classList.toggle('select')
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
                el.innerHTML = pick;
                removeSel();
                document.getElementById(selEl[0]).classList.remove('select');
                document.getElementById(selEl[0]).innerHTML = "";
                if (pick.length != 0) {myAudio.play(); }
            
            pick = "";
       
            }      
        }
         
    }
}
function pawmMoves() { 

}

function removeSel() { 
    let allSel = document.querySelectorAll('.select')
    for (let a = 0; a < allSel.length; a++) { 
        allSel[a].classList.remove('select')
    }
}