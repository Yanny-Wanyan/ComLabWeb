let catSound = document.querySelector("#catSound");


let playBtn = document.querySelector("#playButton");
let pauseBtn = document.querySelector("#pauseButton");
let speedBtn = document.querySelector("#speedButton");
let slowBtn = document.querySelector("#slowButton");
let soundSpeed = 1;

playBtn.addEventListener("click", function(){
    catSound.loop = true
    catSound.play()
})

pauseBtn.addEventListener("click", function(){
    catSound.pause()
})

speedBtn.addEventListener("click", function(){
    soundSpeed += 1
    catSound.playbackRate = soundSpeed
    console.log(soundSpeed)
})

slowBtn.addEventListener("click", function(){
    soundSpeed -= 1
    catSound.playbackRate = soundSpeed
    console.log(soundSpeed)
})