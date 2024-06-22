
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = canvas.width;
let height = canvas.height;

const BALL_SIZE = 5;
let ballPosition = {x: 20, y: 30};

let xSpeed = 6;
let ySpeed = 2;

const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 50;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

document.addEventListener("mousemove",e=>{
    rightPaddleTop = e.y - canvas.offsetTop;
})

function draw(){
    // Fill the canvas with black
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);

    // Everything else will be white
    ctx.fillStyle = "white";
    // Draw the ball
    ctx.fillRect(ballPosition.x,ballPosition.y, BALL_SIZE,BALL_SIZE)

    // Draw the paddles
    ctx.fillRect(
        PADDLE_OFFSET,
        leftPaddleTop,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
    );
    ctx.fillRect(
        width - PADDLE_WIDTH - PADDLE_OFFSET,
        rightPaddleTop,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
    )
}

function update(){
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
}

function checkPaddleCollision(ball,paddle){
    // Check if th paddle and ball overlap vertically and horizontally
    return(
        ball.left < paddle.right &&
        ball.right > paddle.left &&
        ball.top < paddle.bottom &&
        ball.bottom > paddle.top
    );
}

function adjustAngle(distanceFromTop, distanceFromBottom){
    if(distanceFromTop < 0){
        // If ball hit near top of paddle, reduce ySpeed
        ySpeed -= 0.5;
    } else if (distanceFromBottom < 0){
        // If ball hit near bottom of paddle, increase ySpeed
        ySpeed += 0.5;
    }
}

function checkCollision(){
    let ball = {
        left: ballPosition.x,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE,
    }
    let leftPaddle = {
        left: PADDLE_OFFSET,
        right: PADDLE_OFFSET + PADDLE_WIDTH,
        top: leftPaddleTop,
        bottom: leftPaddleTop + PADDLE_HEIGHT
    };
    let rightPaddle = {
        left: width - PADDLE_WIDTH - PADDLE_OFFSET,
        right: width - PADDLE_WIDTH,
        top: rightPaddleTop,
        bottom: rightPaddleTop + PADDLE_HEIGHT
    };
    if (checkPaddleCollision(ball, leftPaddle)){
        // Left paddle collision happened
        let distanceFromTop = ball.top - leftPaddle.top;
        let distanceFromBottom = leftPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);                   // ----> ; semicolon ------> () .  {} . [] . : ; 
        xSpeed = Math.abs(xSpeed);
    }
    if (checkPaddleCollision(ball, rightPaddle)){
        // Right paddle collision happened
        xSpeed = -Math.abs(xSpeed);
        let distanceFromTop = ball.top - rightPaddle.top;
        let distanceFromBottom = rightPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);
    }
    if (ball.left<0 || ball.right>width){
        xSpeed = -xSpeed;
    }
    if(ball.top < 0 || ball.bottom>height){
        ySpeed = -ySpeed
    }

}

function gameLoop(){
    draw();
    update();
    checkCollision();

    // Call this function again after a timeout
    setTimeout(gameLoop, 30);
}

gameLoop()