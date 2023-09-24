let x = 0; 
let y = 0; 

var player = document.getElementById("player")
let wall = document.getElementById("middlePart")


//Opening creations

let openingPos = (Math.random() * screen.width);

//Creating the opening Opening Colission
let openingColConst = $('<div></div>');
openingColConst.attr("class", "openingCol");
openingColConst.css("width", ($(window).height()/6));
openingColConst.css("left", openingPos - ($(window).height()/12));
openingColConst.css("z-index", "2");
openingColConst.css("border", "1px red solid");
$("#screenSplits").append(openingColConst);
let openingCol = document.getElementsByClassName("openingCol")[0];

let openingViewConst = $('<div></div>');
openingViewConst.attr("class", "openingView");
openingViewConst.css("width", ($(window).height()/6 + player.width));
openingViewConst.css("left", openingPos - ($(window).height()/12) - player.width/2);
openingViewConst.css("z-index", "1");
openingViewConst.css("background-color", "white");
$("#screenSplits").append(openingViewConst);
let openingView = document.getElementsByClassName("openingView")[0];


function moveOpening() {
    let newopeningPos = (Math.random() * screen.width);
    openingCol.left = 1000;
    openingView.left = 1000;
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
}




/*
    let vector = [(x2 + x1), (y2 + y1)];
    console.log("Vector: " + vector);

    let angle = Math.acos(vector[0] / vector[1]);
    console.log(angle);

    let hyp = Math.abs(vector[0], vector[1]);
    console.log("Hypothenus: " + hyp);
*/