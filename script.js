
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = canvas.width;
let height = canvas.height;

const BALL_SIZE = 5;
let ballPosition = {x: 20, y: 30};

let xSpeed = 4;
let ySpeed = 2;

function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);

    ctx.fillStyle = "white";
    ctx.fillRect(ballPosition.x,ballPosition.y, BALL_SIZE,BALL_SIZE)
}

function update(){
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
}
function gameLoop(){
    draw();
    update();

    // Call this function again after a timeout
    setTimeout(gameLoop, 30);
}

gameLoop()