let hourSelector = document.querySelector("#hour-selector");
let minSelector = document.querySelector("#minute-selector");
let secSelector = document.querySelector("#second-selector");
let body = document.querySelector("body");
function getTheTime() {
    let now = new Date();
    let h = now.getHours();      // 0–23
    let m = now.getMinutes();    // 0–59
    let s = now.getSeconds();    // 0–59
    console.log(h, m, s);

    let hourPos = h * 5 / 3;
    let minPos = m * 5 / 3;
    let secPos = s * 5 / 3;
    hourSelector.style.left = hourPos + "%"
    minSelector.style.left = minPos + "%"
    secSelector.style.left = secPos + "%"

    let hColor = h * 6;
    let mColor = 100-m * 5 / 3;
    let sColor = 100-s * 5 / 3;
    body.style.backgroundColor = `hsl(${hColor}, ${mColor}%, ${sColor}%)`;
}



setInterval(getTheTime, 1000);






// leons function for you:
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}