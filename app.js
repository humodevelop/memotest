const emojis = ["🐶","🐱","🐰","🐻","🐯","🐮","🐷","🐵","🐴","🐸","🦒","🦊"]; //Lista de emojis
const grid = document.querySelector(".memotest-grid"); //grid contenedor
const startGameButton = document.querySelector(".start-game-button");

startGameButton.onclick = StartGame;

var firstCard = null;
var secondCard = null;
/*
    Aca se almacenan las 2 primeras cartas clickeadas.
    Cada una va a contener un objeto del tipo {emoji: "caracter" card: "elemento del DOM"}
    Propiedades del objeto:
    -emoji: se utiliza para comparar las cartas.
    -card: se utiliza para modificar el elemento del DOM por JavaScript.
*/


//CreateGrid();


function StartGame(){
    firstCard = secondCard = null;
    CreateGrid();
}


function CreateGrid(){
    grid.innerHTML ="";
    let array = GetRandomArrayBySize(emojis, 10);
    //Obtengo un array random de un tamaño de 10 elementos.
    for(i = 0; i< 2; i++){
        let unsortedArray = GetRandomArray(array);
        //Desordeno el array cada vez que creo los elementos
        for(let j = 0; j < unsortedArray.length; j++){
            grid.innerHTML += `
            <div class="memotest-card">${array[j]}
                <div onclick="OnClickCard(this, '${array[j]}')" class="memotest-card memotest-card-top"></div>
            </div>
            `;
        }
    }
}

function OnClickCard(element, emoji){
    if(firstCard == null){
        //Primer carta clickeada
        firstCard = GetCard(emoji, element); //Guardar la primer carta
        firstCard.card.style.animationName = "fadeOut"; //Hacer que se vea ocultando el div que tiene encima
    }
    else{
        if(secondCard == null){
            //Segunda carta clickeada
            secondCard = GetCard(emoji, element); //Guardar la segunda carta
            secondCard.card.style.animationName = "fadeOut"; //Hacer que se vea ocultando el div que tiene encima
            if(firstCard.emoji == secondCard.emoji){
                //Cartas correctas
                //Desactivar el evento onclick porque estas cartas fueron correctas
                firstCard.card.onclick = null;
                secondCard.card.onclick = null;
                firstCard = secondCard = null;
                //Establecer la cartas como nulas para que esta funcion pueda ser llamada
            }
            else{
                //Cartas incorrectas
                //Determinar un tiempo para ocultar las cartas
                setTimeout(HideActiveCards, 1000);
            }
        }
    }
}

function HideActiveCards(){
    firstCard.card.style.animationName = "fadeIn";
    secondCard.card.style.animationName = "fadeIn";
    firstCard = secondCard = null;
}

function GetCard(emoji, element){
    let card = {emoji: emoji, card: element};
    return card;
}

function GetRandomArrayBySize(array, size){
    let lenght = size>array.lenght? array.lenght:size; 
    /*
        Si el tamaño recibido es mayor al tamaño del array, devovler el tamaño del array, sino, el tamaño especificado
    */ 
    return GetRandomArray(array).slice(0, lenght);
    /*
        Array.slice(n1, n2) = devuelve un nuevo array desde el indice "n1" hasta el "n2"
    */
}

function GetRandomIndexFromArray(array){
    return Math.floor(Math.random() * array.length);
    /*
        Mathf.floor() = retorna un entero
        Math.random() = retorna un numero entre 0 y 1
    */
}

function GetRandomArray(array){
    let newArray = array.sort(function(){ return Math.random() -0.5});
    return newArray;
    /*
    Array.sort() = ordena el array
    Array.sort(function(a,b){condicion}) ordena el array dependiendo la condicion entre el elemento "a" y "b"
    las comparaciones son  <0, ==0, >0 entre los indices de "a" y "b"

    Math.random () = devuelve un numero entre 0 y 1
        se le resta -0.5 porque se necesita un valor menor, igual o mayor a cero
        para que el Array.sort() funcione.
    
    */
}