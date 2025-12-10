document.addEventListener("DOMContentLoaded", function () {
    // 创建背景div
    const background = document.createElement('div');
    background.id = 'tree-background';
    background.style.position = 'fixed';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = '0';

    // 背景图片
    const bgImg = document.createElement('img');
    bgImg.src = 'assets/tree-bg.png';
    bgImg.style.width = '100%';
    bgImg.style.height = '100%';
    bgImg.style.objectFit = 'cover';

    background.appendChild(bgImg);
    document.body.appendChild(background);

    // 设置body样式
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#000000';

    // 创建中间的div（触发点）
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
    triggerDiv.style.display = 'none';  // 初始隐藏
    triggerDiv.style.pointerEvents = 'none';  // 初始不可交互


    document.body.appendChild(triggerDiv);

    // 记录被点击的小鸟数量
    let clickedBirds = 0;
    
    // 存储三个小鸟图片的变量
    let bird1Img = null;
    let bird2Img = null;
    let bird3Img = null;

    // triggerDiv mouseover 效果
    triggerDiv.addEventListener('mouseover', function() {
        triggerDiv.style.backgroundColor = 'rgba(218, 136, 22, 0.3)';
    });

    // triggerDiv mouseout 效果
    triggerDiv.addEventListener('mouseout', function() {
        triggerDiv.style.backgroundColor = 'transparent';
    });

    // triggerDiv 点击事件
    triggerDiv.addEventListener('click', function() {
        // 点击后消失
        triggerDiv.style.display = 'none';
        triggerDiv.style.pointerEvents = 'none';
        
        // 创建半透明背景
        const overlayBg = document.createElement('div');
        overlayBg.style.position = 'fixed';
        overlayBg.style.left = '0';
        overlayBg.style.top = '100%';  // 初始在下面
        overlayBg.style.width = '100%';
        overlayBg.style.height = '100%';
        overlayBg.style.backgroundColor = 'rgba(176, 235, 240, 0.5)';
        overlayBg.style.zIndex = '180';  // 在背景上面，小鸟下面
        overlayBg.style.transition = 'top 2s ease-out';  // 从下往上的过渡
        overlayBg.style.display = 'flex';
        overlayBg.style.alignItems = 'center';
        overlayBg.style.justifyContent = 'center';
        document.body.appendChild(overlayBg);
        
        // 创建文字容器
        const textContainer = document.createElement('div');
        textContainer.style.color = 'darkorange';
        textContainer.style.fontSize = '24px';
        textContainer.style.fontFamily = 'YRDZST';
        textContainer.style.lineHeight = '1.8';
        textContainer.style.textAlign = 'center';
        textContainer.style.maxWidth = '600px';
        textContainer.style.padding = '40px';
        
        // 设置链接样式（去掉下划线）
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
        
        // 创建文字内容，用span包装单引号框起来的部分
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
        
        // 触发过渡动画
        setTimeout(() => {
            overlayBg.style.top = '0';
        }, 10);
        
        // overlayBg升起后，显示grandparents-ending.gif图片
        setTimeout(() => {
            const endingImg = document.createElement('img');
            endingImg.src = 'assets/grandparents-ending.gif';
            endingImg.style.position = 'fixed';
            endingImg.style.left = '-300px';  // 初始在屏幕左侧外
            endingImg.style.top = '65%';
            // endingImg.style.transform = 'translateY(-50%)';
            endingImg.style.zIndex = '185';  // 在overlayBg上面
            endingImg.style.width = '500px';
            endingImg.style.height = 'auto';
            endingImg.style.transition = 'left 2s ease-out';  // 2秒从左侧移动到left 20%
            document.body.appendChild(endingImg);
            
            // 触发动画（必须在appendChild之后再改变样式，确保transition生效）
            requestAnimationFrame(() => {
                endingImg.style.left = '20%';
            });
        }, 2000);  // 2秒后开始（等overlayBg升起完成）
        
        // 处理小鸟1
        if (bird1Img && bird1Img.mouseMoveHandler) {
            document.removeEventListener('mousemove', bird1Img.mouseMoveHandler);
            const currentX = parseFloat(bird1Img.style.left);
            const currentY = parseFloat(bird1Img.style.top);
            animateBirdFly(bird1Img, currentX, currentY, window.innerWidth * 0.2, window.innerHeight * 0.3);
        }
        
        // 处理小鸟2
        if (bird2Img && bird2Img.mouseMoveHandler) {
            document.removeEventListener('mousemove', bird2Img.mouseMoveHandler);
            const currentX = parseFloat(bird2Img.style.left);
            const currentY = parseFloat(bird2Img.style.top);
            animateBirdFly(bird2Img, currentX, currentY, window.innerWidth * 0.65, window.innerHeight * 0.25);
        }
        
        // 处理小鸟3
        if (bird3Img && bird3Img.mouseMoveHandler) {
            document.removeEventListener('mousemove', bird3Img.mouseMoveHandler);
            const currentX = parseFloat(bird3Img.style.left);
            const currentY = parseFloat(bird3Img.style.top);
            animateBirdFly(bird3Img, currentX, currentY, window.innerWidth * 0.5, window.innerHeight * 0.05);
        }
    });

    function animateBirdFly(img, startX, startY, targetX, targetY) {
        const duration = 2000;  // 2秒飞行
        const startTime = Date.now();
        
        function flyFrame() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 缓动函数
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentX = startX + (targetX - startX) * easeProgress;
            const currentY = startY + (targetY - startY) * easeProgress;
            
            img.style.left = currentX + 'px';
            img.style.top = currentY + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(flyFrame);
            }
        }
        
        flyFrame();
    }

    // 喜鹊动画
    let animationTriggered = false;

    document.addEventListener('mousemove', function() {
        if (animationTriggered) return;
        animationTriggered = true;

        // 喜鹊1：从左边飞进来
        createMagpie(1, -100, window.innerHeight / 2, window.innerWidth * 0.25, window.innerHeight* 1 / 4);

        // 喜鹊2：从上方飞进来
        createMagpie(2, window.innerWidth* 2 / 3, -100, window.innerWidth * 0.4, window.innerHeight * 0.8);

        // 喜鹊3：从右边飞进来
        createMagpie(3, window.innerWidth + 100, window.innerHeight * 0.7, window.innerWidth * 0.7, window.innerHeight * 0.6);
    });

    function createMagpie(id, startX, startY, endX, endY) {
        // 创建喜鹊元素
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

        // 动画参数
        const duration = 2000;  // 2秒飞进来
        const startTime = Date.now();

        function animateFlyIn() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 缓动函数（easeOut）
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            // 基础位置
            const x = startX + (endX - startX) * easeProgress;
            const y = startY + (endY - startY) * easeProgress;

            // 根据ID判断飞行方向，调整波浪方向
            const waveAmplitude = 50;
            const waveFrequency = 3;
            
            let finalX = x;
            let finalY = y;
            let rotationAngle = 0;

            if (id === 1) {
                // 从左边飞：Y轴波浪
                finalY = y + Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
                rotationAngle = Math.sin(progress * Math.PI * waveFrequency * 2) * 15;
            } else if (id === 2) {
                // 从上方飞：X轴波浪
                finalX = x + Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
                rotationAngle = Math.sin(progress * Math.PI * waveFrequency * 2) * 15;
            } else if (id === 3) {
                // 从右边飞：Y轴波浪
                finalY = y + Math.sin(progress * Math.PI * waveFrequency) * waveAmplitude;
                rotationAngle = Math.sin(progress * Math.PI * waveFrequency * 2) * 15;
            }

            magpie.style.left = finalX + 'px';
            magpie.style.top = finalY + 'px';
            magpie.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

            if (progress < 1) {
                requestAnimationFrame(animateFlyIn);
            } else {
                // 飞进来后，直接开始波浪效果
                startWaving(magpie);
            }
        }

        // 点击喜鹊的事件
        magpie.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 喜鹊消失
            magpie.style.display = 'none';
            
            // 创建跟随光标的图片
            const cursorImg = document.createElement('img');
            cursorImg.src = `assets/magpieImg_${id}.gif`;
            cursorImg.style.position = 'fixed';
            cursorImg.style.pointerEvents = 'none';
            cursorImg.style.zIndex = '200';
            cursorImg.style.width = '180px';
            cursorImg.style.height = '120px';
            document.body.appendChild(cursorImg);
            
            // 根据ID将图片保存到不同的变量
            if (id === 1) {
                bird1Img = cursorImg;
            } else if (id === 2) {
                bird2Img = cursorImg;
            } else if (id === 3) {
                bird3Img = cursorImg;
            }
            
            // 根据ID设置不同的偏移位置
            let offsetX = 10;
            let offsetY = 10;
            
            if (id === 1) {
                // magpie1：左上方
                offsetX = -150;
                offsetY = -200;
            } else if (id === 2) {
                // magpie2：右上方
                offsetX = 80;
                offsetY = -300;
            } else if (id === 3) {
                // magpie3：右下方
                offsetX = -40;
                offsetY = -50;
            }
            
            // 设置初始位置（在点击时的光标位置）
            cursorImg.style.left = (e.clientX + offsetX) + 'px';
            cursorImg.style.top = (e.clientY + offsetY) + 'px';
            
            // 跟随光标移动
            const mouseMoveHandler = function(e) {
                cursorImg.style.left = (e.clientX + offsetX) + 'px';
                cursorImg.style.top = (e.clientY + offsetY) + 'px';
            };
            
            document.addEventListener('mousemove', mouseMoveHandler);
            
            // 保存handler供移除使用
            cursorImg.mouseMoveHandler = mouseMoveHandler;
            
            // 增加被点击的小鸟计数
            clickedBirds++;
            
            // 如果所有三只小鸟都被点击了，显示triggerDiv
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

            // 原地波浪：只有旋转，位置不变
            const rotationAngle = Math.sin(progress * Math.PI * 4) * 8;  // ±8度轻微摇摆

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

