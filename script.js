const firstCard = document.querySelector(".card");
const allCards = [];
const selectedCards = [];
let correct = 0;
let plays = 0;

    //Stopwatch-Start
let seconds = 00; 
let tens = 00; 
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset');
let Interval ;
    //Stopwatch-End

function setUpGame(){
    firstCard.remove();
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
    
    allCards.sort(comparador);
    const cardHolder = document.querySelector(".card-holder");
    for(let i = 0; i<allCards.length;i++){
        cardHolder.appendChild(allCards[i]);
    }
    startStopwatch();
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
    if(correct*2 === allCards.length){
        stopStopwatch();
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
    const clone = firstCard.cloneNode(true);
    return clone;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function victory(){
    const sec = document.getElementById("seconds").innerHTML;
    const ten = document.getElementById("tens").innerHTML;
    alert(`Você ganhou em ${plays} jogadas e ${sec}.${ten} segundos!`);
    restartGame();
}

function restartGame(){
    const l = allCards.length;
    for(let i = 0; i<l; i++){
        allCards[l-1-i].remove();
    }
    allCards.length = 0;
    correct = 0;
    plays = 0;
    resetStopwatch();
    const resposta = prompt("Gostaria de jogar novamente? (sim/não)");
    if(resposta === "sim"){
        setUpGame();
    }
}

function startStopwatch() {  
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

function stopStopwatch(){
    clearInterval(Interval);
}

function resetStopwatch(){
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
}

function startTimer () {
    tens++; 
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
}
window.onload = setUpGame;