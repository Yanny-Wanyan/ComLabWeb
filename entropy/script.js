// let notification = document.createElement("p");
let postposition = 10;
let phoneLength = 80;
let clickButton = document.querySelector(".clickButton");
let phone = document.querySelector(".phone-container");
let bgOriginal = document.querySelector(".bodyDefault");
// let body = document.querySelector(".bodyDefault");

function createNotification() {
    let notification = document.createElement("p");
    notification.innerText = "missCall";
    notification.className = "notification";
    notification.style.position = "absolute";
    notification.style.bottom = postposition + "px";
    postposition += 80;
    document.querySelector(".phone-container").append(notification);
    // console.log("button was click");
    return notification;
}
function createBulletingNote() {
    let bulletingNote = document.createElement("p");
    bulletingNote.innerText = "missCall";
    bulletingNote.className = "bulletingNote";
    bulletingNote.style.position = "absolute";
    //     let r = Math.floor(Math.random() * 256);
    // let g = Math.floor(Math.random() * 256);
    // let b = Math.floor(Math.random() * 256);
    // bulletingNote.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    // bulletingNote.style.color = "rgb(" + r + "," + g + "," + b + ")";
    document.querySelector("body").append(bulletingNote);
    return bulletingNote;
}
function drifting(notificationElement) {
    let driftX = (Math.random() - 0.5) * 2000 + 100;
    let driftY = (Math.random() - 0.5) * 2000 + 100;
    let driftR = (Math.random() - 0.5) * 50;
    let startX = (Math.random() - 0.5) * 2000;
    let startY = (Math.random() - 0.5) * 2000;
    let startR = (Math.random() - 0.5) * 50;
    let driftSpeed = Math.random() * 4 + 3;
    // let r = Math.floor(Math.random() * 256);
    // let g = Math.floor(Math.random() * 256);
    // let b = Math.floor(Math.random() * 256);
    // notificationElement.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    notificationElement.style.setProperty('--drift-x', driftX + 'px');
    notificationElement.style.setProperty('--drift-y', driftY + 'px');
    notificationElement.style.setProperty('--drift-r', driftR + 'deg');
    notificationElement.style.setProperty('--start-x', startX + 'px');
    notificationElement.style.setProperty('--start-y', startY + 'px');
    notificationElement.style.setProperty('--start-r', startR + 'deg');
    notificationElement.style.animation = `drift-animation ${driftSpeed}s ease-in-out infinite alternate`;
}
function StartDriftingAll() {
    // select all items and apply the function into each of them
    let bulletingNote = createBulletingNote();
    let allDriftingNotice = document.querySelectorAll(".bulletingNote");
    allDriftingNotice.forEach(drifting);
    console.log("start drifting applied to all.");
}
function pushing(item) {
    // when notices fill the phone, they start pushing and pulling each other
    // use random to set the pushing distance
    // select all items and apply the function into each of them
    let pushY = Math.random() * 30 - 10;
    let pushR = -Math.random() * 10 + 5;
    item.style.setProperty('--push-y', pushY + 'px');
    item.style.setProperty('--push-r', pushR + 'deg');
    // item.style.animationName = 'push-animation';
    item.style.animation = 'push-animation 2s ease-in-out 0s infinite alternate';
    console.log("start pushing");
}
function StartPushingAll() {
    // select all items and apply the function into each of them
    let allPushingNotice = document.querySelectorAll(".pushingNotice");
    allPushingNotice.forEach(pushing);
    console.log("start pushing applied to all.");
}

function hitting(item) {
    let hitY = Math.random() * 10 - 5;
    let hitX = Math.random() * 100 - 50;
    let hitR = -Math.random() * 10 + 5;
    item.style.setProperty('--hit-y', hitY + 'px');
    item.style.setProperty('--hit-x', hitX + 'px');
    item.style.setProperty('--hit-r', hitR + 'deg');
    item.style.animation = 'hit-animation 1s ease-out 0s infinite';
    console.log("start hitting");
}

function StarthittingAll() {
    // select all items and apply the function into each of them
    let allHittingNotice = document.querySelectorAll(".pushingNotice");
    allHittingNotice.forEach(hitting);
    console.log("start pushing applied to all.");
}

function missCall1() {
    notice1 = createNotification();
    notice1.classList.add('pushingNotice');
    document.querySelector("h1").innerText = "16:41";
    clickButton.onclick = missCall2;
}
function missCall2() {
    document.querySelector("h1").innerText = "16:45";
    notice2 = createNotification();
    notice3 = createNotification();
    notice4 = createNotification();
    notice5 = createNotification();
    notice6 = createNotification();
    notice2.classList.add('pushingNotice');
    notice3.classList.add('pushingNotice');
    notice4.classList.add('pushingNotice');
    notice5.classList.add('pushingNotice');
    notice6.classList.add('pushingNotice');
    clickButton.onclick = missCall3;
}
function missCall3() {
    document.querySelector("h1").innerText = "16:59";
    //phone starts to be stretched
    notice7 = createNotification();
    notice8 = createNotification();
    notice9 = createNotification();
    notice7.classList.add('pushingNotice');
    notice8.classList.add('pushingNotice');
    notice9.classList.add('pushingNotice');
    phone.classList.add('call-stretch-1');
    clickButton.onclick = missCall4;
    // StartPushingAll();
    // let bgOriginal = document.querySelector(".bodyDefault");
    // bgOriginal.classList.add('background');
}
function missCall4() {
    document.querySelector("h1").innerText = "17:05";
    //change phone background and notice starts pushing ups and downs
    notice10 = createNotification();
    notice11 = createNotification();
    notice10.classList.add('pushingNotice');
    notice11.classList.add('pushingNotice');
    phone.classList.add('call-stretch-2');
    clickButton.onclick = missCall5;
    StartPushingAll();
}
function missCall5() {
    document.querySelector("h1").innerText = "17:19";
    //change the whole background and notices starts to hit the phone frames
    notice12 = createNotification();
    notice13 = createNotification();
    notice14 = createNotification();
    notice12.classList.add('pushingNotice');
    notice13.classList.add('pushingNotice');
    notice14.classList.add('pushingNotice');
    phone.classList.add('call-stretch-3');
    clickButton.onclick = missCall6;

    StarthittingAll();
}
function missCall6() {
    phone.remove();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    createBulletingNote();
    StartDriftingAll();
    let bgOriginal = document.querySelector(".bodyDefault");
    bgOriginal.classList.add('background');
}
