
//create a big div for grandpaImg and a small div inside for shopping cart
function createGrandpaContainer() {
    //boolean check
    let container = document.querySelector('#grandpa-container');
    if (container) return container;
    
    
    // grandpa div
    container = document.createElement('div');
    container.id = 'grandpa-container';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.left = '50px';
    container.style.width = '800px';
    container.style.height = '600px';
    container.style.zIndex = '999';
    container.style.overflow = 'hidden';  
    
 
    //grandpa image
    let grandpaImg = document.createElement('img');
    grandpaImg.id = 'grandpa-img';
    grandpaImg.src = 'assets/grandpa-inshop.png';
    grandpaImg.style.position = 'absolute';
    grandpaImg.style.width = '100%';
    grandpaImg.style.height = '100%';
    grandpaImg.style.objectFit = 'cover';  
    grandpaImg.style.left = '0';
    grandpaImg.style.top = '0';
    

    //shopping cart div 
    let shoppingCart = document.createElement('div');
    shoppingCart.id = 'shopping-cart';
    shoppingCart.style.position = 'absolute';
    shoppingCart.style.right = '90px';           
    shoppingCart.style.bottom = '140px';          
    shoppingCart.style.width = '280px';          
    shoppingCart.style.height = '140px';         
    // shoppingCart.style.backgroundColor = 'rgba(255, 150, 0, 0.3)';  
    // shoppingCart.style.border = '2px solid orange';
    // shoppingCart.style.borderRadius = '8px';
    // shoppingCart.style.overflow = 'auto';        
    shoppingCart.style.padding = '10px';
    shoppingCart.style.boxSizing = 'border-box';
    
    
    // include elements
    container.appendChild(grandpaImg);
    container.appendChild(shoppingCart);
    document.body.appendChild(container);
    
    return container;
}

// getgrandpa's position
function getGrandpaContainer() {
    return document.querySelector('#grandpa-container');
}

// create grandma
function createGrandmaContainer() {
    let container = document.querySelector('#grandma-container');
    if (container) return container;
    
    // container
    container = document.createElement('div');
    container.id = 'grandma-container';
    container.style.position = 'fixed';
    container.style.bottom = '60px';
    container.style.left = 'auto';
    container.style.right = '0';  
    container.style.width = '400px';
    container.style.height = '500px';
    container.style.zIndex = '998'; 
    container.style.overflow = 'hidden';
    container.style.display = 'none';
    container.style.cursor = 'pointer';  // 可点击指针
    
    // image
    let grandmaImg = document.createElement('img');
    grandmaImg.id = 'grandma-img';
    grandmaImg.src = 'assets/grandma-inshop.png';
    grandmaImg.style.position = 'absolute';
    grandmaImg.style.width = '100%';
    grandmaImg.style.height = '100%';
    grandmaImg.style.objectFit = 'cover';
    grandmaImg.style.left = '0';
    grandmaImg.style.top = '0';
    
    container.appendChild(grandmaImg);
    document.body.appendChild(container);
    
    // hover 
    container.addEventListener('mouseenter', function() {
        const scrollXPercent = getSupermarketScrollXPercentage();
        if (scrollXPercent > 99) {
            grandmaImg.src = 'assets/grandma-hovered.png';
        }
    });
    
    container.addEventListener('mouseleave', function() {
        const scrollXPercent = getSupermarketScrollXPercentage();
        if (scrollXPercent > 99) {
            grandmaImg.src = 'assets/grandma-inshop.png';
        }
    });
    
    // click grandma image and create grandma rains
    container.addEventListener('click', function() {
        const scrollXPercent = getSupermarketScrollXPercentage();
        if (scrollXPercent > 99) {
            // 创建大量掉落的"奶奶"文字
            createGrandmaRain();
        }
    });
    
    return container;
}


function getGrandmaContainer() {
    return document.querySelector('#grandma-container');
}

// get horizontal scroll percenatge
function getSupermarketScrollXPercentage() {
    const supermarketBg = document.querySelector('#supermarket-background');
    
    if (!supermarketBg) return 0;
    
    const scrollLeft = supermarketBg.scrollLeft;
    const scrollWidth = supermarketBg.scrollWidth;
    const clientWidth = supermarketBg.clientWidth;
    const maxHorizontalScroll = scrollWidth - clientWidth;
    
    if (maxHorizontalScroll === 0) return 0;
    const percentageX = (scrollLeft / maxHorizontalScroll) * 100;
    console.log("supermarket scrollLeft:", scrollLeft, "percentage:", percentageX);
    return percentageX;
}

// grandpa's walking posture
function getGrandpaWalkPose(percentage) {
    const walkWave = Math.sin(percentage * Math.PI/3) * 2; 
    return walkWave;
}

// grandpa's walking
function updateGrandpaWalking(container) {
    if (!container) return;
    //positions and distances
    const scrollXPercent = getSupermarketScrollXPercentage(); 
    const containerWidth = 800;
    const startLeft = 50;
    const targetLeft = window.innerWidth - containerWidth - 50;
    const currentLeft = startLeft + (targetLeft - startLeft) * (scrollXPercent / 100);
    
    //walking posture
    const walkPose = getGrandpaWalkPose(scrollXPercent);
    
    // get walking status
    container.style.left = currentLeft + 'px';
    container.style.transform = `rotate(${walkPose}deg)`;
    
    // swap grandpaImg
    const grandpaImg = container.querySelector('#grandpa-img');
    if (grandpaImg) {
        if (scrollXPercent > 90) {
            grandpaImg.src = 'assets/grandpa-with-hearts.png';
        } else {
            grandpaImg.src = 'assets/grandpa-inshop.png';
        }
    }
}

// grandma's walking
function updateGrandmaWalking(container) {
    if (!container) return;
    
    const scrollXPercent = getSupermarketScrollXPercentage();
    
    // appears after 75% scrolling
    if (scrollXPercent < 75) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    const effectivePercent = (scrollXPercent - 75) / 25;  
    const clampedPercent = Math.min(1, Math.max(0, effectivePercent));
    const startLeft = window.innerWidth;  
    const stopLeft = window.innerWidth * 0.2;  
    const currentLeft = startLeft + (stopLeft - startLeft) * clampedPercent;
    const walkPose = getGrandpaWalkPose(scrollXPercent);
    
    container.style.left = currentLeft + 'px';
    container.style.right = 'auto';
    container.style.transform = `rotate(${walkPose}deg)`;  
}

// Initialization
document.addEventListener("DOMContentLoaded", function() {
   //Initialize grandpa and grandma
    const grandpaContainer = createGrandpaContainer();
    const grandmaContainer = createGrandmaContainer();
    
    // set scrolling event to the marketbackground
    const supermarketBg = document.querySelector('#supermarket-background');
    if (supermarketBg) {
        supermarketBg.addEventListener("scroll", function() {
            updateGrandpaWalking(grandpaContainer);
            updateGrandmaWalking(grandmaContainer);
        });
        
       //initialize hospots 
        createHotspots(supermarketBg);
    }
});

// Create hospots for shopping
function createHotspots(supermarketBg) {
    // A container for all hotspots
    //allow me to adjust the overall position
    let hotspotsContainer = document.createElement('div');
    hotspotsContainer.id = 'hotspots-container';
    hotspotsContainer.style.position = 'absolute';
    hotspotsContainer.style.left = '10px';           
    hotspotsContainer.style.top = '90px';            
    hotspotsContainer.style.width = '3600px';       
    hotspotsContainer.style.height = '500px';       
    hotspotsContainer.style.transform = 'scale(1)'; 
    
    //positions info for each element
    const WIDTH = 100;        
    const HEIGHT = 50;        
    const MARGIN_LEFT = 30;   
    const MARGIN_RIGHT = 30;  
    const MARGIN_TOP = 10;    
    const MARGIN_BOTTOM = 100; 
    const ITEM_SPAN = WIDTH + MARGIN_LEFT + MARGIN_RIGHT;  // the total width for each hotspot
    const ROW_SPAN = HEIGHT + MARGIN_TOP + MARGIN_BOTTOM;  // the total height for each row
    
    // ============ first row ============
    createHotspot(hotspotsContainer, 0 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 1 * ITEM_SPAN + 70, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '酸奶');
    createHotspot(hotspotsContainer, 2 * ITEM_SPAN + 100, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '奶酪');
    createHotspot(hotspotsContainer, 3 * ITEM_SPAN + 150, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '黄油');
    createHotspot(hotspotsContainer, 4 * ITEM_SPAN + 150, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 5 * ITEM_SPAN + 120, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '谷物');
    createHotspot(hotspotsContainer, 6 * ITEM_SPAN + 80, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '鸡蛋');
    createHotspot(hotspotsContainer, 7 * ITEM_SPAN + 100, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '培根');
    createHotspot(hotspotsContainer, 8 * ITEM_SPAN + 100, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '火腿');
    createHotspot(hotspotsContainer, 9 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '香肠');
    createHotspot(hotspotsContainer, 10 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '肉类');
    createHotspot(hotspotsContainer, 11 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '家禽');
    createHotspot(hotspotsContainer, 12 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '蔬菜');
    createHotspot(hotspotsContainer, 13 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '水果');
    createHotspot(hotspotsContainer, 14 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '沙拉');
    createHotspot(hotspotsContainer, 15 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '番茄');
    createHotspot(hotspotsContainer, 16 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '黄瓜');
    createHotspot(hotspotsContainer, 17 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '生菜');
    createHotspot(hotspotsContainer, 18 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '饼干');
    createHotspot(hotspotsContainer, 19 * ITEM_SPAN + MARGIN_LEFT, 0 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    
    // ============ second row ============
    createHotspot(hotspotsContainer, 0 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '巧克力');
    createHotspot(hotspotsContainer, 1 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '薯片');
    createHotspot(hotspotsContainer, 2 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '酒水');
    createHotspot(hotspotsContainer, 3 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '咖啡');
    createHotspot(hotspotsContainer, 4 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '茶');
    createHotspot(hotspotsContainer, 5 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '果汁');
    createHotspot(hotspotsContainer, 6 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 7 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '酸奶');
    createHotspot(hotspotsContainer, 8 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '奶酪');
    createHotspot(hotspotsContainer, 9 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '黄油');
    createHotspot(hotspotsContainer, 10 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 11 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '谷物');
    createHotspot(hotspotsContainer, 1 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '鸡蛋');
    createHotspot(hotspotsContainer, 13 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '培根');
    createHotspot(hotspotsContainer, 14 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '火腿');
    createHotspot(hotspotsContainer, 15 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '香肠');
    createHotspot(hotspotsContainer, 16 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 17 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '果汁');
    createHotspot(hotspotsContainer, 18 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '蔬菜');
    createHotspot(hotspotsContainer, 19 * ITEM_SPAN + MARGIN_LEFT, 1 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '水果');
    
    // ============ third row ============
    createHotspot(hotspotsContainer, 0 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '沙拉');
    createHotspot(hotspotsContainer, 1 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '番茄');
    createHotspot(hotspotsContainer, 2 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '黄瓜');
    createHotspot(hotspotsContainer, 3 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 4 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '饼干');
    createHotspot(hotspotsContainer, 5 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 6 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '巧克力');
    createHotspot(hotspotsContainer, 7 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '零食');
    createHotspot(hotspotsContainer, 8 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '饮料');
    createHotspot(hotspotsContainer, 9 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '咖啡');
    createHotspot(hotspotsContainer, 10 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '茶');
    createHotspot(hotspotsContainer, 11 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '果汁');
    createHotspot(hotspotsContainer, 12 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 13 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 14 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 15 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 16 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 17 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 18 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 19 * ITEM_SPAN + MARGIN_LEFT, 2 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '罐头');
    
    // ============ fourth row ============
    createHotspot(hotspotsContainer, 0 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 1 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 2 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 3 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 4 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '酸奶');
    createHotspot(hotspotsContainer, 5 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '罐头');
    createHotspot(hotspotsContainer, 6 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 7 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '酒水');
    createHotspot(hotspotsContainer, 8 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 9 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '罐头');
    createHotspot(hotspotsContainer, 10 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 11 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 12 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 13 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 14 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '面包');
    createHotspot(hotspotsContainer, 15 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '酸奶');
    createHotspot(hotspotsContainer, 16 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    createHotspot(hotspotsContainer, 17 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '酸奶');
    createHotspot(hotspotsContainer, 18 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '糖果');
    createHotspot(hotspotsContainer, 19 * ITEM_SPAN + MARGIN_LEFT, 3 * ROW_SPAN + MARGIN_TOP, WIDTH, HEIGHT, '牛奶');
    
    //assign to supermarket background
    supermarketBg.appendChild(hotspotsContainer);
}

// create each hotspot
function createHotspot(parent, left, top, width, height, name) {

    // container
    let hotspot = document.createElement('div');
    hotspot.classList.add('product-selector');
    hotspot.style.position = 'absolute';
    hotspot.style.left = left + 'px';
    hotspot.style.top = top + 'px';
    hotspot.style.width = width + 'px';
    hotspot.style.height = height + 'px';
    hotspot.style.backgroundColor = 'transparent';
    hotspot.style.cursor = 'pointer';
    hotspot.style.transition = 'background-color 0.3s';
    // hotspot.style.border = '2px solid red'; 

    
    // text
    let text = document.createElement('div');
    text.classList.add('product-name');
    text.style.fontFamily ='YRDZST';
    text.textContent = name;
    text.style.position = 'absolute';
    text.style.width = '100%';
    text.style.height = '100%';
    text.style.display = 'flex';
    text.style.alignItems = 'center';
    text.style.justifyContent = 'center';
    text.style.color = 'white';
    text.style.fontSize = '16px';
    text.style.opacity = '0';
    text.style.transition = 'opacity 0.3s';
    text.style.pointerEvents = 'none';
    
    hotspot.appendChild(text);
    
    // Hover
    hotspot.addEventListener('mouseenter', function() {
        hotspot.style.backgroundColor = 'rgba(255, 200, 100, 0.4)';
        text.style.opacity = '1';
    });
    
    hotspot.addEventListener('mouseleave', function() {
        hotspot.style.backgroundColor = 'transparent';
        text.style.opacity = '0';
    });
    
    // click: texts fall to cart
    hotspot.addEventListener('click', function() {
        // get the position of hotspot
        const rect = hotspot.getBoundingClientRect();
        const screenLeft = rect.left;
        const screenTop = rect.top;
        addProductToCart(name, screenLeft, screenTop);
    });
    
    parent.appendChild(hotspot);
}

// products falling down into cart
function addProductToCart(productName, startLeft, startTop) {
    const shoppingCart = document.querySelector('#shopping-cart');
    const grandpaContainer = document.querySelector('#grandpa-container');
    if (!shoppingCart || !grandpaContainer) return;
    
    // Create the falling items (falling texts)
    let fallingProduct = document.createElement('div');
    fallingProduct.textContent = productName;
    fallingProduct.style.position = 'fixed';
    fallingProduct.style.left = startLeft + 'px';
    fallingProduct.style.top = startTop + 'px';
    fallingProduct.style.padding = '5px 10px';
    fallingProduct.style.backgroundColor = 'rgba(255, 150, 0, 0.8)';
    fallingProduct.style.fontFamily = 'YRDZST';
    fallingProduct.style.color = 'white';
    fallingProduct.style.borderRadius = '5px';
    fallingProduct.style.fontSize = '16px';
    fallingProduct.style.zIndex = '1000';
    fallingProduct.style.pointerEvents = 'none';
    fallingProduct.style.whiteSpace = 'nowrap';
    
    document.body.appendChild(fallingProduct);
    
    // Get the relative positions
    const cartRect = shoppingCart.getBoundingClientRect();
    const containerRect = grandpaContainer.getBoundingClientRect();
    const cartRelativeLeft = cartRect.left - containerRect.left;
    const cartRelativeTop = cartRect.top - containerRect.top;
    const cartWidth = cartRect.width;
    const cartHeight = cartRect.height;
    

    const itemWidth = 80;
    const itemHeight = 28;  
    const randomRelativeX = Math.random() * (cartWidth - itemWidth - 10); 
    const randomRelativeY = Math.random() * (cartHeight - itemHeight - 10); 
    
    // converted to fixed position (for animation use)
    const randomX = containerRect.left + cartRelativeLeft + randomRelativeX;
    const randomY = containerRect.top + cartRelativeTop + randomRelativeY;
    
    const randomRotation = (Math.random() - 0.5) * 360;  
    
    // falling animation
    let startTime = Date.now();
    const duration = 1000; 
    
    function animateFall() {
        let elapsed = Date.now() - startTime;
        let progress = elapsed / duration;
        
        if (progress >= 1) {
            // animation end in the cart 
            addProductToCartPile(productName, randomRelativeX, randomRelativeY, randomRotation);
            fallingProduct.remove();
            return;
        }
        
        let currentLeft = startLeft + (randomX - startLeft) * progress;
        let currentTop = startTop + (randomY - startTop) * progress * progress;  
        let currentRotation = randomRotation * progress;
        let currentScale = 0.5 + progress * 0.5;  
        let opacity = progress * 0.9 + 0.1;
        
        fallingProduct.style.left = currentLeft + 'px';
        fallingProduct.style.top = currentTop + 'px';
        fallingProduct.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
        fallingProduct.style.opacity = opacity;
        
        requestAnimationFrame(animateFall);
    }
    
    animateFall();
}

// products piles
function addProductToCartPile(productName, relativeX, relativeY, rotation) {
    const shoppingCart = document.querySelector('#shopping-cart');
    if (!shoppingCart) return;
    
    // create products' absolute position (in terms of carts)
    let cartItem = document.createElement('div');
    cartItem.textContent = productName;
    cartItem.style.position = 'absolute';
    cartItem.style.left = relativeX + 'px';
    cartItem.style.top = relativeY + 'px';
    cartItem.style.padding = '4px 8px';
    cartItem.style.backgroundColor = 'rgba(255, 150, 0, 0.85)';
    cartItem.style.color = 'white';
    cartItem.style.fontSize = '16px';
    cartItem.style.borderRadius = '4px';
    cartItem.style.whiteSpace = 'nowrap';
    cartItem.style.transform = `rotate(${rotation}deg)`;
    cartItem.style.transformOrigin = 'left top';
    cartItem.style.pointerEvents = 'none';
    cartItem.style.fontFamily ='YRDZST';
    shoppingCart.appendChild(cartItem);
}

// grandma rains
function createGrandmaRain() {
    const duration = 2000;  
    
    function createRainDrop() {
        const drop = document.createElement('div');
        drop.textContent = '奶奶';
        drop.style.position = 'fixed';
        drop.style.left = Math.random() * window.innerWidth + 'px';
        drop.style.top = '-50px';
        drop.style.fontSize = (20 + Math.random() * 40) + 'px';  // 20-60px 随机大小
        drop.style.color = 'rgba(255, 100, 100, ' + (0.5 + Math.random() * 0.5) + ')';  // 红色半透明
        drop.style.fontWeight = 'bold';
        drop.style.zIndex = '9999';
        drop.style.pointerEvents = 'none';
        drop.style.whiteSpace = 'nowrap';
        drop.style.transform = 'rotate(' + (Math.random() - 0.5) * 60 + 'deg)';
        drop.style.opacity = '1';
        drop.style.fontFamily ='YRDZST';
        
        document.body.appendChild(drop);
        
        
        const dropStartTime = Date.now();
        const dropDuration = 1500 + Math.random() * 1500;  
        const endPosition = window.innerHeight - 60;  
        
        function animateDrop() {
            const elapsed = Date.now() - dropStartTime;
            const progress = elapsed / dropDuration;
            
            if (progress >= 1) {
                
                drop.style.opacity = '0';
                return;
            }
            
            const currentTop = -50 + endPosition * progress;
            drop.style.top = currentTop + 'px';
            
            requestAnimationFrame(animateDrop);
        }
        
        animateDrop();
    }
    
    
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    setTimeout(createRainDrop, Math.random() * 100);
    
    
    setTimeout(() => {
        window.location.href = 'embroidery.html';
    }, duration + 2000);  
}
