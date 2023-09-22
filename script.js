let x = 0; 
let y = 0; 

var player = document.getElementById("player")
let wall = document.getElementById("middlePart")

let openingCon = $('<div></div>');
openingCon.attr("class", "opening");
openingCon.css("left", (Math.random() * screen.width));
openingCon.css("z-index", "1");
openingCon.css("border", "1px red solid");
openingCon.css("background-color", "white");
$("#screenSplits").append(openingCon);

let opening = document.getElementsByClassName("opening")[0];

let currentScreen = "top";
let passing = false;

document.onmousemove = function(e) { 
    x = e.clientX; 
    y = e.clientY; 


    const playerRect = player.getBoundingClientRect()
    const openingRect = opening.getBoundingClientRect()
    const wallReact = wall.getBoundingClientRect()

    const openingOverlap = !(
        playerRect.right < openingRect.left ||
        playerRect.left > openingRect.right ||
        playerRect.bottom < openingRect.top ||
        playerRect.top > openingRect.bottom
    ) 

    const wallOverlap = !(
        playerRect.right < wallReact.left ||
        playerRect.left > wallReact.right ||
        playerRect.bottom < wallReact.top ||
        playerRect.top > wallReact.bottom
    ) 

    
    //console.log("Coordinate: " + x + " og " + y + " og " + $(window).height())
    
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


    /*
    if (y > $(window).height()/2) {
        //console.log("under");
        player.style.left = (x - 50) + "px";
        player.style.top = ($(window).height()/2 - 50) + "px";
        //player.style.top = ($(window).height() + "px")
    } else if (y < $(window).height()/2) {
        //console.log("top")
        updatePosition();
    }
*/
updatePosition();  
};


console.log($(window).height()/2)

function updatePosition() {
    player.style.left = (x - 50) + "px";
    player.style.top = (y - 50) + "px";
}





/*

    let vector = [(x2 + x1), (y2 + y1)];
    console.log("Vector: " + vector);



    let angle = Math.acos(vector[0] / vector[1]);
    console.log(angle);

let hyp = Math.abs(vector[0], vector[1]);
console.log("Hypothenus: " + hyp);
*/