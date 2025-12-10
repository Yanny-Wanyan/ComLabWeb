document.addEventListener("DOMContentLoaded", function(){
   //background image: grandma sitting by the desk
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
   sewingBgImg.style.maxWidth = '100%';  
   sewingBgImg.style.maxHeight = '100%';  
   sewingBg.appendChild(sewingBgImg);
   document.body.appendChild(sewingBg);

    // centerDiv: embroidery plane
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
    centerDiv.style.overflow = 'hidden';  
    document.body.appendChild(centerDiv);
    
    // hover
    centerDiv.addEventListener('mouseenter', function() {
        centerDiv.style.backgroundColor = 'rgba(255, 200, 100, 0.4)';
    });
    
    centerDiv.addEventListener('mouseleave', function() {
        centerDiv.style.backgroundColor = 'transparent';
    });
    
    // click event: split window
    centerDiv.addEventListener('click', function() {
        // leftContainer: display embroidery canva
        const leftContainer = document.createElement('div');
        leftContainer.id = 'left-container';
        leftContainer.style.position = 'fixed';
        leftContainer.style.top = '0';
        leftContainer.style.left = '0';
        leftContainer.style.width = 'calc(60% - 5px)';
        leftContainer.style.height = '100%';
        leftContainer.style.backgroundColor = '#ecb57e';
        leftContainer.style.zIndex = '999';
        leftContainer.style.display = 'flex';
        leftContainer.style.alignItems = 'center';
        leftContainer.style.justifyContent = 'center';
        leftContainer.style.padding = '20px';
        leftContainer.style.boxSizing = 'border-box';
        document.body.appendChild(leftContainer);
        
        // centerDiv transform accordingly
        centerDiv.style.position = 'relative';
        centerDiv.style.top = 'auto';
        centerDiv.style.left = 'auto';
        centerDiv.style.transform = 'none';
        centerDiv.style.width = 'auto';
        centerDiv.style.height = '90%';  
        centerDiv.style.aspectRatio = '3/4';  
        centerDiv.style.backgroundColor = '#fef6e5';
        centerDiv.style.padding = '10px';
        centerDiv.style.border = '30px solid #f5ce76';
        centerDiv.style.borderRadius = '12px';
        centerDiv.style.boxSizing = 'border-box';
        centerDiv.style.overflow = 'hidden';
        leftContainer.appendChild(centerDiv);
        
        // SewingBg transforms to right accordingly
        sewingBg.style.position = 'fixed';
        sewingBg.style.left = 'calc(60% + 5px)';
        sewingBg.style.top = '0';
        sewingBg.style.width = 'calc(40% - 5px)';  
        sewingBg.style.height = '100%';
        sewingBg.style.zIndex = '998';
        sewingBg.style.overflow = 'hidden';  
        // sewingBg.style.display = 'flex';  
        // sewingBg.style.alignItems = 'center';  
        // sewingBg.style.justifyContent = 'center';
        
        // emborideryImg initialization
        const embroideryImg = document.createElement('img');
        embroideryImg.id = 'embroidery-img';
        embroideryImg.src = 'assets/embroidery-image.png';
        embroideryImg.style.position = 'absolute';
        embroideryImg.style.width = '100%';
        embroideryImg.style.height = '100%';
        embroideryImg.style.objectFit = 'cover';
        embroideryImg.style.opacity = '0';  
        embroideryImg.style.left = '0';
        embroideryImg.style.top = '0';
        
        centerDiv.appendChild(embroideryImg);
        
        // cursor trail: 
        //tutorial: https://youtu.be/Gn25Cab1EQU?si=2BMYea9PCTLLjhjL
        // ai suggestions for using canva
        const canvas = document.createElement('canvas');
        canvas.id = 'trail-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '1000';
        canvas.style.cursor = 'none';
        centerDiv.appendChild(canvas);
        
        
        const rect = centerDiv.getBoundingClientRect();
        canvas.width = centerDiv.offsetWidth;
        canvas.height = centerDiv.offsetHeight;
        const ctx = canvas.getContext('2d');
        
        // cursor text: grandma
        const customCursor = document.createElement('div');
        customCursor.style.position = 'fixed';
        customCursor.style.pointerEvents = 'none';
        customCursor.style.fontSize = '18px';
        customCursor.style.fontWeight = 'bold';
        customCursor.style.color = 'white';
        customCursor.style.backgroundColor = 'darkorange';
        customCursor.style.borderRadius = '16px';
        customCursor.style.border = '2px #ffc500 solid'
        customCursor.style.zIndex = '1001';
        customCursor.style.display = 'none';
        customCursor.style.opacity = '1';
        customCursor.style.fontFamily = 'YRDZST';
        customCursor.style.transition = 'opacity 0.6s ease-out'; 
        customCursor.textContent = ' 奶奶 ';

        document.body.appendChild(customCursor);
        
        
        let totalMouseDistance = 0;  
        let lastMouseX = null;
        let lastMouseY = null;
        let trailPoints = [];
        
        centerDiv.addEventListener('mousemove', function(e) {
            
            customCursor.style.display = 'block';
            customCursor.style.left = (e.clientX + 10) + 'px';
            customCursor.style.top = (e.clientY + 10) + 'px';
            
            
            const centerRect = centerDiv.getBoundingClientRect();
            const relativeX = e.clientX - centerRect.left;
            const relativeY = e.clientY - centerRect.top;
            
            
            if (lastMouseX === null || lastMouseY === null) {
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
                trailPoints.push({x: relativeX, y: relativeY});
                return;
            }
            
           
            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            
            totalMouseDistance += distance;
            
            
            if (distance > 5) {
                trailPoints.push({x: relativeX, y: relativeY});
            }
            
           
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            
            
            drawTrail();
            
            // Adjust the opacity of the embroidery
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
            
            //disappear after embroidery fully emerges
            if (opacity >= 0.98) {
                customCursor.style.opacity = '0';
                canvas.style.opacity = '0';
                canvas.style.transition = 'opacity 0.6s ease-out';
                
                
                setTimeout(() => {
                    leftContainer.style.width = '100%';
                    leftContainer.style.transition = 'width 0.8s ease-in-out';
                    sewingBg.style.display = 'none';
                }, 1000);
            }
        });
        
        // cursor trail
        function drawTrail() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (trailPoints.length < 2) return;
            
            ctx.strokeStyle = 'rgba(139, 115, 85, 0.6)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.beginPath();
            ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
            
            for (let i = 1; i < trailPoints.length; i++) {
                ctx.lineTo(trailPoints[i].x, trailPoints[i].y);
            }
            
            ctx.stroke();
        }
        
        
        centerDiv.addEventListener('mouseleave', function() {
            lastMouseX = null;
            lastMouseY = null;
            customCursor.style.display = 'none';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        
        centerDiv.removeEventListener('click', arguments.callee);
    });
    

    
    //mochi text animation
    let mochiClickTriggered = false;
    document.addEventListener('click', function() {
        const leftContainer = document.querySelector('#left-container');
        if (leftContainer && leftContainer.style.width === '100%' && !mochiClickTriggered) {
            mochiClickTriggered = true;
            
            // create mochi text
            const mochi = document.createElement('div');
            mochi.textContent = '糍粑';
            mochi.style.position = 'fixed';
            mochi.style.fontSize = '48px';
            mochi.style.fontWeight = 'bold';
            mochi.style.color = 'darkorange';
            mochi.style.zIndex = '10000';
            mochi.style.pointerEvents = 'none';
            mochi.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
            document.body.appendChild(mochi);
            
            // animation
            const duration = 4000;  
            const startTime = Date.now();
            const amplitude = window.innerHeight * 0.2;
            const frequency = 2;
            
            function animateMochi() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / duration;
                
                if (progress >= 1) {
                    
                    mochi.remove();
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 1.5s ease-out';
                    
                    
                    
                    window.location.href = 'well_1.html'
                    return;
                }
                
                
                const x = progress * window.innerWidth;
                const y = (window.innerHeight / 2) + Math.sin(progress * Math.PI * frequency) * amplitude;
                mochi.style.left = x + 'px';
                mochi.style.top = y + 'px';
                mochi.style.opacity = 1 - progress;
                
                requestAnimationFrame(animateMochi);
            }
            
            animateMochi();
        }
    });
});


