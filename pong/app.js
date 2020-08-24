const screen = document.getElementById("pong");
const context = screen.getContext("2d");
const speed = 10;

const user = {
    x : 20,
    y : 400,
    width : 20,
    height : 100,
    score : 0
}

const computer = {
    x : 760,
    y : 400,
    width : 20,
    height : 100,
    score : 0
}

const ball = {
    x : 400,
    y : 400,
    r : 15,
    v_x : 2,
    v_y : 2,
    speed : 2
}

function drawBoard(){
    context.fillStyle = "white";
    context.fillRect(0, 0, 800, 800);
}

function drawRect(x, y, w , h){
    context.fillStyle = "black";
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r){
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function drawScore(text, x){
    context.fillStyle = "black";
    context.fillText("Score: " + text, x, 50);
}

function drawScreen(){
    drawBoard();
    
    drawScore(user.score, 200);
    drawScore(computer.score, 600);

    
    drawRect(user.x, user.y, user.width, user.height);
    drawRect(computer.x, computer.y, computer.width, computer.height);

    drawCircle(ball.x, ball.y, ball.r);
}

function checkCollision(ball, player){
    player.top = player.y;
    player.bot = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    ball.top = ball.y - ball.r;
    ball.bot = ball.y + ball.r;
    ball.left = ball.x - ball.r;
    ball.right = ball.x + ball.r;

    return ball.right > player.left && ball.top < player.bot && ball.left < player.right && ball.bot > player.top;
}

function reset(){
    ball.x = 400;
    ball.y = 400;
    ball.speed = 2;
    ball.v_x = -ball.v_x;

    user.y = 400;
    computer.y = 400;
}

function pseudoAI(){
    let computerLevel = 1;
    let compSpeed = 2;
    let posDiff = ball.y - (computer.y + computer.height/2);
    let direction = (posDiff) > 0 ? 1 : -1;
    if(Math.abs(posDiff)>computer.height/2)
        computer.y += (compSpeed*direction*computerLevel);
}

function update(){
    ball.x += ball.v_x;
    ball.y += ball.v_y;
    if(ball.y + ball.r > 800 || ball.y - ball.r < 0){
        ball.v_y = - ball.v_y;
    }

    let player = (ball.x < 400) ? user : computer;
    if(checkCollision(ball, player)){
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        let reflectAngle = (Math.PI/4) * collidePoint;
        let direction = (ball.x < 400)? 1 : -1;
        ball.v_x = direction * ball.speed * Math.cos(reflectAngle);
        ball.v_y = ball.speed * Math.sin(reflectAngle);
        ball.speed += 0.1;
    }

    if(ball.x - ball.r < 0 ){
        computer.score ++;
        reset();
    }else if(ball.x + ball.r > 800){
        user.score ++;
        reset();
    }
    pseudoAI();

    //if ball bugged into wall
    if(ball.y + ball.r > 805 || ball.y - ball.r < -5){
        reset();
    }
}

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode === 38) {
      user.y -= 15;
    }
    if (event.isComposing || event.keyCode === 40) {
        user.y += 15;
      }
});
  

function pong(){
    update();
    drawScreen();
}

setInterval(pong, speed);