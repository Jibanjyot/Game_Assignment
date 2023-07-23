let ball_x, ball_y, ball_dx, ball_dy;
let paddle_y, paddle_x, paddle_width, paddle_height, paddle_dx;
const brickRows = 4, brickColumns = 4;
const brick_width = 80, brick_height = 20, brick_padding = 15, brickOffsetLeft = 15, brickOffsetTop = 10;
let score = 0;
let lives = 3;
let bricks = [];
let lost = false;

function setup() {
    createCanvas(400, 400);
    initializeBricks();
    resetGame();
}

function initializeBricks() {
    for (let c = 0; c < brickColumns; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRows; r++) {
            bricks[c][r] = { x: 0, y: 0, hidden: false };
        }
    }
}

function resetGame() {
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

    score = 0;
    lost = false;
    initializeBricks();
}

function drawBricks() {
    for (let c = 0; c < brickColumns; c++) {
        for (let r = 0; r < brickRows; r++) {
            if (!bricks[c][r].hidden) {
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

function draw() {
    background(255);
    drawBricks();
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
        if (lives === 0) {
            textSize(18);
            textAlign(CENTER);
            text("Game Over", width / 2, height / 2);
            return;
        }
    } else {
        if (isBrickHit()) {
            score++;
        } else {
            if (horizontalHit()) {
                ball_dx = -ball_dx;
            }
            if (verticalHit()) {

                ball_dy = -ball_dy;
            }
        }
    }

    if (score === brickRows * brickColumns) {
        ball_dx = 0;
        ball_dy = 0;
        textSize(18);
        textAlign(CENTER);
        text("Game Won", width / 2, height / 2);

    }

    textSize(18);
    textAlign(CENTER);
    text("Score: "+score, width / 2, height / 2-30);

    if (lost) {
        textSize(18);
        textAlign(CENTER);
        text("Game Lost", width / 2, height / 2);
        text("Lives: " + lives, width / 2, height / 2 + 30);
    }

    ball_x += ball_dx;
    ball_y += ball_dy;
}

function horizontalHit() {
    return ball_x + ball_radius >= width || ball_x <= ball_radius;
}

function verticalHit() {
    return ball_y <= ball_radius || (ball_y >= paddle_y && ball_x >= paddle_x && ball_x <= paddle_x + paddle_width);
}



function isBrickHit() {
    let brickHit = false;

    for (let c = 0; c < brickColumns; c++) {
        for (let r = 0; r < brickRows; r++) {
            if (!bricks[c][r].hidden) {
                const brickTop = bricks[c][r].y;
                const brickBottom = bricks[c][r].y + brick_height;
                const brickLeft = bricks[c][r].x;
                const brickRight = bricks[c][r].x + brick_width;

                if (ball_y + ball_radius >= brickTop && ball_y - ball_radius <= brickBottom && ball_x + ball_radius >= brickLeft && ball_x - ball_radius <= brickRight) {
                    ball_dy = -ball_dy;
                    bricks[c][r].hidden = true;
                    brickHit = true;
                }
            }
        }
    }

    return brickHit;
}



function gameOver() {
    if (ball_y >= height - ball_radius / 2) {
        
        return true;
    }
    return false;
}

function mousePressed() {
    if (lives) {

        if(lost){
            lives--;
        }
        
        resetGame();
    }
}
