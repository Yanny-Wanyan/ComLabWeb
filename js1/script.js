let myName = "leon";
let temperature = 16;

let headline = document.querySelector("h1");

// document. querySelector("h1").innerText = "Tried it. Didn't like it.";

// alert("Hello world " + myName +"! It is " + temperature + " today") ;

temperature = 20;
//  alert("now it is" + temperature + "now")

console.log("the page has loaded and the temperature is" + temperature);

function doManyThings(){
    console.log("button was clicked");
//     alert("Hi"+myName+"! It is "+temperature+"degree");
}
function greet(greeting){
    console.log("received:"+greeting);
    // alert(greeting);
    headline.innerText = "Tried it. Didn't like it."
}

let myText = document.querySelector(".myText");

function changeText(){
    console.log("click the button");
    // myText.innerText = "HAHAHAHA";
    myText.innerHTML = "click <a herf='#'>here</a>";
    headline.style.textDecoration = "underline";
    // myText.style.background-color
}
