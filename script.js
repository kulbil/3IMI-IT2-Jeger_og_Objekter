let x = 0; 
let y = 0; 

var player = document.getElementById("player")
let wall = document.getElementById("middlePart")


//Opening creations

let openingPos = (Math.random() * screen.width);

//Creating the opening collision
let openingCon = $('<div></div>');


/*
let openingPos = (Math.random() * screen.width)

let openingCon = $('<div></div>');
openingCon.attr("class", "opening");
openingCon.css("left", openingPos);
openingCon.css("z-index", "2");
openingCon.css("border", "1px red solid");

$("#screenSplits").append(openingCon);
let opening = document.getElementsByClassName("opening")[0];

//seperate visible hole to make passing feel better
let openingViewCon = $('<div></div>');
openingViewCon.css("background-color", "white");
openingViewCon.attr("class", "openingView");
openingViewCon.css("z-index", "1");
openingViewCon.css("width", (opening.style.width + player.width*2));
openingViewCon.css("left", openingPos - 50);
$("#screenSplits").append(openingViewCon);

//console.log(opening.style.width)
//console.log(player.width)
console.log(opening.width + player.width*2)
console.log(1)
*/
let currentScreen = "top";
let passing = false;

document.onmousemove = function(e) { 
    x = e.clientX; 
    y = e.clientY; 


    const playerRect = player.getBoundingClientRect()
    const openingRect = opening.getBoundingClientRect()

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