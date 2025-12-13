Entry Page: 

* Two divs \- for moon-text gif image and the start icon

First Page:

* WindowHeight divs \- to create long scroll pages  
* Background div \- for background image and fixed  
* Cursor text div \- composed of span for cursor texts interaction  
* The stars background and moon-text are created as *Pseudo-element* for easy opacity control.

  \* Moon, Sun, grandpa, long-transition page and the small-town background are divs created by js


  

Supermarket:

* Background div \- for supermarket background image, inviting horizontal scroll  
* Product hotspots \- divs created through js, but text font is defined in css  
* Grandpa image div \- the pointer event in css is none, enabling smooth scrolling Experience.  
* Hotspots are divs created in js for interaction and the falling animation is created in js by calculating the distance and controlling the rotation and scaling.  
* Grandma rains are div created in js and its animation is created by setting random sizes, rotations, positions and delays.


Embroidery:   
Every element is created in js. The background image is in a background div \<sewingBg\>, and there is another div on the position of the embroidery plate \<centerDiv\>. When you click on the \<centerDiv\>,  there will be a new div \<leftContainer\> created to occupy  the left 70% of the window, and the original background div \<sewingBg\> will go to the right 30% place, while the embroidery div  \<centerDiv\> will position itself into the center of the \<leftContainer\>. There is a 5px margin between the \<leftContainer\> and \<sewingBg\>, to avoid overwhelming feeling. When you finish “sewing” (The opacity of the embroidery pattern is equal to “1”), the \<leftContainer\> would cover the whole screen for display. Overall, not a lot css design for this page.

Well page:   
	Again every element is created in js. The background image is in \<background\> div, and the mochi image is in the \<ricecakeDiv\>which is placed at the foot of the well. An \<instructionDiv\> is created to put the instruction gif at the top right corner of the page. When you click on the \<ricecakeDiv\>, it triggers a ricecakeAnimation in css which displays the mochi falling into the well.  
	After the animation, the original divs are removed, instead a new background div \<deepWellBackground\> is created to cover the window which contains a dark background image that fixes the window. When you scroll down, four groups of mochi divs are created from four directions falling into the center. When scrolling reaches a certain value, \<hama\> (frog) divs are created from the center to jump out. At the same time a special hama is created.   
Their animations are designed in js as well. The mochi falling down effect is basically four group of mochis, createMochiFromTop(), createMochiFromLeft(), createMochiFrombottom(), createMochiFromRight(), and they scale, rotate, translate and change opacity during a certain amount of time. The shaking effect of hama is also defined in js where it translates differently in odd and even count and disappear (opacity \= 0\) after counting 10 times. The special hama which transforms into a magpie would instead fly in circles  on the screen for three rounds whose radius is getting larger showing it is flying out. If I have more time, I would add some rotation effects for the frogs and magpie making their performance more natural.

Tree page:  
Every element is created in js again again. A \<background\> div is created once the page is loaded for the \<bgImg\>. And once your mouse moves around on any place on the window, three text div for magpie are created and coming out from the outside of the window. Their flying animations are set in js by trigonometric calculation and would start waving once they reach the assigned positions. When you click on them, their opacity turns to ‘0’, and an \<cursorImg\> would appear to an assigned relative position following the cursor. After three magpies are clicked, a \<triggerDiv\> would appear on the nest, on which you click, a new half-transparent div \< overlayBg\> would come from the bottom carrying a \<textContainer\> with lyrics and links to previous pages. Also a grandparent image \<endingImg\> is created and walked into the page celebrating the end of story. At the same time, the nursery rhyme starts, inviting you to review the story.