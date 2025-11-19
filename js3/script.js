let firstButton = document.querySelector("#firstButton");


//we give an element to this function and let the function change it
function colorize(elm){
// elm.innerText = "started";
elm.style.backgroundColor = "red";
elm.classList.toggle(".circle");
}

function clickedButton() {
let b = document.querySelector(".box");
// colorize(b);
console.log(b);
let bs = document.querySelectorAll(".box");
console.log(bs);
bs.forEach(colorize);
}