// create moon and sun elements in JS (no pre-existing HTML needed)
let moon = document.querySelector('#moon');
let sun = document.querySelector('#sun');
let backgroundImg = document.querySelector('#background-image')

if (!moon) {
    moon = document.createElement('img');
    moon.id = 'moon';
    moon.className = 'moving-sun-and-moon';
    moon.src = 'assets/sun-and-moon/moon-1.png';
    moon.style.position = 'fixed';
    moon.style.left = '50%';
    moon.style.top = '50%';
    document.body.appendChild(moon);
}
if (!sun) {
    sun = document.createElement('img');
    sun.id = 'sun';
    sun.className = 'moving-sun-and-moon';
    sun.src = 'assets/sun-and-moon/sun.png';
    sun.style.position = 'fixed';
    sun.style.left = '50%';
    sun.style.top = '50%';
    document.body.appendChild(sun);
}
const body = document.querySelector("body");
// const moonImg = document.querySelector("#moon-img");
const follow = document.getElementById("follow");

const r = 300;


let scrollFinished = false;
let isFollowing = false;
let extraPagesCreated = false;
let extraStart = null;
let extraHeight = 0;

let isMoonFirstCreated = false;
let isMoonSecCreated = false;
let isMoonThirdCreated = false;
let isMoonFourthCreated = false;

// set initial position
moon.style.transform = `translate(${-r}px, 0px)`;
sun.style.transform = `translate(${r}px, 0px)`;

// get the scrolling position data
function getScrollPercentage() {
    let scrollTop = window.scrollY;
    let maxScroll = document.body.scrollHeight - window.innerHeight;
    let perc = (scrollTop / maxScroll) * 100;
    return perc;
}

// extract scroll handler into a separate function so it can be called on load and on scroll
function updateMoonAndSun() {
    const percentage = getScrollPercentage();
    const scrollTop = window.scrollY;

    // convert percentage (0..100) to radians (0..2π)
    const rotations = 2.25;
    const angle = (percentage / 100) * Math.PI * 2 * rotations;
    const progress = (percentage / 100) * rotations;
    console.log(progress);
    // compute positions && Brightness for moon and sun
    const sunX = Math.cos(angle) * r;
    const sunY = Math.sin(angle) * r;
    const moonX = Math.cos(angle + Math.PI) * r;
    const moonY = Math.sin(angle + Math.PI) * r;
    const sunB = Math.abs(sunY) * (1 / 5) + 40;
    const moonB = Math.abs(moonY) * (1 / 3);


    // change moon image each round to show its growth from incomplete to full
    if (progress > 0 && progress < 1 && isMoonFirstCreated == false) {
        moon.src = "assets/sun-and-moon/moon-1.png";
        isMoonFirstCreated = true;
    }
    if (progress > 1 && progress < 2 && isMoonSecCreated == false) {
        moon.src = "assets/sun-and-moon/moon-3.png";
        isMoonSecCreated = true;
    }
    if (progress > 2 && isMoonThirdCreated == false) {
        moon.src = "assets/sun-and-moon/moon-4.png";
        isMoonThirdCreated = true;
        moon.style.cursor = 'pointer';
        moon.style.pointerEvents = 'auto';
        body.style.setProperty('--moon-text-gif', 'url("assets/moon-text-2.gif")');
        body.style.setProperty('--moon-text-opacity', '1');
        body.style.setProperty('--star-opacity', '0');
    }

    // apply transforms
    if (moon) moon.style.transform = 'translate(' + moonX + 'px, ' + moonY + 'px)';
    if (sun) sun.style.transform = 'translate(' + sunX + 'px, ' + sunY + 'px)';

    // alternate visibility && set brightness
    if (moon) {
        if (moonY >= 0) {
            moon.style.opacity = '0';
            body.style.setProperty('--star-opacity', '0');
            // body.classList.remove("midnight-background");
        } else {
            moon.style.opacity = '1';
            body.style.setProperty('--star-opacity', '0.2');
            moon.style.filter = "brightness(" + moonB + "%)";
            // backgroundImg.style.opacity = '0.2';
            // body.classList.add("midnight-background");
        }
    }

    if (sun) {
        if (sunY >= 0) {
            sun.style.opacity = '0';
            // body.classList.remove("daytime-background");
        } else {
            sun.style.opacity = '1';
            sun.style.filter = "brightness(" + sunB + "%)";
            // body.classList.add("daytime-background");
        }
    }

    if (backgroundImg) {
        if (sunY >= 0) {
            backgroundImg.style.opacity = '0.2';
            backgroundImg.style.filter = "brightness(0.5)";
        } else {
            backgroundImg.style.opacity = '1';
            backgroundImg.style.filter = "brightness(" + sunB + "%)";
        }
    }
    // scale the last moon (apply to moon element)
    const finalStartPerc = 100 * (rotations - 1) / rotations;
    if (percentage > finalStartPerc) {
        const finalProgress = Math.max(0, Math.min(1, (percentage - finalStartPerc) / (100 - finalStartPerc)));
        const scale = 1 + finalProgress;
        if (moon) moon.style.transform = `translate(${moonX}px, ${moonY}px) scale(${scale})`;
    } else {
        if (moon) moon.style.transform = `translate(${moonX}px, ${moonY}px) scale(1)`;
    }

    // mark finished
    if (percentage >= 99) {
        scrollFinished = true;
    }
}

// let moon and sun translate in a circle
window.addEventListener("scroll", function () {
    updateMoonAndSun();
});

// create a function to follow the mouse
function handleMouseMove(e) {
    follow.style.left = e.clientX + 10 + "px";
    follow.style.top = e.clientY + 10 + "px";
}


// only start the following of the grandpa when the scroll is finished and the moon is clicked
moon.addEventListener("click", function () {
    console.log("Moon clicked! scrollFinished:", scrollFinished, "isFollowing:", isFollowing);  // ✅ 调试用

    if (scrollFinished == true && isFollowing == false) {
        follow.style.display = "block";
        isFollowing = true;
        document.addEventListener("mousemove", handleMouseMove);

        //set timeout to redirect to transition.html
        setTimeout(() => {
            window.location.href = "transition.html";
        }, 500);
    } else {
        console.log("not enough conditions to click");
    }
});

// Call updateMoonAndSun on page load to set initial state (percentage=0)
document.addEventListener("DOMContentLoaded", function () {
    updateMoonAndSun();
});




