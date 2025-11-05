let conatiner = document.querySelector("#container");
//create elemet in "js space":
let headline = document.createElement("h5");
// headline.innerText = "Welcome to my Page";
//put it on the page
// document.body.append(headline);

//put it in another element
// conatiner.append(headline);

function Welcome(){
    // console.log("click the button");
    headline.innerText = "Welcome to my Page";
    // conatiner.append(headline);
    conatiner.prepend(headline);
    //remove an element from the page
    document.querySelector(".notWanted").remove();
}

function MoveBox(){
conatiner.classList.toggle("move");

//random between 0 and 100
let r1 = Math.random();
console.log(r1);

//custom number size
let r2 = Math.random()*100;
console.log(r2);

//customized min and max
let r3 = 10 + Math.random()*10;

let r4 = Math.floor(r3);
console.log(r4);

document.querySelector(".notWanted").style.fontSize = r2 +"px";

}