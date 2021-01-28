
let column = [];
let row = [];
let container = document.querySelector('.container')
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

