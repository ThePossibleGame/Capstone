const ball = document.querySelector('.ball');

let ballPositionX = 100; // initial horizontal position
let ballPositionY = 100; // initial vertical position
let ballVelocityX = 2; // horizontal velocity (speed)
let ballVelocityY = 2; // vertical velocity (speed)
const ballDiameter = 50; // diameter of the ball

const screenWidth = window.innerWidth; // screen width
const screenHeight = window.innerHeight; // screen height

function animateBall() {
    // Update the ball's position
    ballPositionX += ballVelocityX;
    ballPositionY += ballVelocityY;

    // Bounce off the left and right walls
    if (ballPositionX <= 0 || ballPositionX + ballDiameter >= screenWidth) {
        ballVelocityX *= -1; // reverse horizontal direction
    }

    // Bounce off the top and bottom walls
    if (ballPositionY <= 0 || ballPositionY + ballDiameter >= screenHeight) {
        ballVelocityY *= -1; // reverse vertical direction
    }

    // Set the ball's new position
    ball.style.left = ballPositionX + 'px';
    ball.style.top = ballPositionY + 'px';

    // Request the next frame to keep the animation going
    requestAnimationFrame(animateBall);
}

// Start the animation
animateBall();