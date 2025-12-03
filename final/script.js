const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const body = document.querySelector("body");
const moonImg = document.querySelector("#moon-img");
const follow = document.getElementById("follow");

const r = 300;


let scrollFinished = false;
let isFollowing = false;
let extraPagesCreated = false;
let extraStart = null;
let extraHeight = 0;

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

// let moon and sun translate in a circle
window.addEventListener("scroll", function () {
    const percentage = getScrollPercentage();
    const scrollTop = window.scrollY;




    // convert percentage (0..100) to radians (0..2π)
    const rotations = 2.25;
    const angle = (percentage / 100) * Math.PI * 2 * rotations;

    // compute positions && Brightness for moon and sun
    const sunX = Math.cos(angle) * r;
    const sunY = Math.sin(angle) * r;
    const moonX = Math.cos(angle + Math.PI) * r;
    const moonY = Math.sin(angle + Math.PI) * r;
    const sunB = Math.abs(sunY) * (1 / 5) + 40;
    const moonB = Math.abs(moonY) * (1 / 3);

    // apply transforms
    if (moon) moon.style.transform = 'translate(' + moonX + 'px, ' + moonY + 'px)';
    if (sun) sun.style.transform = 'translate(' + sunX + 'px, ' + sunY + 'px)';

    // alternate visibility && set brightness
    if (moon) {
        if (moonY >= 0) {
            moon.style.opacity = '0';
            body.classList.remove("midnight-background");
        } else {
            moon.style.opacity = '1';
            moon.style.filter = "brightness(" + moonB + "%)";
            body.classList.add("midnight-background");
        }
    }

    if (sun) {
        if (sunY >= 0) {
            sun.style.opacity = '0';
            body.classList.remove("daytime-background");
        } else {
            sun.style.opacity = '1';
            sun.style.filter = "brightness(" + sunB + "%)";
            body.classList.add("daytime-background");
        }

    }

    // scale the last moon
    const finalStartPerc = 100 * (rotations - 1) / rotations;
    if (percentage > finalStartPerc) {
        const finalProgress = Math.max(0, Math.min(1, (percentage - finalStartPerc) / (100 - finalStartPerc)));
        const scale = 1 + finalProgress;
        moonImg.style.transform = `scale(${scale})`;
    } else {
        moonImg.style.transform = `scale(1)`;
    }

    console.log(percentage);

    //  true
    if (percentage >= 99) {
        scrollFinished = true;
    }
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




