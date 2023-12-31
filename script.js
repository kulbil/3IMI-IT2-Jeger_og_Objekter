let x = 0; 
let y = 0; 

var player = document.getElementById("player");
let wall = document.getElementById("middlePart");
let targets = document.getElementsByClassName("targets");
let timer = document.getElementById("timer");
let gameTimer = document.getElementById("gameTimer");
let timerBar = document.getElementById("timerBar");
let gameTimerBar = document.getElementById("gameTimerBar");
let scoreCounter = document.getElementById("scoreCounter");

let spawnedTargets = [];


//Opening creations

let openingPos = (Math.random() * screen.width);
let openingCol = "";
let openingView = "";
let openingStatus = "open";


function createOpening() {
    let openingColConst = $('<div></div>');
    openingColConst.attr("class", "openingCol");
    openingColConst.css("width", ($(window).height()/6));
    openingColConst.css("left", openingPos - ($(window).height()/12));
    openingColConst.css("z-index", "2");
    openingColConst.css("border", "1px red solid");
    $("#screenSplits").append(openingColConst);
    openingCol = document.getElementsByClassName("openingCol")[0];
    
    let openingViewConst = $('<div></div>');
    openingViewConst.attr("class", "openingView");
    openingViewConst.css("width", ($(window).height()/6 + player.width));
    openingViewConst.css("left", openingPos - ($(window).height()/12) - player.width/2);
    openingViewConst.css("z-index", "1");
    openingViewConst.css("background-color", "white");
    $("#screenSplits").append(openingViewConst);
    openingView = document.getElementsByClassName("openingView")[0];
}



function getOverlapCheck(rect1, rect2) {
    const overlap =!(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    )
    return overlap
} 

let currentScreen = "top";
let passing = false;

document.onmousemove = function(e) { 
    x = e.clientX; 
    y = e.clientY; 


    const playerRect = player.getBoundingClientRect()
    const openingRect = openingCol.getBoundingClientRect()

    const openingOverlap = !(
        playerRect.right < openingRect.left ||
        playerRect.left > openingRect.right ||
        playerRect.bottom < openingRect.top ||
        playerRect.top > openingRect.bottom
    ) 


    if(openingOverlap && !passing) {
        console.log("passing");
        passing = true;
        
    } else if (!openingOverlap && passing) {
        console.log("Not passing")
        passing = false;
        if (currentScreen == "top" && y > ($(window).height()/2)) {
            currentScreen = "bottom";
        } else if (currentScreen == "bottom" && y < ($(window).height()/2)) {
            currentScreen = "top";
        }
        console.log(currentScreen)
    }

    updatePosition(currentScreen, e.clientY);  
};

function updatePosition(currentScreen, clientY) {

    if((currentScreen == "top" && clientY < (Math.round(($(window).height()/2)) - player.width/2)) || (currentScreen == "bottom" && clientY > (Math.round(($(window).height()/2))) + player.width/2) || passing) {
        player.style.top = (y - player.width/2) + "px";
    } else {
        if(currentScreen == "top") {
            player.style.top = (($(window).height()/2) - player.width) + "px";
        } else {
            player.style.top = (($(window).height()/2)) + "px";

        }
    }
    player.style.left = (x - player.width/2) + "px";


    const playerRect = player.getBoundingClientRect()
    for (i = 0; i < targets.length; i++) {
        const targetRect = targets[i].getBoundingClientRect()
        const targetOverlap = !(
            playerRect.right < targetRect.left ||
            playerRect.left > targetRect.right ||
            playerRect.bottom < targetRect.top ||
            playerRect.top > targetRect.bottom
        ) 
        if (targetOverlap) {
            scoreCounter.innerHTML++
            spawnedTargets.splice(i, 1);
            $(".targets").eq(i).remove();
        } else {
            console.log("not touching yet")
        }
    }
}


let targetList = [
    {
        name: "Avocado", 
        image: "images/avocado.png",
        points: 3
    },
    {
        name: "Banana", 
        image: "images/banana.png",
        points: 5
    },
    {  
        name: "battery", 
        image: "images/battery.png",
        points: 10
    }
];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createTarget(){
    let rand = Math.floor(Math.random() * targetList.length);
    let randLocX = Math.floor(Math.random() * ($(window).width()/2))
    let randLocy = randomIntFromInterval(Math.floor(($(window).height()/2)), ($(window).height() - ($(window).height()/10)));
    let randLoc = [randLocX, randLocy]

    let newTarget = new food(targetList[rand].name, targetList[rand].image, randLoc, targetList[rand].points);

    spawnedTargets.push(newTarget)
}

function spawnTargets() {
    for(let i = 0; i < spawnedTargets.length; i++) {
        let targetConst = $('<img></img>');
        targetConst.css("left", spawnedTargets[i].location[0]);
        targetConst.css("top", spawnedTargets[i].location[1]);
        targetConst.attr("class", "targets");
        targetConst.attr("src", spawnedTargets[i].image);
        targetConst.attr("points", spawnedTargets[i].points);
        $("#screenSplits").append(targetConst);
    }
}

function playerLose() {
    alert("You lose and you got: " + scoreCounter.innerHTML + " points");
    scoreCounter.innerHTML = 0;
    gameTimerCountDown = 98;
    currentScreen = "top"
}

function playerWin() {
    alert("You finished and you got: " + scoreCounter.innerHTML + " points");
    scoreCounter.innerHTML = 0;
    gameTimerCountDown = 98;
    currentScreen = "top"
}

let timerCountDown = 98;
function timerFunc() {
    timerBar.style.width = timerCountDown + "%";
    timerCountDown -= 1.5
}

let gameTimerCountDown = 98;
function gameTimerFunc() {
    gameTimerBar.style.width = gameTimerCountDown + "%";
    gameTimerCountDown--
    if (gameTimerCountDown < 0) {
        clearInterval(gameTimerFunc)
        playerWin()
    }
}

function moveOpening() {
    if (openingStatus == "open") {
        openingPos  = Math.round(Math.random() * screen.width);

        openingCol.style.left = openingPos + "px";
        openingView.style.left = openingPos  - player.width/2 + "px";
        spawnedTargets = [];
        for (i = 0; i <= targets.length; i++) {
            $(".targets").eq(0).remove();
        }
        $(".openingCol").eq(0).remove();
        $(".openingView").eq(0).remove();
        openingStatus = "closed";
        timerCountDown = 98;
        if(currentScreen == "bottom") {
            playerLose()
        }

    } else if(openingStatus == "closed") {
        createOpening();
        createTarget();
        createTarget();
        spawnTargets();
        console.log(spawnedTargets);
        openingStatus = "open";
        timerCountDown = 98;
    }
}

scoreCounter.innerHTML = 0;
setInterval(gameTimerFunc, 200)
createOpening();
createTarget();
createTarget();
spawnTargets();
setInterval(timerFunc, 1)
setInterval(moveOpening, 1000);
