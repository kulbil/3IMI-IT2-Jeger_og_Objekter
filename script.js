let x1 = 0; 
let y1 = 0; 
let x2 = 0; 
let y2 = 0;

document.onmousemove = function(e) { 
    x1 = x2; 
    y1 = y2;
    x2 = e.clientX; 
    y2 = e.clientY; 

    console.log("Coordinate 1: " + x1 + " og " + y1)
    console.log("Coordinate 2: " + x2 + " og " + y2)

    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    let targetAngle = (angle * 180) / Math.PI;

    document.getElementById("player").style.rotate = (targetAngle) + "deg";
    document.getElementById("player").style.left = (x2 - 50) + "px";
    document.getElementById("player").style.top = (y2 - 50) + "px";

};

/*

    let vector = [(x2 + x1), (y2 + y1)];
    console.log("Vector: " + vector);



    let angle = Math.acos(vector[0] / vector[1]);
    console.log(angle);

let hyp = Math.abs(vector[0], vector[1]);
console.log("Hypothenus: " + hyp);
*/