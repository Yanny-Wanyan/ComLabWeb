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
let isGrandpaImgCreated = false;
let isMoonFirstCreated = false;
let isMoonSecCreated = false;
let isMoonThirdCreated = false;
let isMoonFourthCreated = false;
let clickScrollPosition = 0;

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
            backgroundImg.style.filter = "brightness(0.7)";
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
function handleScroll() {
    updateMoonAndSun();
}

window.addEventListener("scroll", handleScroll);

// create a function to follow the mouse
function handleMouseMove(e) {
    if (isFollowing == true) {
        follow.style.left = e.clientX + 10 + "px";
        follow.style.top = e.clientY + 10 + "px";
    }
}


// only start the following of the grandpa when the scroll is finished and the moon is clicked
moon.addEventListener("click", function () {
    const percentage_2 = getScrollPercentage();
    console.log(percentage_2);

    if (scrollFinished == true && isFollowing == false) {
        follow.style.display = "block";
        isFollowing = true;
        document.addEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
        backgroundImg.remove();
        body.style.setProperty('--star-opacity', '0');
        body.style.setProperty('--moon-text-opacity', '0');

        // record scroll position when moon is clicked
        clickScrollPosition = window.scrollY;

        // create extra-page
        const page = document.createElement("div");
        page.className = "extra-page";
        body.appendChild(page);

        const townBg = document.createElement("div");
        townBg.id = "small-town-background";
        const img = document.createElement("img");
        img.src = "assets/on-the-way-to-market.png";
        img.alt = "";
        townBg.appendChild(img);
        body.appendChild(townBg);
        
        
        // scrolling event
        townBg.addEventListener("scroll", function() {
            const grandpaImg = document.querySelector('#grandpa-img');
            if (grandpaImg) {
                updateGrandpaWalking(grandpaImg);
            }
            
            const percentageX = getScrollXPercentage();
            if (percentageX >= 99.9 && !document.querySelector('#supermarket-hotspot')) {
                
                createSupermarketHotspot(townBg, img);
            }
        });

        // add scroll listener for tracking progress after click
        window.addEventListener("scroll", function handleClickScroll() {
            
            const currentScroll = window.scrollY;
            const scrolledSinceClick = currentScroll - clickScrollPosition;
            const maxScrollAfterClick = document.body.scrollHeight - window.innerHeight - clickScrollPosition;
            const percentageAfterClick = (scrolledSinceClick / maxScrollAfterClick) * 100;
            
            // 获取scrollXPercent
            const scrollXPercent = getScrollXPercentage();
           

            // get all grandpa spans
            const grandpas = document.querySelectorAll('#follow .grandpa');

            // apply different effects based on percentage, with unique offset for each span
            grandpas.forEach((el, index) => {
                const phaseOffset = index * Math.PI;  // offset each span's animation by 180 degrees

                if (percentageAfterClick < 20) {
                    // 0-20%: shake effect 
                    const shakeAmount = Math.sin(percentageAfterClick * 10 + phaseOffset) * 20;
                    el.style.transform = `translateX(${shakeAmount}px)`;
                } else if (percentageAfterClick < 40) {
                    // 20-40%: random movement
                    const randomX = (Math.random() - 0.5) * 50 * (index === 0 ? 1 : -1);
                    const randomY = (Math.random() - 0.5) * 100;
                    el.style.transform = `translate(${randomX}px, ${randomY}px)`;
                } else if (percentageAfterClick < 60) {
                    // 40-60%: scale up and down
                    const scaleAmount = 1 + Math.sin((percentageAfterClick - 40) * 5 + phaseOffset) * 0.3;
                    el.style.transform = `scale(${scaleAmount})`;
                } else if (percentageAfterClick < 75) {
                    // 60-80%: spin and move 
                    const rotationDirection = index === 0 ? 1 : -1;
                    const rotation = (percentageAfterClick - 60) * 10 * rotationDirection;
                    const moveY = Math.sin((percentageAfterClick - 60) * 5 + phaseOffset) * 10;
                    el.style.transform = `rotate(${rotation}deg) translateY(${moveY}px)`;
                } else if (percentageAfterClick < 93) {
                    // 80%-95%: return to normal
                    el.style.transform = 'none';
                } else if (percentageAfterClick < 96) {
                    // 95%-97%: brakes
                    const brakeProgress = (percentageAfterClick - 95) / 2;  
                    const scale = 1 - brakeProgress * 0.7;  
                    const moveUp = -brakeProgress * 50;  
                    el.style.transform = `scale(${scale}) translateY(${moveUp}px)`;
                } else if (percentageAfterClick < 98) {
                    // 97%-99%: quicky falling down
                    const fallProgress = (percentageAfterClick - 97) / 2;
                    const scale = 0.3 + (1 - fallProgress) * 0.7;  
                    // calculate the falling distance
                    const distanceToBottom = window.innerHeight / 2 - 55;
                    const moveDown = -50 + fallProgress * distanceToBottom;
                    el.style.transform = `scale(${scale}) translateY(${moveDown}px)`;
                } else {
                    // 98%+: stop at the ground and disappear
                    const distanceToBottom = window.innerHeight / 2 - 60;
                    el.style.transition = 'opacity 2s ease-out';
                    el.style.opacity = '0';
                    if (isGrandpaImgCreated = true) {
                        el.style.transition = 'opacity 2s ease-out';
                        el.style.opacity = '0';
                    }
                    
                    if (index === 0) {
                        
                        const scale = 1.2;
                        const rotation = -15;  
                        const offsetX = -100;  
                        el.style.transform = `translateY(${distanceToBottom}px) translateX(${offsetX}px) scale(${scale}) rotate(${rotation}deg)`;

                    } else {
                        
                        const scale = 0.8;
                        const rotation = 20;  
                        const offsetX = 50;  
                        el.style.transform = `translateY(${distanceToBottom}px) translateX(${offsetX}px) scale(${scale}) rotate(${rotation}deg)`;

                    }
                    isFollowing = false;
                }
            });

            // create grandpa image
            if (percentageAfterClick >= 98) {
                let grandpaImg = document.querySelector('#grandpa-img');
                
                
                if (!grandpaImg) {
                    grandpaImg = document.createElement('img');
                    grandpaImg.id = 'grandpa-img';
                    grandpaImg.src = 'assets/grandpa.png';
                    grandpaImg.style.position = 'fixed';
                    grandpaImg.style.bottom = '20px';
                    grandpaImg.style.height = '270px';
                    grandpaImg.style.zIndex = '999';
                    document.body.appendChild(grandpaImg);
                    
                }
                

                if (percentageAfterClick < 99.5) {
                    
                    updateGrandpaEntrance(grandpaImg, percentageAfterClick, scrollXPercent);
                }
            }
            

            if (percentageAfterClick >= 99.5) {
                let grandpaImg = document.querySelector('#grandpa-img');
                if (grandpaImg) {
                    updateGrandpaWalking(grandpaImg);
                }
            }

            if (percentageAfterClick > 10) {
                moon.style.transition = 'opacity 0.5s ease-out';
                moon.style.opacity = '0';
                setTimeout(() => {
                    moon.remove();
                }, 500);

            }
        });
    } else {
        console.log("not enough conditions to click");
    }

});

function getScrollXPercentage(){
    
    const townBg = document.querySelector('#small-town-background');
    
    if (!townBg) return 0;  
    
    const scrollLeft = townBg.scrollLeft;  
    const scrollWidth = townBg.scrollWidth;  
    const clientWidth = townBg.clientWidth;  
    const maxHorizontalScroll = scrollWidth - clientWidth;
    console.log(scrollLeft)
    if (maxHorizontalScroll === 0) return 0;
    const percentageX = (scrollLeft / maxHorizontalScroll) * 100;
    console.log("percentage:", percentageX);
    return percentageX;
}

// create a hotspot at supermarket place
function createSupermarketHotspot(townBg, bgImg) {
    
    const supermarketHotspot = document.createElement('div');
    supermarketHotspot.id = 'supermarket-hotspot';
    supermarketHotspot.style.position = 'absolute';
    supermarketHotspot.style.cursor = 'pointer';
    supermarketHotspot.style.backgroundColor = 'transparent'; 
    // supermarketHotspot.style.border = '2px solid rgba(255, 255, 255, 0.2)';

    supermarketHotspot.style.right = '60px';      
    supermarketHotspot.style.bottom = '50px';     
    supermarketHotspot.style.width = '500px';     
    supermarketHotspot.style.height = '300px';    
    
    
    supermarketHotspot.addEventListener('mouseenter', function() {
        supermarketHotspot.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        supermarketHotspot.style.cursor = 'pointer';
    });
    
    supermarketHotspot.addEventListener('mouseleave', function() {
        supermarketHotspot.style.backgroundColor = 'transparent';
    });
    
    // transit to supermarket page
    supermarketHotspot.addEventListener('click', function() {
        window.location.href = 'supermarket.html';  
    });
    
   
    townBg.appendChild(supermarketHotspot);
}

// Call updateMoonAndSun on page load to set initial state (percentage=0)
document.addEventListener("DOMContentLoaded", function () {
    updateMoonAndSun();
});

window.addEventListener("scroll", () => {
    //   console.log("scrollTop:", window.scrollY);
    console.log("scrollLeft:", window.scrollY);
});


// grandpa walking pose
function getGrandpaWalkPose(percentage) {
    const walkWave = Math.sin(percentage * Math.PI) * 5;
    return walkWave;
}

// granpa quickly enter the page
function updateGrandpaEntrance(grandpaImg, percentageAfterClick, scrollXPercent) {
    if (!grandpaImg) return;

    const entranceProgress = Math.min(1, (percentageAfterClick - 98) / 2);
    
    const startLeft = -200;
    const targetLeft = 50;
    const currentLeft = startLeft + (targetLeft - startLeft) * entranceProgress;
    
    
    const walkPose = getGrandpaWalkPose(entranceProgress * 100);
    
    
    grandpaImg.style.transform = `translateX(${currentLeft}px) rotate(${walkPose}deg)`;
    
    // 创建或更新右上角的文字图片 div
    let goToMarketDiv = document.querySelector('#go-to-market-text-container');
    if (!goToMarketDiv) {
        goToMarketDiv = document.createElement('div');
        goToMarketDiv.id = 'go-to-market-text-container';
        goToMarketDiv.style.position = 'fixed';
        goToMarketDiv.style.top = '50px';
        goToMarketDiv.style.right = '50px';
        goToMarketDiv.style.zIndex = '1000';
        document.body.appendChild(goToMarketDiv);
        
        const textImg = document.createElement('img');
        textImg.id = 'go-to-market-text-img';
        textImg.src = 'assets/go-to-market-text.gif';
        textImg.style.width = '300px';
        textImg.style.height = 'auto';
        goToMarketDiv.appendChild(textImg);
    }
    
    // 根据scrollXPercent更换图片
    // const textImg = document.querySelector('#go-to-market-text-img');
    // if (textImg) {
    //     if (scrollXPercent > 95) {
    //         textImg.src = 'assets/go-to-market-text-2.gif';
    //     } else {
    //         textImg.src = 'assets/go-to-market-text.gif';
    //     }
    // }
}
//grandpa walking by scrolling
function updateGrandpaWalking(grandpaImg) {
    if (!grandpaImg) return;
    const scrollXPercent = getScrollXPercentage();
    
    const grandpaWidth = 180;
   
    const startLeft = 50;
    const targetLeft = window.innerWidth - grandpaWidth - 500;
    const currentLeft = startLeft + (targetLeft - startLeft) * (scrollXPercent / 100);
    console.log(currentLeft)
    
    const walkPose = getGrandpaWalkPose(scrollXPercent);
    
   
    grandpaImg.style.transform = `translateX(${currentLeft}px) rotate(${walkPose}deg)`;
    
    // 更新右上角文字图片
    const textImg = document.querySelector('#go-to-market-text-img');
    if (textImg) {
        if (scrollXPercent > 95) {
            textImg.src = 'assets/go-to-market-text-2.gif';
        } else {
            textImg.src = 'assets/go-to-market-text.gif';
        }
    }
}