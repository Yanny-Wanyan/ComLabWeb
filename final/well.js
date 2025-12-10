document.addEventListener("DOMContentLoaded", function () {
    // 创建背景div
    const background = document.createElement('div');
    background.id = 'well-background';
    background.style.position = 'fixed';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.zIndex = '0';

    // 背景图片
    const bgImg = document.createElement('img');
    bgImg.src = 'assets/well-exterior.png';
    bgImg.style.width = '100%';
    bgImg.style.height = '100%';
    bgImg.style.objectFit = 'cover';

    background.appendChild(bgImg);
    document.body.appendChild(background);

    // 创建中间的小div（放ricecake.png）
    const ricecakeDiv = document.createElement('div');
    ricecakeDiv.id = 'ricecake-container';
    ricecakeDiv.style.position = 'fixed';
    ricecakeDiv.style.top = '70%';
    ricecakeDiv.style.left = '20%';
    ricecakeDiv.style.transform = 'translate(-50%, -50%)';
    ricecakeDiv.style.zIndex = '1';

    // ricecake图片
    const ricecakeImg = document.createElement('img');
    ricecakeImg.src = 'assets/ricecake.png';
    ricecakeImg.style.maxWidth = '200px';
    ricecakeImg.style.maxHeight = '200px';
    ricecakeImg.style.width = 'auto';
    ricecakeImg.style.height = 'auto';

    ricecakeDiv.appendChild(ricecakeImg);
    document.body.appendChild(ricecakeDiv);

    // ricecake点击动画
    ricecakeDiv.style.cursor = 'pointer';
    ricecakeDiv.addEventListener('click', function () {
        // 添加动画class
        ricecakeDiv.classList.add('ricecake-animate');

        // 2.8秒后移除元素并创建新背景
        setTimeout(() => {
            ricecakeDiv.remove();

            // 清除原来的背景
            const oldBackground = document.getElementById('well-background');
            if (oldBackground) {
                oldBackground.remove();
            }

            // 创建新的深井背景（纯黑）
            const deepWellBackground = document.createElement('div');
            deepWellBackground.id = 'deep-well-background';
            deepWellBackground.style.position = 'absolute';
            deepWellBackground.style.top = '0';
            deepWellBackground.style.left = '0';
            deepWellBackground.style.width = '100%';
            deepWellBackground.style.minHeight ='800vh'
            deepWellBackground.style.backgroundColor = '#000000';
            deepWellBackground.style.zIndex = '0';

            document.body.appendChild(deepWellBackground);

            // 设置body允许overflow
            document.body.style.overflowY = 'auto';
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.backgroundColor = '#000000';

            // 初始化滚动百分比和掉落文字系统
            let scrollProgress = 0;
            let lastProgress = 0;
            let lastMochiCount = 0;
            let hasCreatedInRange = false;
            let lastRange = -1;

            // 从上方掉落
            function createMochiFromTop() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
                mochi.style.position = 'fixed';
                mochi.style.fontSize = Math.random() * 30 + 20 + 'px';
                mochi.style.color = '#ffffff';
                mochi.style.left = Math.random() * window.innerWidth + 'px';
                mochi.style.top = '-50px';
                mochi.style.zIndex = '1';
                mochi.style.pointerEvents = 'none';

                const startSize = parseFloat(mochi.style.fontSize);
                const duration = Math.random() * 1500 + 1500;  // 1.5-3秒
                const rotation = Math.random() * 360;
                const rotationSpeed = Math.random() * 10 - 5;  // -5到5度每帧

                const startTime = Date.now();
                const startX = parseFloat(mochi.style.left);
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;

                function animateMochiFromTop() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // 从屏幕边界移向中心
                    const x = startX + (centerX - startX) * progress;
                    const y = -50 + (centerY + 50) * progress;

                    // 大小和透明度由大到小
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

            // 从下方掉落
            function createMochiFromBottom() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
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

            // 从左方掉落
            function createMochiFromLeft() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
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

            // 从右方掉落
            function createMochiFromRight() {
                const mochi = document.createElement('div');
                mochi.textContent = '糍粑';
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

            // 蛤蟆从中间向随机方向跳跃
            function createHamaFromCenter() {
                const hama = document.createElement('div');
                hama.textContent = '蛤蟆';
                hama.style.position = 'fixed';
                hama.style.fontSize = '20px';
                hama.style.color = '#ffffff';
                hama.style.left = window.innerWidth / 2 + 'px';
                hama.style.top = window.innerHeight / 2 + 'px';
                hama.style.zIndex = '1';
                hama.style.pointerEvents = 'none';
                hama.style.transform = 'translate(-50%, -50%)';
                
                const duration = 1500;  // 1.5秒
                const direction = Math.random() * Math.PI * 2;  // 随机方向 0-2π
                const distance = Math.random() * 200 + 100;  // 移动距离 100-300px（缩小范围保证在视窗内）
                
                const startTime = Date.now();
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const maxDistance = Math.min(centerX, centerY, window.innerWidth - centerX, window.innerHeight - centerY) - 50;  // 保证不超出屏幕
                const finalDistance = Math.min(distance, maxDistance);
                let finalX, finalY;
                
                function animateHamaFromCenter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // 跳跃动作：使用sin函数做多次跳跃
                    const jumpCount = 5;
                    const jumpHeight = Math.sin(progress * Math.PI * jumpCount) * 50;
                    
                    // 目标位置（向指定方向移动，但限制在屏幕内）
                    const targetX = centerX + Math.cos(direction) * finalDistance * progress;
                    const targetY = centerY + Math.sin(direction) * finalDistance * progress + jumpHeight;
                    
                    hama.style.left = targetX + 'px';
                    hama.style.top = targetY + 'px';
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateHamaFromCenter);
                    } else {
                        // 保存最终位置
                        finalX = targetX;
                        finalY = targetY;
                        // 动画结束后添加点击事件
                        hama.style.pointerEvents = 'auto';
                        hama.style.cursor = 'grab';
                    }
                }
                
                // 点击蛤蟆时的抖动消失效果
                hama.addEventListener('click', function() {
                    hama.style.pointerEvents = 'none';
                    
                    // 抖动动画
                    let shakeCount = 0;
                    const shakeInterval = setInterval(() => {
                        if (shakeCount % 2 === 0) {
                            hama.style.transform = 'translate(-50%, -50%) translateX(5px)';
                        } else {
                            hama.style.transform = 'translate(-50%, -50%) translateX(-5px)';
                        }
                        shakeCount++;
                        
                        if (shakeCount > 10) {
                            clearInterval(shakeInterval);
                            // 抖动结束后消失
                            hama.style.opacity = '0';
                            hama.style.transition = 'opacity 0.3s';
                            setTimeout(() => {
                                hama.remove();
                            }, 300);
                        }
                    }, 50);
                });
                
                hama.setAttribute('data-hama', 'true');
                document.body.appendChild(hama);
                animateHamaFromCenter();
            }
            
            // 特殊蛤蟆（喜鹊）
            function createSpecialHama() {
                const hama = document.createElement('div');
                hama.textContent = '蛤蟆';
                hama.style.position = 'fixed';
                hama.style.fontSize = '20px';
                hama.style.color = '#ffffff';
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
                let finalX, finalY;
                
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
                        finalX = targetX;
                        finalY = targetY;
                        hama.style.pointerEvents = 'auto';
                        hama.style.cursor = 'not-allowed';
                    }
                }
                
                // 点击特殊蛤蟆时的效果
                hama.addEventListener('click', function() {
                    if (isClicked) return;
                    isClicked = true;
                    hama.style.pointerEvents = 'none';
                    
                    // 变成喜鹊，变大
                    hama.textContent = '喜鹊';
                    hama.style.fontSize = '40px';
                    hama.style.color = 'red';
                    hama.style.transition = 'font-size 0.3s';
                    
                    // 飞一圈（绕屏幕中间，总共螺旋绕三圈然后消失）
                    const flyDuration = 8000;  // 8秒飞行（总共绕三圈 + 上升消失）
                    const flyStartTime = Date.now();
                    const screenCenterX = window.innerWidth / 2;
                    const screenCenterY = window.innerHeight / 2;
                    const radius = 100;  // 圆形半径
                    
                    function animateFly() {
                        const flyElapsed = Date.now() - flyStartTime;
                        const flyProgress = Math.min(flyElapsed / flyDuration, 1);
                        
                        let flyX, flyY;
                        
                        // 总共绕三圈，半径逐渐变大
                        const totalRotations = 3;  // 总共转 3 圈
                        const angle = flyProgress * totalRotations * Math.PI * 2;
                        
                        // 半径逐渐变大，从 radius 扩大到 radius 的 3 倍
                        const currentRadius = radius + radius * 5 * flyProgress;
                        
                        flyX = screenCenterX + Math.cos(angle) * currentRadius;
                        flyY = screenCenterY + Math.sin(angle) * currentRadius;
                        
                        hama.style.left = flyX + 'px';
                        hama.style.top = flyY + 'px';
                        
                        if (flyProgress < 1) {
                            requestAnimationFrame(animateFly);
                        } else {
                            // 飞行结束后消失
                            hama.style.opacity = '0';
                            hama.style.transition = 'opacity 0.5s';
                            setTimeout(() => {
                                hama.remove();
                                
                                // 删除所有蛤蟆
                                const allHamas = document.querySelectorAll('[data-hama]');
                                allHamas.forEach(h => {
                                    h.style.opacity = '0';
                                    h.style.transition = 'opacity 0.5s';
                                    setTimeout(() => {
                                        h.remove();
                                        
                                        // 所有蛤蟆都消失后，跳转到tree.html
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
            }            // 滚动事件监听
            window.addEventListener('scroll', function () {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

                // 只有当scrollProgress增大时才触发动画（防止回滚时触发）
                if (scrollProgress > lastProgress) {
                    // 根据滚动百分比分阶段生成掉落文字（每个区间只生成一次）
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
                    // 0.6-0.8 之间不生成任何东西
                    // scrollProgress > 0.8 时分段生成蛤蟆
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
                
                // 更新lastProgress用于下一次比较
                lastProgress = scrollProgress;
            });
        }, 2800);
    });
});
