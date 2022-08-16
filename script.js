const firstCard = document.querySelector(".card");
const allCards = [];
const selectedCards = [];
let correct = 0;
let plays = 0;

function setUpGame(){
    const amount = Number(prompt("Com quantas cartas gostaria de jogar? (Insira números pares de 4 a 14)"));
    if(((amount)%2!==0)||(amount<4)||(amount>14)){
        setUpGame();
        return;
    }
    for(let i = 0;i<amount/2;i++){
        const card1 = cloneCard();
        const card2 = cloneCard();
        card1.id = card2.id = i;
        allCards.push(card1);
        allCards.push(card2);
        card1.querySelector(".back-face").querySelector("img").src = 
        card2.querySelector(".back-face").querySelector("img").src = "img/"+i+".gif";
    }
    firstCard.remove();
    allCards.sort(comparador);
    const cardHolder = document.querySelector(".card-holder");
    for(let i = 0; i<allCards.length;i++){
        cardHolder.appendChild(allCards[i]);
    }
}

function cardClick(card){
    if(selectedCards.includes(card) || (selectedCards.length == 2)){
        return;
    }
    rotateCard(card);
    plays++;
    selectedCards.push(card);
    if(selectedCards.length>1){
        if(selectedCards[0].id !== selectedCards[1].id){
            setTimeout(function(){
                rotateCard(selectedCards[0]);
                rotateCard(selectedCards[1]);
                canClick = true;
                selectedCards.length = 0;
            },1000);
        }else{
            selectedCards[0].onclick="";
            selectedCards[1].onclick="";
            correct++;
            selectedCards.length = 0;
        }
    };
    console.log(correct);
    if(correct*2 === allCards.length){
        setTimeout(victory,500);
    }
}   

function rotateCard(card){
    card.querySelector(".front-face").classList.toggle("rotate-front");
    card.querySelector(".back-face").classList.toggle("rotate-back");
}

function copyCard(amount){
    amount--;
    const cardHolder = document.querySelector(".card-holder");
    let clone;
    for(let i = 0;i<amount;i++){
        clone = firstCard.cloneNode(true);
        clone.id = "card" + (i+1);
        cardHolder.appendChild(clone);
    }
}

function cloneCard(){
    const card = document.querySelector(".card");
    let clone = card.cloneNode(true);
    return clone;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function victory(){
    alert(`Você ganhou em ${plays} jogadas!`);
}

window.onload = setUpGame;