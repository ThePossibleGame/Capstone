const square = document.querySelector('.square');

let squarePositionX = 100; // initial horizontal position
let squarePositionY = 100; // initial vertical position
let squareVelocityX = 2; // horizontal velocity (speed)
let squareVelocityY = 2; // vertical velocity (speed)
const squareSize = 50; // Size of the square

const screenWidth = window.innerWidth; // screen width
const screenHeight = window.innerHeight; // screen height

function animatesquare() {
    // Update the square's position
    squarePositionX += squareVelocityX;
    squarePositionY += squareVelocityY;

    // Bounce off the left and right walls
    if (squarePositionX <= 0 || squarePositionX + squareSize >= screenWidth) {
        squareVelocityX *= -1; // reverse horizontal direction
    }

    // Bounce off the top and bottom walls
    if (squarePositionY <= 0 || squarePositionY + squareSize >= screenHeight) {
        squareVelocityY *= -1; // reverse vertical direction
    }

    // Set the square's new position
    square.style.left = squarePositionX + 'px';
    square.style.top = squarePositionY + 'px';

    // Request the next frame to keep the animation going
    requestAnimationFrame(animatesquare);
}

// Start the animation
animatesquare();

