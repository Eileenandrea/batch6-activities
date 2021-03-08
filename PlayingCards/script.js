let cardDiv = [];
let cardImg = [];
let btnShuffle = document.querySelector('.shuffle');
let btnArrangeSuite = document.querySelector('.arrangebysuite');
let btnArrangeAccending = document.querySelector('.arrange-accending');
let btnStartDeal = document.querySelector('.stardeal');
let btnarea1 = document.querySelector('.button-area');
let btnarea2 = document.querySelector('.btn-area2');
let cardArea = document.querySelector('.card-area');
let cardArea2 = document.querySelector('.card-area2');
let btnDealone = document.querySelector('.deal1');
let btnDealfive = document.querySelector('.deal5');
let cardDiv3 = document.querySelector('.card-div3')
let shuffleCards = [];
let cardDeck = {
    suite: ['♣', '♠', '♥', '♦'],
    face: ['K', 'Q', 'J'],
    number: ['A',2,3,4,5,6,7,8,9,10]
}
let btnArrangeDeccending = document.querySelector('.arrange-decending')
let cardcover = document.querySelector('.card-cover');
let cardwordtext = document.querySelector('.cardword')
var myAudio = new Audio('./assets/shuffling-cards-2.wav');
console.log(
`Instruction:
 1. to view Card Deck Type "cards" on the console
 2. to shuffle cards type "shuffle(cards)"
 3. to arrange shuffle by suite type "arrangeBySuite(shuffleCards)"
 4. to arrange shuffle cards by accending order type : "arrangeAccending(shuffleCards)"
 5. to deal one card from the deck type "dealOne()"
 6. to deal five cards form the deck type "dealfive()"`);
 
function createCardDeck() { 
    let cards = [];
   
    for (let i=0; i < cardDeck.suite.length; i++) { 
        for (let j=0; j < cardDeck.face.length; j++) { 
            cards.push(`${cardDeck.suite[i]}${cardDeck.face[j]}`)
        }
        for (let k = 0; k < cardDeck.number.length; k++) { 
            cards.push(`${cardDeck.suite[i]}${cardDeck.number[k]}`)
        }
    }
    return cards
}
function shuffle(array) {
    var m = array.length;
    var t, i;
    let arraycopy = array.slice();
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = arraycopy[m];
      arraycopy[m] = arraycopy[i];
      arraycopy[i] = t;
    }
  
    return arraycopy;
  }

function arrangeBySuite(cards) { 
    let club = [];
    let spades = [];
    let heart = [];
    let diamond = [];
    let newcards = [];

    for (let i = 0; i < cards.length; i++) { 
        let suite = cards[i].charAt(0);
      //  console.log(suite);
        switch (suite) { 
            case '♣':
                club.push(cards[i]);
                break;
            case '♠':
                spades.push(cards[i]);
                break;
            case '♥':
                heart.push(cards[i]);
                break;
            case '♦':
                diamond.push(cards[i]);
                break;
        }
    }
    newcards = [...club, ...spades,...heart,...diamond];
    return newcards
}

 function arrangeAccending(cards) {

     let suitevalue;
    let suitechar;
    let newcards = [];
     let cards1 = []
     let suite;
     for (let j = 0; j < cards.length; j++) {
         suite = cards[j].slice(0, 1);
         suitechar = cards[j].slice(1, 3)
         suitevalue = Number(suitechar);
         if (!suitevalue) {
             switch (suitechar) {
                 case 'A':
                     suitevalue = 1;
                     break;
                 case 'J':
                     suitevalue = 11;
                     break;
                 case 'Q':
                     suitevalue = 12;
                     break;
                 case 'K':
                     suitevalue = 13;
                     break;
             }
         }
               
         cards1.push([suite, suitevalue]);
         cards1.sort(sortFuntion)
         function sortFuntion(a, b) {
            if (a[1] === b[1]) {
                return 0;
            }
            else {
                return (a[1] < b[1]) ? -1 : 1;
            }
         }
     }
     for (let i = 0; i < 52; i++) {

         switch (cards1[i][1]) {
             case 1:
                 cards1[i][1] = 'A';
                 break;
             case 11:
                cards1[i][1] = 'J';
                 break;
             case 12:
                cards1[i][1] = 'Q';
                 break;
             case 13:
                cards1[i][1] = 'K';
                break;
         }
         newcards.push(cards1[i][0]+cards1[i][1])
     }
    return newcards       
}

function arrangeDeccending(cards) {

    let suitevalue;
   let suitechar;
   let newcards = [];
    let cards1 = []
    let suite;
    for (let j = 0; j < cards.length; j++) {
        suite = cards[j].slice(0, 1);
        suitechar = cards[j].slice(1, 3)
        suitevalue = Number(suitechar);
        if (!suitevalue) {
            switch (suitechar) {
                case 'A':
                    suitevalue = 1;
                    break;
                case 'J':
                    suitevalue = 11;
                    break;
                case 'Q':
                    suitevalue = 12;
                    break;
                case 'K':
                    suitevalue = 13;
                    break;
            }
        }
              
        cards1.push([suite, suitevalue]);
        cards1.sort(sortFuntion)
        function sortFuntion(a, b) {
           if (a[1] === b[1]) {
               return 0;
           }
           else {
               return (a[1] < b[1]) ? 1 : -1;
           }
        }
    }
    for (let i = 0; i < 52; i++) {

        switch (cards1[i][1]) {
            case 1:
                cards1[i][1] = 'A';
                break;
            case 11:
               cards1[i][1] = 'J';
                break;
            case 12:
               cards1[i][1] = 'Q';
                break;
            case 13:
               cards1[i][1] = 'K';
               break;
        }
        newcards.push(cards1[i][0]+cards1[i][1])
    }
   return newcards       
}
function dealOne() { 

    if (cardsdeal.length) {
        let i = Math.floor(Math.random() * cardsdeal.length);
        let deal = cardsdeal[i]; 
        let valuetoword = {
            A: `Ace`,
            2: `two`,
            3: `three`,
            4: `four`,
            5: `five`,
            6: `six`,
            7: `seven`,
            8: `eight`,
            9: `nine`,
            10: `ten`,
            K: `king`,
            Q: `Queen`,
            J:`Jack`
        }
        let facedeal = deal.slice(0, 1);
        let facedealtoword;
        if (facedeal == cardDeck.suite[0]) { 
            facedealtoword = `club`;
        }
        else if (facedeal == cardDeck.suite[1]) { 
            facedealtoword = `spades`;
        }
        else if (facedeal == cardDeck.suite[2]) { 
            facedealtoword = `hearts`;
        }
        else if (facedeal == cardDeck.suite[3]) { 
            facedealtoword = `diamond`;
        }
        let cardword = `${valuetoword[deal.slice(1, 3)]} of ${facedealtoword}`
     //   console.log(cardword);
         for (let i1 = 0; i1 < cardsdeal.length; i1++) { 
           // console.log(cardsdeal[i1]);
            if (cardsdeal[i1] == cardsdeal[i]) { 
                cardsdeal.splice(i1, 1);
            }
        }
        console.log(cardword);
        return [deal,cardword];
    }
}
function dealfive() {
    if (cardsdeal.length >= 5) {
        let deal5 = []
        let pair = [];
        let dealval = [];
        let straight;
        let flush;
        let cardhand;
        for (let i = 0; i < 5; i++) {
            deal5.push(dealOne()[0]);
        }
        //deal5 = ["♣3", "♣5", "♣2", "♣4", "♣6"]; // remember to remove later this is only for sample
        //console.log(deal5);
        /***********************************************************************
         * Code to get the kind of suit of selected card
        ***********************************************************************/
        for (let i = 1; i < deal5.length; i++) {
            prevSuite = deal5[0].slice(0, 1);
            let suite = deal5[i].slice(0, 1);
            if (prevSuite == suite) {
                flush = true;
                continue;
            }
            else {
                flush = false;
                break;
            }

        }
    /***************************************************************************
        * Code to Get only the value of the cards selected
       ************************************************************************/

        for (let i = 0; i < deal5.length; i++) {
            let suitechar = deal5[i].slice(1, 3)
            let suitevalue = Number(suitechar);
            if (!suitevalue) {
                switch (suitechar) {
                    case 'A':
                        suitevalue = 1;
                        break;
                    case 'J':
                        suitevalue = 11;
                        break;
                    case 'Q':
                        suitevalue = 12;
                        break;
                    case 'K':
                        suitevalue = 13;
                        break;
                }
            }
            dealval.push(suitevalue);
        }
        dealval.sort(function (a, b) { return a - b; }); //sort value of dealcard for easier checking of poker hand.
        /*****************************************************************************
         * Code to check for straight
        *****************************************************************************/
        for (let i = 0; i < dealval.length - 1; i++) {
            if ((dealval[i + 1] == dealval[i] + 1)) {
                straight = true
                continue;
            }
            else {
                straight = false;
                break;
            }
        }
        /*****************************************************************************
         * Code to check pair ,two pair, 3 of a kind, 4 of a kind and full house
        *****************************************************************************/
        for (let i = 0; i < dealval.length; i++) {

            for (let j = i + 1; j < dealval.length; j++) {
                if (dealval[i] == dealval[j]) {
                    pair.push(dealval[j])
                    break;
                }
                else {
                    break;
                }
            }
        }
        if (flush && straight) {
            cardhand = `"--straight flush--"`;
        }
        else if (flush) {
            cardhand = `"--flush--"`;
        }
        else if (straight) {
            cardhand = `"--straight--"`;
        }
        else if (pair.length == 1) {
            cardhand = `"--one pair--"`;
        }
        else if (pair.length == 2) {
            if (pair[0] == pair[1]) {
                cardhand = `"--Three if a kind--"`;
            }
            else {
                cardhand = `"--two pair--"`;
            }
        }
        else if (pair.length == 3) {
            if ((pair[0] == pair[1]) && (pair[1] == pair[2])) {
                cardhand = `"--four of a kind--"`;
            }
            else {
                cardhand = `"--Full House--"`;
            }
        }
        else {
            cardhand = `"--high card--"`;
        }
        console.log(cardhand);
        return [deal5,cardhand];
    }
    else { 
        cardhand = `"--not enough cards--"`;
        console.log(cardhand);
        return [cardsdeal,cardhand];
    }
}


let cards = createCardDeck();
//console.log(cards);
shuffleCards = shuffle(cards);
//console.log(shuffleCards);
let ArrangesuiteCards = arrangeBySuite(shuffleCards);
//console.log(ArrangesuiteCards);
let sortedCards = arrangeAccending(shuffleCards);
let cardsdeal = shuffleCards.slice();
//let deal5val = dealfive();

function creatediv(cards) { 
    let space = 0;
    for (let i = 0; i < 52; i++) { 
        cardDiv[i] = document.createElement('div');
        cardImg[i] = document.createElement(`img`);
        cardDiv[i].classList.add('card-div')
        cardArea.appendChild(cardDiv[i])
        cardDiv[i].appendChild(cardImg[i]);
/*         cardDiv[i].style.left = `${space}%`
        space += 1.8; */
    }
}

function changeimg(cards) {
    for (let i = 0; i < 52; i++) {
        cardImg[i].src = `/assets/${cards[i]}.png`
    }
}

function creatediv2(cards,cardslenght) { 
  
    if (cardslenght == 1) {
        console.log(cards);
        cardDiv = document.createElement('div');
        cardImg = document.createElement(`img`);
        cardDiv.classList.add('card-div2')
        cardArea2.appendChild(cardDiv)
        cardDiv.appendChild(cardImg);
        cardImg.src = `/assets/${cards}.png`
        cardDiv.style.left = '45%';


    } else {
        let space = 5;
        for (let i = 0; i < cardslenght; i++) { 
        cardDiv[i] = document.createElement('div');
        cardImg[i] = document.createElement(`img`);
        cardDiv[i].classList.add('card-div3')
        cardArea2.appendChild(cardDiv[i])
        cardDiv[i].appendChild(cardImg[i]);
        cardImg[i].src = `/assets/${cards[i]}.png`;
        cardDiv[i].style.left = `${space}%`;
            space += 20   
    }
 }
   
 }
creatediv(cards);
changeimg(cards)

btnShuffle.addEventListener('click', function () { 
    shuffleCards = shuffle(cards);
    animate.play();
    myAudio.play();
    changeimg(shuffleCards)
})

btnArrangeSuite.addEventListener('click', function () { 
    let ArrangebySuite = arrangeBySuite(shuffleCards);
    changeimg(ArrangebySuite);
    myAudio.play();
    animate.play();
})
btnArrangeAccending.addEventListener('click', function () { 
    let cardsAccending = arrangeAccending(shuffleCards);
    changeimg(cardsAccending);
    myAudio.play();
    animate.play();
})
btnArrangeDeccending.addEventListener('click', function () { 
    let cardsDeccending = arrangeDeccending(shuffleCards);
    changeimg(cardsDeccending);
    myAudio.play();
    animate.play();
})
btnStartDeal.addEventListener('click', function () { 
    cardArea.classList.add('hidden');
    btnarea1.classList.add('hidden');
    btnarea2.classList.remove('hidden')
    cardArea2.classList.remove('hidden')
    
})
btnDealone.addEventListener('click', function () { 
   
    let deals = dealOne();
    let deal = deals[0]
    cardwordtext.textContent = deals[1]
    cardDiv3 = document.querySelectorAll('.card-div3')
    for (let i = 0; i < cardDiv3.length; i++) {
       cardDiv3[i].classList.add('hidden')
    }

    if (deal) {
        creatediv2(deal, 1);
    }
})
btnDealfive.addEventListener('click', function () { 
    let deal5card = dealfive();
    if (cardsdeal.length >= 5) {
     
        let deal5 = deal5card[0];
        cardwordtext.textContent = deal5card[1];
        cardDiv3 = document.querySelector('.card-div3')
    
        if (deal5) {
            creatediv2(deal5, deal5.length)
        }
    }
    else {  cardwordtext.textContent = deal5card[1];}

})
cardcover.addEventListener('click', function () {
    changeimg(cards)
    animate.play();
    myAudio.play();
})
let elements = document.querySelectorAll('.card-div');
let animate = anime({
    targets: elements,
    keyframes: [
     
        {translateY: -250,translateX: function(el,i,l){return i*20}}],
    
    delay: function (el, i, l) {
        return i * 50
    },
    autoplay: false,
})