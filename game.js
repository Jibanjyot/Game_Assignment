var ball_x, ball_y, ball_dx, ball_y;
var paddle_y, paddle_y, paddle_width, paddle_height, paddle_dx;
var brickRows = 4, brickColumns = 4, brick_width = 80, brick_height = 20, brick_padding = 15, brickOffsetLeft = 15, brickOffsetTop = 10;
var score = 0;

var bricks = [];

var lost = false;

for (var c = 0; c < brickColumns; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRows; r++) {
        bricks[c][r] = { x: 0, y: 0, hidden: 0 };
    }
}

function createBricks() {
    for (var c = 0; c < brickColumns; c++) {
        for (var r = 0; r < brickRows; r++) {
            if (bricks[c][r].hidden === 0) {
                const brick_x = c * (brick_width + brick_padding) + brickOffsetLeft;
                const brick_y = r * (brick_height + brick_padding) + brickOffsetTop;
                bricks[c][r].x = brick_x;
                bricks[c][r].y = brick_y;
                fill("black");
                rect(bricks[c][r].x, bricks[c][r].y, brick_width, brick_height);
            }
        }
    }
}



function setup() {
    createCanvas(400, 400);

    ball_x = width / 2;
    ball_y = height / 2;
    ball_radius = 10;
    ball_dx = 2;
    ball_dy = 2;

    paddle_width = 90;
    paddle_height = 15;
    paddle_y = height - 30;
    paddle_x = width / 2 - paddle_width / 2
    paddle_dx = 4;
}



function horizontalHit() {
    if(ball_x+ball_radius>= width  || ball_x <= ball_radius){
        return true;
    }
    else{
        return false;
    }
    
}



function gameOver() {
    if(ball_y >= height - ball_radius / 2){
        return true;
    }
    return false;
}

function paddleHit(){
    if(ball_x>= paddle_x && ball_x<=paddle_x+paddle_width && ball_y>= paddle_y && ball_y<=paddle_y+paddle_width){
        return true;
    }
    return false;
}

function verticalHit() {
    if(ball_y < ball_radius / 2 || (ball_x <= paddle_x + paddle_width && ball_x >= paddle_x && ball_y >= paddle_y)){
        return true;
    }
    return false;

}



function isBrickHit() {
    for (var c = 0; c < brickColumns; c++) {
        for (var r = 0; r < brickRows; r++) {
            if (bricks[c][r].hidden === 1) {
                continue;
            }
            if (bricks[c][r].y <= ball_y + ball_radius / 2 && bricks[c][r].y + brick_height >= ball_y + ball_radius / 2 && bricks[c][r].x <= ball_x + ball_radius / 2 && bricks[c][r].x + brick_width >= ball_x + ball_radius / 2) {

                ball_dy = -ball_dy;
                bricks[c][r].hidden = 1;

                return true;
            }
        }
    }
    return false;
}



function draw() {
    clear()
    fill("black")

    createBricks()
    circle(ball_x, ball_y, ball_radius);

    rect(paddle_x, paddle_y, paddle_width, paddle_height);

    if (keyIsDown(LEFT_ARROW)) {
        paddle_x = max(paddle_x - paddle_dx, 0);
    }

    if (keyIsDown(RIGHT_ARROW)) {
        paddle_x = min(paddle_x + paddle_dx, width - paddle_width);
    }

    if (gameOver()) {
        ball_dy = 0;
        ball_dx = 0;
        lost = true;
    } 

    if (isBrickHit()) {
        score = score + 1;
    } else {
        if (horizontalHit()) {
            ball_dx = -ball_dx;
        }
        
        if (verticalHit()) {
            ball_dy = -ball_dy;
        }
    }
    text("Score", width / 2-18, height / 2);
    text(score, width / 1.6-18, height / 2);
    

    if (score === 16) {
        ball_dx = 0;
        ball_dy = 0;
        text("Game Won", width / 2 - 18, height / 2 + 18);
    }
    if (lost) {
        text("Game Lost", width / 2 - 18, height / 2 + 18);
    }

    ball_x = ball_x + ball_dx;
    ball_y = ball_y + ball_dy;

}