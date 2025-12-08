document.addEventListener("DOMContentLoaded", function(){
   //create a background image
   const sewingBg = document.createElement("div");
   sewingBg.id = "sewingBg";
   sewingBg.style.position = 'fixed';
   sewingBg.style.top = '0';
   sewingBg.style.left = '0';
   sewingBg.style.width = '100%';
   sewingBg.style.height = '100%';
   sewingBg.style.zIndex = '0';  
   
   const sewingBgImg = document.createElement('img');
   sewingBgImg.src = 'assets/sewingBgImg.png';
   sewingBgImg.style.width = '100%';
   sewingBgImg.style.height = '100%';
   sewingBgImg.style.objectFit = 'cover';
   sewingBgImg.style.maxWidth = '100%';  // 确保不超出容器
   sewingBgImg.style.maxHeight = '100%';  // 确保不超出容器
   sewingBg.appendChild(sewingBgImg);
   document.body.appendChild(sewingBg);

    // create a div for the embroidery plane to interact
    const centerDiv = document.createElement('div');
    centerDiv.id = 'center-div';
    centerDiv.style.position = 'fixed';
    centerDiv.style.top = '70%';
    centerDiv.style.left = '52%';
    centerDiv.style.transform = 'translate(-50%, -50%)';
    centerDiv.style.width = '730px';      
    centerDiv.style.height = '250px';     
    centerDiv.style.backgroundColor = 'transparent';
    centerDiv.style.zIndex = '999';
    centerDiv.style.cursor = 'pointer';
    centerDiv.style.overflow = 'hidden';  // 确保内部内容不超出
    document.body.appendChild(centerDiv);
    
    // hover
    centerDiv.addEventListener('mouseenter', function() {
        centerDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    });
    
    centerDiv.addEventListener('mouseleave', function() {
        centerDiv.style.backgroundColor = 'transparent';
    });
    
    // click event: split window
    centerDiv.addEventListener('click', function() {
        // 创建新的左侧容器（70%）
        const leftContainer = document.createElement('div');
        leftContainer.id = 'left-container';
        leftContainer.style.position = 'fixed';
        leftContainer.style.top = '0';
        leftContainer.style.left = '0';
        leftContainer.style.width = '70%';
        leftContainer.style.height = '100%';
        leftContainer.style.backgroundColor = '#ecb57e';
        leftContainer.style.zIndex = '999';
        leftContainer.style.display = 'flex';
        leftContainer.style.alignItems = 'center';
        leftContainer.style.justifyContent = 'center';
        leftContainer.style.padding = '20px';
        leftContainer.style.boxSizing = 'border-box';
        leftContainer.style.width = 'calc(70% - 10px)';  // 减去右边margin
        document.body.appendChild(leftContainer);
        
        // 改变 centerDiv 到新容器中心（按图片比例）
        centerDiv.style.position = 'relative';
        centerDiv.style.top = 'auto';
        centerDiv.style.left = 'auto';
        centerDiv.style.transform = 'none';
        centerDiv.style.width = 'auto';  // 在容器中的宽度
        centerDiv.style.height = '90%';  // 按比例自适应高度
        centerDiv.style.aspectRatio = '3/4';  // 根据图片比例调整
        centerDiv.style.backgroundColor = '#fef6e5';
        centerDiv.style.padding = '10px';
        centerDiv.style.border = '30px solid #f5ce76';
        centerDiv.style.borderRadius = '12px';
        centerDiv.style.boxSizing = 'border-box';
        centerDiv.style.overflow = 'hidden';
        leftContainer.appendChild(centerDiv);
        
        // 改变 sewingBg（背景）到右边 30%
        sewingBg.style.position = 'fixed';
        sewingBg.style.left = 'calc(70% + 5px)';  // 加上margin
        sewingBg.style.top = '0';
        sewingBg.style.width = 'calc(30% - 5px)';  // 减去margin
        sewingBg.style.height = '100%';
        sewingBg.style.zIndex = '998';
        sewingBg.style.overflow = 'hidden';  // crop 多出来的部分
        sewingBg.style.display = 'flex';  // 使用flexbox
        sewingBg.style.alignItems = 'center';  // 垂直居中
        sewingBg.style.justifyContent = 'center';  // 水平居中
        
        // 添加 embroidery 图片到 centerDiv（分割后）
        const embroideryImg = document.createElement('img');
        embroideryImg.id = 'embroidery-img';
        embroideryImg.src = 'assets/embroidery-image.png';
        embroideryImg.style.position = 'absolute';
        embroideryImg.style.width = '100%';
        embroideryImg.style.height = '100%';
        embroideryImg.style.objectFit = 'cover';
        embroideryImg.style.opacity = '0';  // 初始透明度为 0
        embroideryImg.style.left = '0';
        embroideryImg.style.top = '0';
        
        centerDiv.appendChild(embroideryImg);
        
        // 创建canvas用于绘制虚线trail
        const canvas = document.createElement('canvas');
        canvas.id = 'trail-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '1000';
        canvas.style.cursor = 'none';  // 隐藏默认cursor
        centerDiv.appendChild(canvas);
        
        // 设置canvas大小和样式
        const rect = centerDiv.getBoundingClientRect();
        canvas.width = centerDiv.offsetWidth;
        canvas.height = centerDiv.offsetHeight;
        const ctx = canvas.getContext('2d');
        
        // 创建自定义cursor元素（显示"奶奶"文字）
        const customCursor = document.createElement('div');
        customCursor.style.position = 'fixed';
        customCursor.style.pointerEvents = 'none';
        customCursor.style.fontSize = '16px';
        customCursor.style.fontWeight = 'bold';
        customCursor.style.color = 'darkorange';
        customCursor.style.zIndex = '1001';
        customCursor.style.display = 'none';
        customCursor.style.opacity = '1';
        customCursor.style.transition = 'opacity 0.6s ease-out';  // 添加过渡效果
        customCursor.textContent = '奶奶';

        document.body.appendChild(customCursor);
        
        // 追踪鼠标移动距离
        let totalMouseDistance = 0;  // 累计移动距离
        let lastMouseX = null;
        let lastMouseY = null;
        let trailPoints = [];  // 存储trail点的数组
        
        centerDiv.addEventListener('mousemove', function(e) {
            // 显示自定义cursor
            customCursor.style.display = 'block';
            customCursor.style.left = (e.clientX + 10) + 'px';
            customCursor.style.top = (e.clientY + 10) + 'px';
            
            // 获取相对于centerDiv的坐标
            const centerRect = centerDiv.getBoundingClientRect();
            const relativeX = e.clientX - centerRect.left;
            const relativeY = e.clientY - centerRect.top;
            
            // 如果是第一次移动，记录初始位置
            if (lastMouseX === null || lastMouseY === null) {
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
                trailPoints.push({x: relativeX, y: relativeY});
                return;
            }
            
            // 计算本次移动距离
            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 累计移动距离
            totalMouseDistance += distance;
            
            // 添加trail点（每5px添加一个点以优化性能）
            if (distance > 5) {
                trailPoints.push({x: relativeX, y: relativeY});
            }
            
            // 更新最后位置
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            
            // 绘制trail虚线
            drawTrail();
            
            // 根据移动距离调整透明度
            let opacity = 0;
            if (totalMouseDistance < 3000) {
                opacity = (totalMouseDistance / 3000) * 0.25;
            } else if (totalMouseDistance < 6000) {
                opacity = 0.25 + ((totalMouseDistance - 3000) / 3000) * 0.25;
            } else if (totalMouseDistance < 10000) {
                opacity = 0.5 + ((totalMouseDistance - 6000) / 4000) * 0.3;
            } else if (totalMouseDistance < 15000) {
                opacity = 0.8 + ((totalMouseDistance - 10000) / 5000) * 0.2;
            } else {
                opacity = 1;
            }
            
            embroideryImg.style.opacity = opacity;
            
            // 当opacity达到0.98时添加过渡效果让cursor逐渐消失
            if (opacity >= 0.98) {
                customCursor.style.opacity = '0';
                canvas.style.opacity = '0';
                canvas.style.transition = 'opacity 0.6s ease-out';
            }
        });
        
        // 绘制虚线trail的函数
        function drawTrail() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (trailPoints.length < 2) return;
            
            ctx.strokeStyle = 'rgba(139, 115, 85, 0.6)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);  // 虚线：5px线 + 5px空白
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.beginPath();
            ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
            
            for (let i = 1; i < trailPoints.length; i++) {
                ctx.lineTo(trailPoints[i].x, trailPoints[i].y);
            }
            
            ctx.stroke();
        }
        
        // 鼠标离开时重置追踪
        centerDiv.addEventListener('mouseleave', function() {
            lastMouseX = null;
            lastMouseY = null;
            customCursor.style.display = 'none';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        
        centerDiv.removeEventListener('click', arguments.callee);
    });
});


