let myButton = document.querySelector("#myButton");
let myInput = document.querySelector("#myInput");
let myOutput = document.querySelector("#myOutput");
// #1 define function
// function buttonClicked(){
// document.body.style.backgroundColor = "black";
// }
// myButton.addEventListener("click",buttonClicked);

//#2 another format that define function right where we reference it
myButton.addEventListener("mouseover",function(eventInfo){
document.body.style.backgroundColor = "black";
removeElement = console.log(eventInfo.target);
eventInfo.target.remove();
//target is the element that trigers the event
})

function inputChanged(eventInfo){
// console.log("Input changed!")
console.log(eventInfo.target.value);
myOutput.innerText = eventInfo.target.value;
}
myInput.addEventListener("input",inputChanged);
//if using "change" it only record the latest value


function addMover(element){
    element.addEventListener("mouseover", move)
}
//select all the spans
let allSpans = document.querySelectorAll("span");
allSpans.forEach(addMover);

