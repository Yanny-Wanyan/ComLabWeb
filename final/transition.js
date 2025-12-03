const body = document.querySelector("body");
const follow = document.getElementById("follow");
let lettersDropped = false;
let grandpaImageShown = false;

let mouseX = 100;
let mouseY = 100;
let grandpaImg;
let controlingGrandpa = true;

// Let a text "grandpa" appears on the cursor
function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    
    follow.style.left = mouseX + 10 + "px";
    follow.style.top = mouseY + 10 + "px";
}


follow.style.display = "block";
document.addEventListener("mousemove", handleMouseMove);


const page = document.createElement("div");
page.className = "extra-page";
body.appendChild(page);


// transit to the town image after the scrolling down to daytime
const townBg = document.createElement("div");
townBg.id = "small-town-background";
const img = document.createElement("img");
img.src = "assets/small-town-background-reference.png";
img.alt = "";
townBg.appendChild(img);
body.appendChild(townBg);

// while scrolling the letters fall apart and disappear
window.addEventListener("scroll", function (e) {
    console.log(e)
    const scrollTop = window.scrollY;
    const extraPageTop = page.offsetTop;
    const extraPageHeight = page.offsetHeight;
    const scrollProgress = (scrollTop - extraPageTop) / extraPageHeight; // 0 ~ 1

    if (scrollProgress > 0.4 && !lettersDropped) {
        lettersDropped = true;
      
        const letters = document.querySelectorAll(".grandpa");
        const spreadX = window.innerWidth * 1.5;      // wider horizontal range
        const minY = window.innerHeight * 1.2;        // below the viewport
        const maxY = window.innerHeight * 3;          // even further down
      
        letters.forEach((letter) => {
          const randomX = (Math.random() - 0.5) * spreadX;
          const randomY = minY + Math.random() * (maxY - minY);
      
          letter.style.transition = "transform 8s ease-out, opacity 7s ease-out";
          letter.style.transform = `translate(${randomX}px, ${randomY}px)`;
          letter.style.opacity = "0";
        });
      }
    if (scrollProgress > 0.8) {

        follow.style.display = "none";
        
        if(grandpaImg == undefined){
            grandpaImg = document.createElement("img");
            grandpaImg.src = "assets/grandpa.png";
            grandpaImg.alt = "grandpa";
            grandpaImg.style.position = "fixed";
            grandpaImg.style.pointerEvents = "none";
            grandpaImg.style.width = "120px";
            grandpaImg.style.height = "auto";
            // grandpaImg.style.marginTop = "-100%"
            grandpaImg.style.transform = "translate(-50%, -94%)";
            grandpaImg.style.zIndex = "999";
            grandpaImg.id="grandpaImg";

            body.appendChild(grandpaImg);
        }
        
        
        grandpaImg.style.left = mouseX + "px";
        grandpaImg.style.top = mouseY + "px";


        document.addEventListener("mousemove", function moveGrandpa(e) {
            if(controlingGrandpa == true){
                grandpaImg.style.top = e.clientY + "px";
                grandpaImg.style.left = e.clientX + "px";
            
            }

            let greenY = window.innerHeight * 0.875;

            if(scrollProgress > 0.99 && e.clientY > greenY){
                controlingGrandpa = false;
                grandpaImg.style.top = greenY + "px";
            }
            

            // let greenY = window.innerHeight * 0.875;
            // console.log(scrollProgress)
            // if(e.clientY  < greenY){
            //     grandpaImg.style.top = e.clientY + "px";
            // }
            // grandpaImg.style.left = e.clientX + "px";
            
        });
    }
});