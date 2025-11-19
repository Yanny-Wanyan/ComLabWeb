let s = document.querySelector("span");
console.log(s)

function move(eventColored){
    console.log(eventColored.target)
    eventColored.target.style.color="red"
    let randomX = -200 +Math.random()*400
    let randomY = -200 +Math.random()*400
    eventColored.target.style.transform = "translate("+ randomX + "px, " + randomY + "px)";
    eventColored.target.style.transition = "transform 0.2s linear";

}

function moveBack(eventColored){
    console.log(eventColored.target)
    eventColored.target.style.transform = "translate(0px, 0px)";
    eventColored.target.style.transition = "transform 10s linear";
}

// s.addEventListener("mouseover",move);


function addMover(element){
    element.addEventListener("mouseover", move)
    element.addEventListener("mouseout", moveBack)
}
//select all the spans
let allSpans = document.querySelectorAll("span");
allSpans.forEach(addMover);

