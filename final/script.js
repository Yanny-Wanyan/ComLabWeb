const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const body = document.querySelector("body");

const r = 300;

//set initial position
moon.style.transform = `translate(${-r}px, 0px)`;
sun.style.transform = `translate(${r}px, 0px)`;

//get the scrolling position data
function getScrollPercentage() {
    let scrollTop = window.scrollY
    let maxScroll = document.body.scrollHeight - window.innerHeight
    let perc = (scrollTop / maxScroll) * 100

    return perc
}

//let moon and sun translate in a circle
window.addEventListener("scroll", function () {
    const percentage = getScrollPercentage();

    // convert percentage (0..100) to radians (0..2π)
    rotations = 3
    const angle = (percentage / 100) * Math.PI * 2 * rotations;

    // compute positions && Brightness for moon and sun
    const sunX = Math.cos(angle) * r;
    const sunY = Math.sin(angle) * r;
    const moonX = Math.cos(angle + Math.PI) * r;
    const moonY = Math.sin(angle + Math.PI) * r;
    const sunB = Math.abs(sunY) * (1 / 5) + 40;
    const moonB = Math.abs(moonY) * (1 / 3);
    
    let backdropOpac = Math.abs(sunY)* (1 / 3)*(1/100);



    // apply transforms
    if (moon) moon.style.transform = 'translate(' + moonX + 'px, ' + moonY + 'px)';
    if (sun) sun.style.transform = 'translate(' + sunX + 'px, ' + sunY + 'px)';

    // alternate visibility (hide when below horizon (y > 0)) && set brightness
    if (moon) {
        if (moonY >= 0) {
            // moon is below horizon -> hide
            moon.style.opacity = '0';
            body.classList.remove("midnight-background");
            // body.classList.add("daytime-background");
        } else {
            // moon is above horizon -> show and make background darker
            moon.style.opacity = '1';
            moon.style.filter = "brightness(" + moonB + "%)";
            body.classList.add("midnight-background");
            // body.style.backgroundColor = 'black';
        }
    }

    if (sun) {
        if (sunY >= 0) {
            // sun is below horizon -> hide
            sun.style.opacity = '0';
            body.classList.remove("daytime-background");
        } else {
            // sun is above horizon -> show and make background brighter
            sun.style.opacity = '1';
            sun.style.filter = "brightness(" + sunB + "%)";
            body.classList.add("daytime-background");
            // body.style.opacity = Math.max(0, Math.min(1, backdropOpac));
            // body.style.backgroundColor = 'white';
        }
    }
// console.log(moonB);
    // console.log('moon', moonX.toFixed(1), moonY.toFixed(1), 'sun', sunX.toFixed(1), sunY.toFixed(1));

console.log(percentage)

if (percentage > 67){
    moon.style.transform = "scale(1.5)"
} else if (percentage > 70){
    moon.style.tranform = "scale(2)"
} else if (percentage > 72){
    moon.style.tranform = "scale(2)"
}
});


