const body = document.querySelector("body");
const follow = document.getElementById("follow");
let lettersDropped = false;
let grandpaImageShown = false;

// Let a text "grandpa" appears on the cursor
function handleMouseMove(e) {
    follow.style.left = e.clientX + 10 + "px";
    follow.style.top = e.clientY + 10 + "px";
}

// 显示 grandpa 并开始跟随
follow.style.display = "block";
document.addEventListener("mousemove", handleMouseMove);

// 创建 8 屏高的渐变页面
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
window.addEventListener("scroll", function () {
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
      
          letter.style.transition = "transform 6s ease-out, opacity 5s ease-out";
          letter.style.transform = `translate(${randomX}px, ${randomY}px)`;
          letter.style.opacity = "0";
        });
      }
    if (scrollProgress > 0.8) {

        follow.style.display = "none";
        const grandpaImg = document.createElement("img");
        grandpaImg.src = "assets/grandpa.png";
        grandpaImg.alt = "grandpa";
        grandpaImg.style.position = "fixed";
        grandpaImg.style.pointerEvents = "none";
        grandpaImg.style.width = "120px";
        grandpaImg.style.height = "auto";
        grandpaImg.style.transform = "translate(-50%, -50%)";
        grandpaImg.style.zIndex = "999";

        body.appendChild(grandpaImg);


        document.addEventListener("mousemove", function moveGrandpa(e) {
            grandpaImg.style.left = e.clientX + "px";
            grandpaImg.style.top = e.clientY + "px";
        });
    }
});
