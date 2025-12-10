document.addEventListener("DOMContentLoaded", function () {
    const background = document.createElement('div');
    background.id = 'tree-background';
    background.style.position = 'fixed';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = '0';

    const bgImg = document.createElement('img');
    bgImg.src = 'assets/tree-bg.png';
    bgImg.style.width = '100%';
    bgImg.style.height = '100%';
    bgImg.style.objectFit = 'cover';

    background.appendChild(bgImg);
    document.body.appendChild(background);

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#000000';

    // Trigger point for overlay animation
    const triggerDiv = document.createElement('div');
    triggerDiv.style.position = 'fixed';
    triggerDiv.style.left = '55%';
    triggerDiv.style.top = '53%';
    triggerDiv.style.transform = 'translate(-50%, -50%)';
    triggerDiv.style.width = '100px';
    triggerDiv.style.height = '100px';
    triggerDiv.style.backgroundColor = 'transparent';
    triggerDiv.style.borderRadius = '50%';
    triggerDiv.style.zIndex = '150';
    triggerDiv.style.cursor = 'pointer';
    triggerDiv.style.display = 'none';
    triggerDiv.style.pointerEvents = 'none';

    document.body.appendChild(triggerDiv);

    let clickedBirds = 0;
    let bird1Img = null;
    let bird2Img = null;
    let bird3Img = null;

    triggerDiv.addEventListener('mouseover', function() {
        triggerDiv.style.backgroundColor = 'rgba(218, 136, 22, 0.3)';
    });

    triggerDiv.addEventListener('mouseout', function() {
        triggerDiv.style.backgroundColor = 'transparent';
    });

    triggerDiv.addEventListener('click', function() {
        triggerDiv.style.display = 'none';
        triggerDiv.style.pointerEvents = 'none';
        
        // Create semi-transparent overlay
        const overlayBg = document.createElement('div');
        overlayBg.style.position = 'fixed';
        overlayBg.style.left = '0';
        overlayBg.style.top = '100%';
        overlayBg.style.width = '100%';
        overlayBg.style.height = '100%';
        overlayBg.style.backgroundColor = 'rgba(176, 235, 240, 0.5)';
        overlayBg.style.zIndex = '180';
        overlayBg.style.transition = 'top 2s ease-out';
        overlayBg.style.display = 'flex';
        overlayBg.style.alignItems = 'center';
        overlayBg.style.justifyContent = 'center';
        document.body.appendChild(overlayBg);
        
        // Text container
        const textContainer = document.createElement('div');
        textContainer.style.color = 'darkorange';
        textContainer.style.fontSize = '24px';
        textContainer.style.fontFamily = 'YRDZST';
        textContainer.style.lineHeight = '1.8';
        textContainer.style.textAlign = 'center';
        textContainer.style.maxWidth = '600px';
        textContainer.style.padding = '40px';
        
        // Link styles
        const linkStyle = document.createElement('style');
        linkStyle.textContent = `
            a {
                text-decoration: none;
                color: darkorange;
                cursor: pointer;
            }
            a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(linkStyle);
        
        // Childhood rhyme text
        textContainer.innerHTML = `
            <a href = 'index.html'> 月亮粑粑 </a> <br>
            <a href = 'first-stage.html'>月亮粑粑，<br>肚里坐个爹爹</a><br>
            <a href = 'supermarket.html'>爹爹出来买菜，<br>肚里坐个奶奶，</a><br>
            <a href = 'embroidery.html'>奶奶出来绣花，<br>绣个糍粑，</a><br>
            <a href = 'well_1.html'>糍粑跌得井里，<br>变只蛤蟆，</a><br>
            蛤蟆伸脚，<br>变只喜鹊</a><br>
            <a href = 'tree.html'>喜鹊上树，<br>
            变只斑鸠，<br>
            斑鸠咕咕咕</a>
        `;
        
        overlayBg.appendChild(textContainer);
        
        // Trigger overlay animation
        setTimeout(() => {
            overlayBg.style.top = '0';
        }, 10);
        
        // Show grandparents-ending.gif after overlay slides up
        setTimeout(() => {
            const endingImg = document.createElement('img');
            endingImg.src = 'assets/grandparents-ending.gif';
            endingImg.style.position = 'fixed';
            endingImg.style.left = '-300px';
            endingImg.style.top = '65%';
            endingImg.style.zIndex = '185';
            endingImg.style.width = '500px';
            endingImg.style.height = 'auto';
            endingImg.style.transition = 'left 2s ease-out';
            document.body.appendChild(endingImg);
            
            requestAnimationFrame(() => {
                endingImg.style.left = '20%';
            });
        }, 2000);
        
        // Remove mousemove tracking and animate birds to final positions
        if (bird1Img && bird1Img.mouseMoveHandler) {
            document.removeEventListener('mousemove', bird1Img.mouseMoveHandler);
            const currentX = parseFloat(bird1Img.style.left);
            const currentY = parseFloat(bird1Img.style.top);
            animateBirdFly(bird1Img, currentX, currentY, window.innerWidth * 0.2, window.innerHeight * 0.3);
        }
        
        if (bird2Img && bird2Img.mouseMoveHandler) {
            document.removeEventListener('mousemove', bird2Img.mouseMoveHandler);
            const currentX = parseFloat(bird2Img.style.left);
            const currentY = parseFloat(bird2Img.style.top);
            animateBirdFly(bird2Img, currentX, currentY, window.innerWidth * 0.65, window.innerHeight * 0.25);
        }
        
        if (bird3Img && bird3Img.mouseMoveHandler) {
            document.removeEventListener('mousemove', bird3Img.mouseMoveHandler);
            const currentX = parseFloat(bird3Img.style.left);
            const currentY = parseFloat(bird3Img.style.top);
            animateBirdFly(bird3Img, currentX, currentY, window.innerWidth * 0.5, window.innerHeight * 0.05);
        }
    });

    function animateBirdFly(img, startX, startY, targetX, targetY) {
        const duration = 2000;
        const startTime = Date.now();
        
        function flyFrame() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentX = startX + (targetX - startX) * easeProgress;
            const currentY = startY + (targetY - startY) * easeProgress;
            
            img.style.left = currentX + 'px';
            img.style.top = currentY + 'px';
            
            if (progress < 1) requestAnimationFrame(flyFrame);
        }
        
        flyFrame();
    }

    // Magpie animation triggered on first mousemove
    let animationTriggered = false;

    document.addEventListener('mousemove', function() {
        if (animationTriggered) return;
        animationTriggered = true;

        // Magpie 1: Enter from left
        createMagpie(1, -100, window.innerHeight / 2, window.innerWidth * 0.25, window.innerHeight* 1 / 4);

        // Magpie 2: Enter from top
        createMagpie(2, window.innerWidth* 2 / 3, -100, window.innerWidth * 0.4, window.innerHeight * 0.8);

        // Magpie 3: Enter from right
        createMagpie(3, window.innerWidth + 100, window.innerHeight * 0.7, window.innerWidth * 0.7, window.innerHeight * 0.6);
    });

    function createMagpie(id, startX, startY, endX, endY) {
        // Create magpie element
        const magpie = document.createElement('div');
        magpie.textContent = '喜鹊';
        magpie.style.position = 'fixed';
        magpie.style.fontSize = '40px';
        magpie.style.color = '#17437c';
        magpie.style.fontFamily = 'YRDZST';
        magpie.style.zIndex = '100';
        magpie.style.pointerEvents = 'auto';
        magpie.style.transform = 'translate(-50%, -50%)';
        magpie.style.cursor = 'grab';
        document.body.appendChild(magpie);

        const duration = 2000;
        const startTime = Date.now();

        function animateFlyIn() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const x = startX + (endX - startX) * easeProgress;
            const y = startY + (endY - startY) * easeProgress;

            const waveAmplitude = 50;
            const waveFrequency = 3;
            
            let finalX = x;
            let finalY = y;
            let rotationAngle = 0;

            if (id === 1) {
                // From left: Y-axis wave
                finalY = y + Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
                rotationAngle = Math.sin(progress * Math.PI * waveFrequency * 2) * 15;
            } else if (id === 2) {
                // From top: X-axis wave
                finalX = x + Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
                rotationAngle = Math.sin(progress * Math.PI * waveFrequency * 2) * 15;
            } else if (id === 3) {
                // From right: Y-axis wave
                finalY = y + Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
                rotationAngle = Math.sin(progress * Math.PI * waveFrequency * 2) * 15;
            }

            magpie.style.left = finalX + 'px';
            magpie.style.top = finalY + 'px';
            magpie.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

            if (progress < 1) {
                requestAnimationFrame(animateFlyIn);
            } else {
                // Start waving after flying in
                startWaving(magpie);
            }
        }

        // Click magpie to create cursor-following image
        magpie.addEventListener('click', function(e) {
            e.stopPropagation();
            
            magpie.style.display = 'none';
            
            const cursorImg = document.createElement('img');
            cursorImg.src = `assets/magpieImg_${id}.gif`;
            cursorImg.style.position = 'fixed';
            cursorImg.style.pointerEvents = 'none';
            cursorImg.style.zIndex = '200';
            cursorImg.style.width = '180px';
            cursorImg.style.height = '120px';
            document.body.appendChild(cursorImg);
            
            if (id === 1) bird1Img = cursorImg;
            else if (id === 2) bird2Img = cursorImg;
            else if (id === 3) bird3Img = cursorImg;
            
            let offsetX = 10, offsetY = 10;
            if (id === 1) {
                offsetX = -150;
                offsetY = -200;
            } else if (id === 2) {
                offsetX = 80;
                offsetY = -300;
            } else if (id === 3) {
                offsetX = -40;
                offsetY = -50;
            }
            
            cursorImg.style.left = (e.clientX + offsetX) + 'px';
            cursorImg.style.top = (e.clientY + offsetY) + 'px';
            
            const mouseMoveHandler = function(e) {
                cursorImg.style.left = (e.clientX + offsetX) + 'px';
                cursorImg.style.top = (e.clientY + offsetY) + 'px';
            };
            
            document.addEventListener('mousemove', mouseMoveHandler);
            cursorImg.mouseMoveHandler = mouseMoveHandler;
            
            clickedBirds++;
            
            // Show trigger when all 3 birds are clicked
            if (clickedBirds === 3) {
                triggerDiv.style.display = 'block';
                triggerDiv.style.pointerEvents = 'auto';
            }
        });

        animateFlyIn();
    }

    function startWaving(magpie) {
        const waveStartTime = Date.now();
        const waveDuration = 2000;  // 波浪效果2秒

        function animateWave() {
            const elapsed = Date.now() - waveStartTime;
            const progress = Math.min(elapsed / waveDuration, 1);

            // Gentle rotation wave effect
            const rotationAngle = Math.sin(progress * Math.PI * 4) * 8;

            magpie.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

            if (progress < 1) {
                requestAnimationFrame(animateWave);
            } else {
                magpie.style.transform = 'translate(-50%, -50%)';
            }
        }

        animateWave();
    }
});

