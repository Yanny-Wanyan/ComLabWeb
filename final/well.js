document.addEventListener("DOMContentLoaded", function () {
    // Create background
    const background = document.createElement('div');
    background.id = 'well-background';
    background.style.position = 'fixed';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = '0';

    const bgImg = document.createElement('img');
    bgImg.src = 'assets/well-exterior.png';
    bgImg.style.width = '100%';
    bgImg.style.height = '100%';
    bgImg.style.objectFit = 'cover';

    background.appendChild(bgImg);
    document.body.appendChild(background);

    // Create well instruction div
    const instructionDiv = document.createElement('div');
    instructionDiv.id = 'well-instruction-container';
    instructionDiv.style.position = 'fixed';
    instructionDiv.style.top = '5%';
    instructionDiv.style.left = '5%';
    instructionDiv.style.width = '300px';
    instructionDiv.style.height = 'auto';
    instructionDiv.style.zIndex = '100';

    const instructionImg = document.createElement('img');
    instructionImg.src = 'assets/wellInstruction.gif';
    instructionImg.style.width = '100%';
    instructionImg.style.height = 'auto';
    instructionImg.style.display = 'block';
    instructionImg.style.opacity = '0.8';

    instructionDiv.appendChild(instructionImg);
    document.body.appendChild(instructionDiv);

    // Ricecake container
    const ricecakeDiv = document.createElement('div');
    ricecakeDiv.id = 'ricecake-container';
    ricecakeDiv.style.position = 'fixed';
    ricecakeDiv.style.top = '70%';
    ricecakeDiv.style.left = '20%';
    ricecakeDiv.style.transform = 'translate(-50%, -50%)';
    ricecakeDiv.style.zIndex = '1';

    const ricecakeImg = document.createElement('img');
    ricecakeImg.src = 'assets/ricecake.png';
    ricecakeImg.style.maxWidth = '200px';
    ricecakeImg.style.maxHeight = '200px';
    ricecakeImg.style.width = 'auto';
    ricecakeImg.style.height = 'auto';

    ricecakeDiv.appendChild(ricecakeImg);
    document.body.appendChild(ricecakeDiv);

    // Ricecake click event
    ricecakeDiv.style.cursor = 'pointer';
    ricecakeDiv.addEventListener('click', function () {
        ricecakeDiv.classList.add('ricecake-animate');

        // Monitor animation end and set opacity to 0
        ricecakeDiv.addEventListener('animationend', function () {
            ricecakeDiv.style.opacity = '0';
        }, { once: true });

        setTimeout(() => {
            ricecakeDiv.remove();
            document.getElementById('well-background').remove();
            document.getElementById('well-instruction-container').remove();

            // Create deep well background
            const deepWellBackground = document.createElement('div');
            deepWellBackground.id = 'deep-well-background';
            deepWellBackground.style.position = 'fixed';
            deepWellBackground.style.top = '0';
            deepWellBackground.style.left = '0';
            deepWellBackground.style.width = '100%';
            deepWellBackground.style.height = '100%';
            deepWellBackground.style.backgroundImage = 'url("assets/dark-well-bg.png")';
            deepWellBackground.style.backgroundSize = 'cover';
            deepWellBackground.style.backgroundPosition = 'center';
            deepWellBackground.style.backgroundAttachment = 'fixed';
            deepWellBackground.style.zIndex = '0';
            document.body.appendChild(deepWellBackground);

            document.body.style.overflowY = 'auto';
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.backgroundColor = 'transparent';
            document.body.style.minHeight = '800vh';
            document.body.style.position = 'relative';

            let scrollProgress = 0;
            let lastProgress = 0;
            let lastRange = -1;

            // Mochi falling from top
            function createMochiFromTop() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
                mochi.style.fontFamily = 'YRDZST';
                mochi.style.position = 'fixed';
                mochi.style.fontSize = Math.random() * 30 + 20 + 'px';
                mochi.style.color = '#ffffff';
                mochi.style.left = Math.random() * window.innerWidth + 'px';
                mochi.style.top = '-50px';
                mochi.style.zIndex = '1';
                mochi.style.pointerEvents = 'none';

                const startSize = parseFloat(mochi.style.fontSize);
                const duration = Math.random() * 1500 + 1500;
                const rotation = Math.random() * 360;
                const rotationSpeed = Math.random() * 10 - 5;

                const startTime = Date.now();
                const startX = parseFloat(mochi.style.left);
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                function animateMochiFromTop() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const x = startX + (centerX - startX) * progress;
                    const y = -50 + (centerY + 50) * progress;

                    const size = startSize * (1 - progress);
                    const opacity = 1 - progress;

                    mochi.style.left = x + 'px';
                    mochi.style.top = y + 'px';
                    mochi.style.fontSize = size + 'px';
                    mochi.style.opacity = opacity;
                    mochi.style.transform = `rotate(${rotation + rotationSpeed * progress}deg)`;

                    if (progress < 1) {
                        requestAnimationFrame(animateMochiFromTop);
                    } else {
                        mochi.remove();
                    }
                }

                document.body.appendChild(mochi);
                animateMochiFromTop();
            }

            // Mochi falling from bottom
            function createMochiFromBottom() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
                mochi.style.fontFamily = 'YRDZST';
                mochi.style.position = 'fixed';
                mochi.style.fontSize = Math.random() * 30 + 20 + 'px';
                mochi.style.color = '#ffffff';
                mochi.style.left = Math.random() * window.innerWidth + 'px';
                mochi.style.top = window.innerHeight + 50 + 'px';
                mochi.style.zIndex = '1';
                mochi.style.pointerEvents = 'none';

                const startSize = parseFloat(mochi.style.fontSize);
                const duration = Math.random() * 1500 + 1500;
                const rotation = Math.random() * 360;
                const rotationSpeed = Math.random() * 10 - 5;

                const startTime = Date.now();
                const startX = parseFloat(mochi.style.left);
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                function animateMochiFromBottom() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const x = startX + (centerX - startX) * progress;
                    const y = window.innerHeight + 50 - (window.innerHeight + 50 - centerY) * progress;

                    const size = startSize * (1 - progress);
                    const opacity = 1 - progress;

                    mochi.style.left = x + 'px';
                    mochi.style.top = y + 'px';
                    mochi.style.fontSize = size + 'px';
                    mochi.style.opacity = opacity;
                    mochi.style.transform = `rotate(${rotation + rotationSpeed * progress}deg)`;

                    if (progress < 1) {
                        requestAnimationFrame(animateMochiFromBottom);
                    } else {
                        mochi.remove();
                    }
                }

                document.body.appendChild(mochi);
                animateMochiFromBottom();
            }

            // Mochi falling from left
            function createMochiFromLeft() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
                mochi.style.fontFamily = 'YRDZST';
                mochi.style.position = 'fixed';
                mochi.style.fontSize = Math.random() * 30 + 20 + 'px';
                mochi.style.color = '#ffffff';
                mochi.style.left = '-50px';
                mochi.style.top = Math.random() * window.innerHeight + 'px';
                mochi.style.zIndex = '1';
                mochi.style.pointerEvents = 'none';

                const startSize = parseFloat(mochi.style.fontSize);
                const duration = Math.random() * 1500 + 1500;
                const rotation = Math.random() * 360;
                const rotationSpeed = Math.random() * 10 - 5;

                const startTime = Date.now();
                const startY = parseFloat(mochi.style.top);
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                function animateMochiFromLeft() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const x = -50 + (centerX + 50) * progress;
                    const y = startY + (centerY - startY) * progress;

                    const size = startSize * (1 - progress);
                    const opacity = 1 - progress;

                    mochi.style.left = x + 'px';
                    mochi.style.top = y + 'px';
                    mochi.style.fontSize = size + 'px';
                    mochi.style.opacity = opacity;
                    mochi.style.transform = `rotate(${rotation + rotationSpeed * progress}deg)`;

                    if (progress < 1) {
                        requestAnimationFrame(animateMochiFromLeft);
                    } else {
                        mochi.remove();
                    }
                }

                document.body.appendChild(mochi);
                animateMochiFromLeft();
            }

            // Mochi falling from right
            function createMochiFromRight() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
                mochi.style.fontFamily = 'YRDZST';
                mochi.style.position = 'fixed';
                mochi.style.fontSize = Math.random() * 30 + 20 + 'px';
                mochi.style.color = '#ffffff';
                mochi.style.left = window.innerWidth + 50 + 'px';
                mochi.style.top = Math.random() * window.innerHeight + 'px';
                mochi.style.zIndex = '1';
                mochi.style.pointerEvents = 'none';

                const startSize = parseFloat(mochi.style.fontSize);
                const duration = Math.random() * 1500 + 1500;
                const rotation = Math.random() * 360;
                const rotationSpeed = Math.random() * 10 - 5;

                const startTime = Date.now();
                const startY = parseFloat(mochi.style.top);
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                function animateMochiFromRight() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const x = window.innerWidth + 50 - (window.innerWidth + 50 - centerX) * progress;
                    const y = startY + (centerY - startY) * progress;

                    const size = startSize * (1 - progress);
                    const opacity = 1 - progress;

                    mochi.style.left = x + 'px';
                    mochi.style.top = y + 'px';
                    mochi.style.fontSize = size + 'px';
                    mochi.style.opacity = opacity;
                    mochi.style.transform = `rotate(${rotation + rotationSpeed * progress}deg)`;

                    if (progress < 1) {
                        requestAnimationFrame(animateMochiFromRight);
                    } else {
                        mochi.remove();
                    }
                }

                document.body.appendChild(mochi);
                animateMochiFromRight();
            }

            // Toad jumping from center
            function createHamaFromCenter() {
                const hama = document.createElement('div');
                hama.textContent = '蛤蟆';
                hama.style.position = 'fixed';
                hama.style.fontSize = '20px';
                hama.style.color = '#00bf63';
                hama.style.fontFamily = 'YRDZST';
                hama.style.left = window.innerWidth / 2 + 'px';
                hama.style.top = window.innerHeight / 2 + 'px';
                hama.style.zIndex = '1';
                hama.style.pointerEvents = 'none';
                hama.style.transform = 'translate(-50%, -50%)';

                const duration = 1500;
                const direction = Math.random() * Math.PI * 2;
                const distance = Math.random() * 200 + 100;

                const startTime = Date.now();
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const maxDistance = Math.min(centerX, centerY, window.innerWidth - centerX, window.innerHeight - centerY) - 50;
                const finalDistance = Math.min(distance, maxDistance);

                function animateHamaFromCenter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const jumpCount = 5;
                    const jumpHeight = Math.sin(progress * Math.PI * jumpCount) * 50;

                    const targetX = centerX + Math.cos(direction) * finalDistance * progress;
                    const targetY = centerY + Math.sin(direction) * finalDistance * progress + jumpHeight;

                    hama.style.left = targetX + 'px';
                    hama.style.top = targetY + 'px';

                    if (progress < 1) {
                        requestAnimationFrame(animateHamaFromCenter);
                    } else {
                        hama.style.pointerEvents = 'auto';
                        hama.style.cursor = 'grab';
                    }
                }

                // Click toad: shake and disappear
                hama.addEventListener('click', function () {
                    hama.style.pointerEvents = 'none';

                    let shakeCount = 0;
                    const shakeInterval = setInterval(() => {
                        if (shakeCount % 2 === 0) {
                            hama.style.transform = 'translate(-50%, -50%) translateX(5px)';
                        } else {
                            hama.style.transform = 'translate(-50%, -50%) translateX(-5px)';
                        }

                        if (shakeCount > 10) {
                            clearInterval(shakeInterval);
                            hama.style.opacity = '0';
                            hama.style.transition = 'opacity 0.3s';
                            setTimeout(() => hama.remove(), 300);
                        }
                    }, 50);
                });

                hama.setAttribute('data-hama', 'true');
                document.body.appendChild(hama);
                animateHamaFromCenter();
            }

            // Special toad (magpie)
            function createSpecialHama() {
                const hama = document.createElement('div');
                hama.textContent = '蛤蟆';
                hama.style.fontFamily = 'YRDZST';
                hama.style.position = 'fixed';
                hama.style.fontSize = '20px';
                hama.style.color = '#00bf63';
                hama.style.left = window.innerWidth / 2 + 'px';
                hama.style.top = window.innerHeight / 2 + 'px';
                hama.style.zIndex = '1';
                hama.style.pointerEvents = 'none';
                hama.style.transform = 'translate(-50%, -50%)';

                const duration = 1500;
                const direction = Math.random() * Math.PI * 2;
                const distance = Math.random() * 200 + 100;

                const startTime = Date.now();
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const maxDistance = Math.min(centerX, centerY, window.innerWidth - centerX, window.innerHeight - centerY) - 50;
                const finalDistance = Math.min(distance, maxDistance);
                let isClicked = false;

                function animateHamaFromCenter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    const jumpCount = 5;
                    const jumpHeight = Math.sin(progress * Math.PI * jumpCount) * 50;

                    const targetX = centerX + Math.cos(direction) * finalDistance * progress;
                    const targetY = centerY + Math.sin(direction) * finalDistance * progress + jumpHeight;

                    hama.style.left = targetX + 'px';
                    hama.style.top = targetY + 'px';

                    if (progress < 1) {
                        requestAnimationFrame(animateHamaFromCenter);
                    } else {
                        hama.style.pointerEvents = 'auto';
                        hama.style.cursor = 'not-allowed';
                    }
                }

                // Click special toad: transform to magpie and fly
                hama.addEventListener('click', function () {
                    if (isClicked) return;
                    isClicked = true;
                    hama.style.pointerEvents = 'none';

                    hama.textContent = '喜鹊';
                    hama.style.fontSize = '40px';
                    hama.style.color = 'red';
                    hama.style.transition = 'font-size 0.3s';
                    hama.style.fontFamily = 'YRDZST';

                    const flyDuration = 8000;
                    const flyStartTime = Date.now();
                    const screenCenterX = window.innerWidth / 2;
                    const screenCenterY = window.innerHeight / 2;
                    const radius = 100;

                    function animateFly() {
                        const flyElapsed = Date.now() - flyStartTime;
                        const flyProgress = Math.min(flyElapsed / flyDuration, 1);

                        const totalRotations = 3;
                        const angle = flyProgress * totalRotations * Math.PI * 2;
                        const currentRadius = radius + radius * 5 * flyProgress;

                        hama.style.left = (screenCenterX + Math.cos(angle) * currentRadius) + 'px';
                        hama.style.top = (screenCenterY + Math.sin(angle) * currentRadius) + 'px';

                        if (flyProgress < 1) {
                            requestAnimationFrame(animateFly);
                        } else {
                            hama.style.opacity = '0';
                            hama.style.transition = 'opacity 0.5s';
                            setTimeout(() => {
                                hama.remove();

                                // Remove all toads and navigate
                                const allHamas = document.querySelectorAll('[data-hama]');
                                allHamas.forEach(h => {
                                    h.style.opacity = '0';
                                    h.style.transition = 'opacity 0.5s';
                                    setTimeout(() => {
                                        h.remove();
                                        window.location.href = 'tree.html';
                                    }, 500);
                                });
                            }, 500);
                        }
                    }

                    animateFly();
                });

                hama.setAttribute('data-special-hama', 'true');
                document.body.appendChild(hama);
                animateHamaFromCenter();
            }

            // Scroll event listener
            window.addEventListener('scroll', function () {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

                if (scrollProgress > lastProgress) {
                    if (scrollProgress > 0.1 && scrollProgress <= 0.2 && lastRange !== 1) {
                        lastRange = 1;
                        createMochiFromTop();
                        createMochiFromTop();
                    }
                    else if (scrollProgress > 0.2 && scrollProgress <= 0.3 && lastRange !== 2) {
                        lastRange = 2;
                        createMochiFromBottom();
                        createMochiFromBottom();
                    }
                    else if (scrollProgress > 0.3 && scrollProgress <= 0.4 && lastRange !== 3) {
                        lastRange = 3;
                        createMochiFromLeft();
                        createMochiFromLeft();
                        createMochiFromTop();
                    }
                    else if (scrollProgress > 0.4 && scrollProgress <= 0.5 && lastRange !== 4) {
                        lastRange = 4;
                        createMochiFromRight();
                        createMochiFromRight();
                        createMochiFromBottom();
                    }
                    else if (scrollProgress > 0.5 && scrollProgress <= 0.6 && lastRange !== 5) {
                        lastRange = 5;
                        createMochiFromTop();
                        createMochiFromBottom();
                        createMochiFromLeft();
                    }
                    else if (scrollProgress > 0.8 && scrollProgress <= 0.85 && lastRange !== 8) {
                        lastRange = 8;
                        createHamaFromCenter();
                        createHamaFromCenter();
                        createHamaFromCenter();
                    }
                    else if (scrollProgress > 0.85 && scrollProgress <= 0.9 && lastRange !== 9) {
                        lastRange = 9;
                        createHamaFromCenter();
                        createHamaFromCenter();
                        createHamaFromCenter();
                    }
                    else if (scrollProgress > 0.9 && scrollProgress <= 0.95 && lastRange !== 10) {
                        lastRange = 10;
                        createHamaFromCenter();
                        createHamaFromCenter();
                        createHamaFromCenter();
                    }
                    else if (scrollProgress > 0.95 && lastRange !== 11) {
                        lastRange = 11;
                        createHamaFromCenter();
                        createHamaFromCenter();
                        createHamaFromCenter();
                        createHamaFromCenter();
                        createSpecialHama();
                    }
                }

                lastProgress = scrollProgress;
            });
        }, 2800);
    });
});
