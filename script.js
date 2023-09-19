let x1 = 0; 
let y1 = 0; 
let x2 = 0; 
let y2 = 0;
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

document.onmousemove = function(e) { 
    x1 = x2; 
    y1 = y2;
    x2 = e.clientX; 
    y2 = e.clientY; 


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

    /**
    console.log("Coordinate 1: " + x1 + " og " + y1)
    console.log("Coordinate 2: " + x2 + " og " + y2)
    **/
    player.style.left = (x2 - 50) + "px";
    player.style.top = (y2 - 50) + "px";
    

    if (wallOverlap && !openingOverlap) {
        console.log(player.offsetTop);
        player.style.top = (screen.height/2 - screen.height%98.5 - 500) + "px";
    }

    /*
    //player.style.top = (screen.height/2 - screen.height%98.5 - 200) + "px";
    
    if (e.clientY > (screen.height/2 - 100) && openingOverlap) {
        document.getElementById("player").style.top = (screen.height/2 - screen.height%98.5 - 100) + "px";
    }

    */
};






/*

    let vector = [(x2 + x1), (y2 + y1)];
    console.log("Vector: " + vector);



    let angle = Math.acos(vector[0] / vector[1]);
    console.log(angle);

let hyp = Math.abs(vector[0], vector[1]);
console.log("Hypothenus: " + hyp);
*/