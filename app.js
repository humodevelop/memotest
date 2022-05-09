const emojis = ["🐶","🐱","🐰","🐻","🐯","🐮","🐷","🐵","🐴","🐸","🦒","🦊"]; //Lista de emojis
const grid = document.querySelector(".memotest-grid"); //grid contenedor


console.log(emojis);
console.log(GetRandomArray(emojis));
console.log(GetRandomArrayBySize(emojis, 5));

CreateGrid();

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
                <div onclick="Jeje(this)" class="memotest-card memotest-card-top"></div>
            </div>
            `;
        }
    }
}

function Jeje(element){
    element.classList.add("memotest-card-discover")
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